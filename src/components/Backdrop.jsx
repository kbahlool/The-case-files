import { useEffect, useMemo, useRef } from 'react';
import { useImageOk } from '../engine/hooks.js';
import { SetArt } from './SetArt.jsx';

const tf = (c, d) => `translate3d(${(c.x || 0) * d}%,${(c.y || 0) * d}%,0) scale(${1 + ((c.s || 1) - 1) * d})`;
const DEPTH = [0.5, 1, 1.7];

/** Animated 2.5D backdrop. Uses /assets/<caseId>/scenes/<image> when present, otherwise the procedural set. */
export default function Backdrop({ set = 'black', image, caseId = 'case001', camera, dur = 7000, reduce, children }) {
  const url = image ? `${import.meta.env.BASE_URL}assets/${caseId}/scenes/${image}` : null;
  const photo = useImageOk(url);
  const refs = [useRef(null), useRef(null), useRef(null)];
  const cam = camera || { from: { s: 1.04, x: 0, y: 0 }, to: { s: 1.12, x: -1.5, y: -1 } };
  const art = useMemo(() => SetArt(set), [set]);
  const key = JSON.stringify(cam) + set + photo;
  useEffect(() => {
    const anims = [];
    refs.forEach((r, i) => {
      const el = r.current; if (!el) return;
      if (reduce) { el.style.transform = tf(cam.from, DEPTH[i]); return; }
      anims.push(el.animate([{ transform: tf(cam.from, DEPTH[i]) }, { transform: tf(cam.to, DEPTH[i]) }], { duration: dur * 1.2, easing: 'ease-in-out', fill: 'forwards' }));
    });
    return () => anims.forEach(a => a.cancel());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, dur, reduce]);
  return (
    <div className="backdrop">
      {photo
        ? <div className="layer"><div ref={refs[1]} className="layer-in"><div className="photo" style={{ backgroundImage: `url(${url})` }} /></div><div className="photo-vignette" /></div>
        : ['far', 'mid', 'near'].map((k, i) => art[k] && <div className="layer" key={k}><div ref={refs[i]} className="layer-in">{art[k]}</div></div>)}
      {children}
    </div>
  );
}
