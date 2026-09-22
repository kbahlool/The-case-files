import { useEffect, useMemo, useState } from 'react';
import { useGame } from '../engine/GameContext.jsx';
import { visibleEvents } from '../engine/selectors.js';
import { audio } from '../engine/audio.js';
import Shell from '../components/Shell.jsx';

/** Reorder the events into true chronological order; discard timestamps that were faked. */
export default function Timeline() {
  const { cs, prog, go, setTimeline } = useGame();
  const vis = useMemo(() => visibleEvents(cs, prog), [cs, prog.evidence]);
  const minEvents = cs.timeline.minEvents;
  const [order, setOrder] = useState(() => {
    const saved = (prog.timeline.order || []).filter(id => vis.some(v => v.id === id));
    const rest = vis.filter(v => !saved.includes(v.id)).map(v => v.id).sort((a, b) => (a.charCodeAt(2) * 7 % 5) - (b.charCodeAt(2) * 7 % 5) || a.localeCompare(b));
    return [...saved, ...rest];
  });
  const [flags, setFlags] = useState(prog.timeline.flags || {});
  const [fb, setFb] = useState('');
  useEffect(() => { setOrder(o => [...o.filter(id => vis.some(v => v.id === id)), ...vis.filter(v => !o.includes(v.id)).map(v => v.id)]); }, [vis.length]);
  const ev = (id) => cs.timeline.events.find(e => e.id === id);
  const move = (i, d) => { const o = [...order]; const j = i + d; if (j < 0 || j >= o.length) return; [o[i], o[j]] = [o[j], o[i]]; setOrder(o); setTimeline({ order: o }); audio.sfx('click'); };
  const flip = (id) => { const f = { ...flags, [id]: !flags[id] }; setFlags(f); setTimeline({ flags: f }); audio.sfx('click'); };
  const check = () => {
    if (vis.length < minEvents) { setFb(`You only have ${vis.length} events. Keep investigating, you need at least ${minEvents}.`); audio.sfx('failure'); return; }
    const bad = vis.filter(e => e.misleading && !flags[e.id]).length + vis.filter(e => !e.misleading && flags[e.id]).length;
    const trusted = order.filter(id => !ev(id).misleading);
    const wrongPos = trusted.filter((id, i) => i > 0 && ev(id).t < ev(trusted[i - 1]).t).length;
    if (!bad && !wrongPos) { setTimeline({ solved: true, order, flags }); setFb('ok'); audio.sfx('success'); }
    else { setFb(bad ? 'One timestamp cannot be trusted. Discard the one that was faked, and keep the others.' : 'Some events are out of order. Compare each with the evidence behind it.'); audio.sfx('failure'); }
  };
  const solved = prog.timeline.solved;
  return (
    <Shell title="Timeline" tab="timeline" onBack={() => go('hub', {}, true)}>
      <div className="scroll pad">
        <p className="lead-text">Order the night. Use the arrows to move an event, and <b>Discard</b> any time that was faked.</p>
        {vis.length < minEvents && <p className="muted small">{vis.length} of at least {minEvents} events known.</p>}
        <ol className="tl">
          {order.map((id, i) => { const e = ev(id); const off = flags[id]; return (
            <li key={id} className={`tl-row ${off ? 'off' : ''} ${solved ? 'ok' : ''}`}>
              <div className="tl-time">{solved || !e.deduced ? e.time : '??:??'}</div>
              <div className="tl-txt">{e.text}{solved && e.misleading && <em> {e.truth}</em>}</div>
              {!solved && <div className="tl-ctl">
                <button onClick={() => move(i, -1)} aria-label="Move up" disabled={i === 0}>▲</button>
                <button onClick={() => move(i, 1)} aria-label="Move down" disabled={i === order.length - 1}>▼</button>
                <button className={`disc ${off ? 'on' : ''}`} onClick={() => flip(id)}>{off ? 'Discarded' : 'Discard'}</button>
              </div>}
            </li>); })}
        </ol>
        {solved ? <div className="win"><small>TIMELINE ESTABLISHED</small><p>The killing happened around 10:40 PM, more than an hour before the clock says. The 11:47 is fabricated.</p>
          <button className="btn primary big" onClick={() => go('board', {}, true)}>Continue to the Board</button></div>
          : <><button className="btn primary big" onClick={check}>Check timeline</button>{fb && fb !== 'ok' && <p className="fb">{fb}</p>}</>}
      </div>
    </Shell>
  );
}
