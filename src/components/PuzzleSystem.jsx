import { useMemo, useState } from 'react';
import { audio } from '../engine/audio.js';

function CountWheel({ lever = 10, label }) {
  const pts = Array.from({ length: 12 }, (_, i) => { const a = (i + 1) * 30 - 90; const r = (x) => [100 + Math.cos(a * Math.PI / 180) * x, 100 + Math.sin(a * Math.PI / 180) * x]; return { n: i + 1, a, o: r(82), t: r(64), l: r(92) }; });
  const L = pts[lever - 1];
  return (
    <figure className="exhibit wheel">
      <svg viewBox="0 0 200 200" role="img" aria-label={`Count wheel with the lever resting in the notch for ${lever} strikes`}>
        <circle cx="100" cy="100" r="78" fill="#100c07" stroke="#8c6a2e" strokeWidth="3" /><circle cx="100" cy="100" r="16" fill="#1c150b" stroke="#8c6a2e" />
        {pts.map(p => <g key={p.n}><circle cx={p.o[0]} cy={p.o[1]} r={p.n === lever ? 6 : 3.5} fill={p.n === lever ? '#c9a45c' : '#2b2010'} /><text x={p.t[0]} y={p.t[1] + 3.5} textAnchor="middle" fontSize="10" fill={p.n === lever ? '#c9a45c' : '#8c8a80'}>{p.n}</text></g>)}
        <circle cx={L.l[0]} cy={L.l[1]} r="9" fill="none" stroke="#c9a45c" strokeWidth="2" /><line x1="100" y1="100" x2={L.t[0]} y2={L.t[1]} stroke="#c9a45c" strokeWidth="3" />
      </svg>
      <figcaption>Lever rests at <b>{lever}</b> · {label}</figcaption>
    </figure>
  );
}
export function Exhibit({ ex }) {
  if (!ex) return null;
  if (ex.kind === 'countwheel') return <CountWheel lever={ex.lever} label={ex.handsLabel} />;
  return <pre className="exhibit ledger">{ex.lines.join('\n')}</pre>;
}

function Code({ p, hintOn, onSolve, onFail, attempts }) {
  const [v, setV] = useState(''); const [bad, setBad] = useState(false);
  const press = (d) => { audio.sfx('click'); if (v.length >= p.digits) return; const n = v + d; setV(n); if (n.length === p.digits) { if (n === p.answer) onSolve(); else { setBad(true); onFail(); setTimeout(() => { setV(''); setBad(false); }, 700); } } };
  const hint = attempts >= 2 ? (hintOn ? p.hint.text : p.hint.fallback) : null;
  return (
    <div className="code">
      <div className={`code-disp ${bad ? 'shake' : ''}`} aria-live="polite">{Array.from({ length: p.digits }, (_, i) => <span key={i}>{v[i] ? '●' : '○'}</span>)}</div>
      <div className="keypad">{['1', '2', '3', '4', '5', '6', '7', '8', '9', '⌫', '0', '✕'].map(k => <button key={k} onClick={() => k === '⌫' ? setV(v.slice(0, -1)) : k === '✕' ? setV('') : press(k)} aria-label={k}>{k}</button>)}</div>
      {hint ? <p className="hint-box">{hint}</p> : <p className="muted small">{hintOn ? 'You know where to look. Try the code.' : 'Wrong code? Explore the workshop for a clue.'}</p>}
    </div>
  );
}
function Choice({ p, onSolve, onFail }) {
  const [sel, setSel] = useState(null); const [fb, setFb] = useState('');
  const submit = () => { const o = p.options.find(x => x.id === sel); if (o.correct) onSolve(); else { setFb(o.feedback || 'That does not hold up.'); onFail(); } };
  return (
    <div className="choice">
      <p className="q">{p.question}</p>
      {p.options.map(o => <button key={o.id} className={`opt ${sel === o.id ? 'on' : ''}`} onClick={() => { setSel(o.id); setFb(''); }} aria-pressed={sel === o.id}>{o.text}</button>)}
      {fb && <p className="fb bad" role="alert">{fb}</p>}
      <button className="btn primary" disabled={!sel} onClick={submit}>Submit answer</button>
    </div>
  );
}
function Order({ p, onSolve, onFail }) {
  const [list, setList] = useState(p.items.map(i => i.id)); const [fb, setFb] = useState('');
  const move = (i, d) => { const n = [...list]; const j = i + d; if (j < 0 || j >= n.length) return; [n[i], n[j]] = [n[j], n[i]]; setList(n); setFb(''); audio.sfx('click'); };
  const check = () => { const right = list.filter((id, i) => id === p.order[i]).length; if (right === p.order.length) onSolve(); else { setFb(`${right} of ${p.order.length} clips are in the right place.`); onFail(); } };
  return (
    <div className="order">
      {list.map((id, i) => <div className="ord-row" key={id}><span className="ord-n">{i + 1}</span><span className="ord-t">{p.items.find(x => x.id === id).text}</span>
        <span className="ord-b"><button onClick={() => move(i, -1)} aria-label="Move earlier" disabled={i === 0}>▲</button><button onClick={() => move(i, 1)} aria-label="Move later" disabled={i === list.length - 1}>▼</button></span></div>)}
      {fb && <p className="fb bad" role="alert">{fb}</p>}
      <button className="btn primary" onClick={check}>Check the order</button>
    </div>
  );
}
function Match({ p, onSolve, onFail }) {
  const [pairs, setPairs] = useState({}); const [selL, setSelL] = useState(null); const [fb, setFb] = useState('');
  const rightOf = (l) => pairs[l]; const used = Object.values(pairs);
  const pickR = (rid) => { if (!selL) return; const n = { ...pairs }; Object.keys(n).forEach(k => n[k] === rid && delete n[k]); n[selL] = rid; setPairs(n); setSelL(null); setFb(''); audio.sfx('click'); };
  const check = () => { const right = p.left.filter(l => p.right.find(r => r.id === pairs[l.id])?.match === l.id).length; if (right === p.left.length) onSolve(); else { setFb(`${right} of ${p.left.length} pairs are right.`); onFail(); } };
  return (
    <div className="match">
      <p className="muted small">Tap a suspect, then tap what their alibi really covers.</p>
      <div className="m-left">{p.left.map(l => <button key={l.id} className={`m-l ${selL === l.id ? 'on' : ''} ${rightOf(l.id) ? 'paired' : ''}`} onClick={() => setSelL(l.id)}><b>{l.text}</b>{rightOf(l.id) && <em>{p.right.find(r => r.id === rightOf(l.id)).text}</em>}</button>)}</div>
      <div className="m-right">{p.right.map(r => <button key={r.id} className={`opt ${used.includes(r.id) ? 'used' : ''}`} disabled={!selL} onClick={() => pickR(r.id)}>{r.text}</button>)}</div>
      {fb && <p className="fb bad" role="alert">{fb}</p>}
      <button className="btn primary" disabled={Object.keys(pairs).length < p.left.length} onClick={check}>Check alibis</button>
    </div>
  );
}
export default function PuzzleSystem(props) {
  const { p } = props;
  const T = { code: Code, choice: Choice, order: Order, match: Match }[p.type];
  return <T {...props} />;
}
