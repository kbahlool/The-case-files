import { useMemo, useState } from 'react';
import { useGame } from '../engine/GameContext.jsx';
import { nodeAvailable, nodeKey } from '../engine/selectors.js';
import { audio } from '../engine/audio.js';
import Shell from '../components/Shell.jsx';
import Sheet from '../components/Sheet.jsx';
import { CAT_ICON } from '../components/EvidenceCard.jsx';

const W = 660, COLS = 3, CW = 200, RH = 74;
/** Evidence board: tap two nodes to test a connection. Correct ones draw a string and reveal insight. */
export default function Board() {
  const { cs, prog, go, addLink, t, lang } = useGame();
  const [pick, setPick] = useState(null); const [msg, setMsg] = useState(null); const [reveal, setReveal] = useState(null);
  const nodes = useMemo(() => {
    const out = [];
    cs.suspects.forEach((s, i) => out.push({ id: 'S:' + s.id, label: s.name.split(' ')[0], sub: lang === 'ar' ? 'مشتبه به' : 'Suspect', x: 30 + i * 155, y: 20, kind: 'sus' }));
    const locs = cs.locations.filter(l => nodeAvailable(cs, prog, 'L:' + l.id));
    locs.forEach((l, i) => out.push({ id: 'L:' + l.id, label: l.name, sub: lang === 'ar' ? 'مكان' : 'Location', x: 30 + i * 155, y: 100, kind: 'loc' }));
    cs.evidence.filter(e => prog.evidence.includes(e.id)).forEach((e, i) => out.push({ id: e.id, label: e.title, sub: t(e.category), x: 20 + (i % COLS) * (CW + 6), y: 190 + Math.floor(i / COLS) * RH, kind: 'ev', ico: CAT_ICON[e.category] }));
    return out;
  }, [cs, prog.evidence, prog.visited]);
  const H = Math.max(...nodes.map(n => n.y)) + 90;
  const pos = (id) => { const n = nodes.find(x => x.id === id); return n ? [n.x + (n.kind === 'ev' ? CW / 2 : 70), n.y + 28] : null; };
  const made = cs.boardLinks.filter(l => prog.board.links.includes(nodeKey(l.a, l.b)));
  const tap = (n) => {
    audio.sfx('click');
    if (!pick) return setPick(n.id);
    if (pick === n.id) return setPick(null);
    const key = nodeKey(pick, n.id);
    const l = cs.boardLinks.find(x => nodeKey(x.a, x.b) === key);
    if (l && nodeAvailable(cs, prog, l.a) && nodeAvailable(cs, prog, l.b)) {
      if (!prog.board.links.includes(key)) { addLink(key); audio.sfx('success'); }
      setReveal(l);
    } else { audio.sfx('failure'); setMsg(t('No clear connection between those two. Try another pairing.')); setTimeout(() => setMsg(null), 2200); }
    setPick(null);
  };
  const total = cs.boardLinks.length;
  return (
    <Shell title={`${t('Board')} · ${made.length}/${total}`} tab="board" onBack={() => go('hub', {}, true)}>
      <p className="board-hint">{pick ? t('Now tap what it connects to.') : t('Tap one item, then another, to test a connection.')}{msg && <b className="fb"> {msg}</b>}</p>
      <div className="board-scroll">
        <div className="board" style={{ width: W, height: H }}>
          <svg width={W} height={H} aria-hidden="true">
            {made.map(l => { const a = pos(l.a), b = pos(l.b); if (!a || !b) return null; return <line key={l.a + l.b} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} className="string" />; })}
          </svg>
          {nodes.map(n => (
            <button key={n.id} className={`node ${n.kind} ${pick === n.id ? 'pick' : ''}`} style={{ left: n.x, top: n.y }} onClick={() => tap(n)}>
              <small>{n.ico || ''} {n.sub}</small><b>{n.label}</b>
            </button>))}
        </div>
      </div>
      <Sheet open={!!reveal} onClose={() => setReveal(null)} title={reveal?.title}>
        {reveal && <><p>{reveal.insight}</p><button className="btn primary" onClick={() => setReveal(null)}>{t('Continue')}</button></>}
      </Sheet>
    </Shell>
  );
}
