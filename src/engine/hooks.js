import { useEffect, useState } from 'react';
const SPEEDS = { slow: 52, normal: 26, fast: 10, instant: 0 };
export function useTypewriter(text, speed = 'normal') {
  const ms = SPEEDS[speed] ?? 26; const [n, setN] = useState(0);
  useEffect(() => {
    setN(0); if (!text) return;
    if (!ms) { setN(text.length); return; }
    let i = 0; const id = setInterval(() => { i++; setN(i); if (i >= text.length) clearInterval(id); }, ms);
    return () => clearInterval(id);
  }, [text, ms]);
  return { shown: (text || '').slice(0, n), done: !text || n >= text.length, finish: () => setN((text || '').length) };
}
export function useImageOk(url) {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (!url) { setOk(false); return; }
    let dead = false; const im = new Image();
    im.onload = () => !dead && setOk(true); im.onerror = () => !dead && setOk(false); im.src = url;
    return () => { dead = true; };
  }, [url]);
  return ok;
}
