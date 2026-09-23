import { useEffect, useRef, useState } from 'react';
import { useGame } from '../engine/GameContext.jsx';
import { useTypewriter } from '../engine/hooks.js';
import { audio } from '../engine/audio.js';
import Backdrop from './Backdrop.jsx';
import { Fx } from './Fx.jsx';
import Portrait from './Portrait.jsx';

/** Cinematic scene player. Data-driven: takes an array of beats (see the case scenes file). Tap = finish text / next. */
export default function ScenePlayer({ beats, onDone, onBeat, label }) {
  const { settings, cs, t } = useGame();
  const [i, setI] = useState(0); const b = beats[i];
  const finished = useRef(false);
  const { shown, done, finish } = useTypewriter(b.text || '', settings.textSpeed);
  const next = () => { if (i + 1 >= beats.length) { if (!finished.current) { finished.current = true; onDone(); } } else setI(i + 1); };

  useEffect(() => {
    if (b.sfx) audio.sfx(b.sfx); if (b.ambient) audio.ambient(b.ambient); if (b.music) audio.music(b.music);
    onBeat?.(b, i);
    if ((b.hold && !b.text) || b.title) { const t = setTimeout(next, b.hold || 3000); return () => clearTimeout(t); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);
  useEffect(() => () => { audio.ambient(null); audio.music(null); }, []);
  useEffect(() => {
    const k = (e) => { if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') { e.preventDefault(); tap(); } };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  });

  const tap = () => { if (b.hold && !b.text && !b.title) return; if (b.title) return next(); if (!done) finish(); else next(); };
  const person = b.char ? (cs.cast?.[b.char.id] || cs.suspects.find(s => s.id === b.char.id)) : null;
  const dur = b.hold || Math.max(4500, (b.text?.length || 30) * 75);

  return (
    <div className="scene" onClick={tap} aria-label={label || 'Cinematic scene'}>
      <Backdrop key={b.set + (b.image || '')} set={b.set} image={b.image} caseId={cs.id} camera={b.camera} dur={dur} reduce={settings.reduceMotion} />
      <Fx list={settings.reduceMotion ? ['grain'] : b.fx} />
      {b.flash && <div key={'f' + i} className="flash" />}
      {person && <div className={`scene-char ${b.char.side || 'left'}`}><Portrait person={person} size="lg" /></div>}
      {b.overlay?.kind === 'sms' && <div className="sms" key={'s' + i}><small>{b.overlay.from}</small><p>{b.overlay.text}</p></div>}
      {b.title && <div className="title-card" key={'t' + i}><small>{b.sub}</small><h1>{b.title}</h1></div>}
      {b.center && <div className="center-text" key={'c' + i}>{shown}</div>}
      <div className="letterbox top" /><div className="letterbox bottom" />
      {b.text && !b.center && (
        <div className={`caption ${b.speaker === 'NARRATOR' ? 'narr' : 'dlg'}`} key={'x' + i}>
          {b.speaker && b.speaker !== 'NARRATOR' && <div className="speaker">{b.speaker}</div>}
          <p aria-live="polite">{shown}</p>
          <span className={`hint ${done ? 'on' : ''}`}>Tap to continue</span>
        </div>)}
      <button className="skip" onClick={(e) => { e.stopPropagation(); if (!finished.current) { finished.current = true; onDone(); } }}>{t('Skip')}</button>
      <div className="beat-bar"><i style={{ width: ((i + 1) / beats.length) * 100 + '%' }} /></div>
    </div>
  );
}
