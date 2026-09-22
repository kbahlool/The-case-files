import { useEffect, useRef, useState } from 'react';
import { useGame } from '../engine/GameContext.jsx';
import { useTypewriter } from '../engine/hooks.js';
import { questionState } from '../engine/selectors.js';
import { audio } from '../engine/audio.js';
import Shell from '../components/Shell.jsx';
import Backdrop from '../components/Backdrop.jsx';
import Portrait from '../components/Portrait.jsx';
import { Fx } from '../components/Fx.jsx';

/** Question-tree interrogation. Questions unlock with evidence and earlier answers. */
export default function Interrogation({ id }) {
  const { cs, prog, ask, back, settings } = useGame();
  const s = cs.suspects.find(x => x.id === id); const script = cs.interrogations[id];
  const [lines, setLines] = useState([{ who: s.name.split(' ')[0].toUpperCase(), text: s.greeting, mood: 'guarded' }]);
  const [mood, setMood] = useState('guarded'); const log = useRef(null);
  useEffect(() => { audio.music('tension'); return () => audio.music(null); }, []);
  useEffect(() => { log.current?.scrollTo({ top: 99999, behavior: 'smooth' }); }, [lines.length]);
  const qs = script.questions.map(q => ({ q, ...questionState(q, prog, id) }));
  const avail = qs.filter(x => x.available && !x.asked);
  const pick = (q) => {
    audio.sfx('click'); ask(id, q); setMood(q.mood || 'guarded');
    setLines(l => [...l, { who: 'YOU', text: q.text, you: true }, ...q.response.map(t => ({ who: s.name.split(' ')[0].toUpperCase(), text: t, mood: q.mood })),
      ...(q.reveals?.length ? [{ sys: true, text: `New evidence: ${q.reveals.map(r => cs.evidence.find(e => e.id === r)?.title).join(', ')}` }] : [])]);
  };
  const last = lines[lines.length - 1];
  return (
    <Shell title={s.name} tab="suspects" onBack={back} noNav>
      <div className="interro" data-mood={mood}>
        <div className="int-stage"><Backdrop set="interrogation" caseId={cs.id} dur={50000} reduce={settings.reduceMotion} /><Fx list={['grain']} />
          <div className="int-por"><Portrait person={s} size="lg" /></div>
          <div className="susp-bar" aria-label={`Suspicion ${prog.suspicion[id] || 0}%`}><i style={{ width: (prog.suspicion[id] || 0) + '%' }} /><small>SUSPICION</small></div>
        </div>
        <div className="int-log" ref={log} aria-live="polite">
          {lines.map((l, i) => l.sys ? <p key={i} className="int-sys">▤ {l.text}</p>
            : <div key={i} className={`bubble ${l.you ? 'you' : ''} ${l.mood || ''}`}><small>{l.who}</small><p>{l.text}</p></div>)}
        </div>
        <div className="int-q">
          {avail.length === 0 ? <p className="muted small center">Nothing more to ask right now. Find new evidence, then return.</p>
            : avail.map(({ q }) => <button key={q.id} className={`q ${q.requires?.length ? 'evid' : ''}`} onClick={() => pick(q)}>{q.requires?.length ? '▤ ' : ''}{q.text}</button>)}
          <button className="btn" onClick={back}>End interview</button>
        </div>
      </div>
    </Shell>
  );
}
