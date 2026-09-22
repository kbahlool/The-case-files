import { useState } from 'react';
import { useGame } from '../engine/GameContext.jsx';
import { scoreTheory } from '../engine/scoring.js';
import { audio } from '../engine/audio.js';
import Shell from '../components/Shell.jsx';
import Portrait from '../components/Portrait.jsx';
import EvidenceCard from '../components/EvidenceCard.jsx';

/** Final theory: killer, motive, method, time, key evidence. Nothing is graded until you commit. */
export default function Theory() {
  const { cs, prog, go, back, submitTheory } = useGame();
  const Q = cs.finalTheory.questions; const [i, setI] = useState(0); const [a, setA] = useState({}); const [sure, setSure] = useState(false);
  const q = Q[i]; const set = (v) => { audio.sfx('click'); setA({ ...a, [q.id]: v }); };
  const submit = () => {
    const res = scoreTheory(cs, prog, a); audio.sfx('transition');
    submitTheory(a, res); go('scene', { sceneId: 'reveal', next: { screen: 'results' } }, true);
  };
  const evs = cs.evidence.filter(e => prog.evidence.includes(e.id));
  return (
    <Shell title="Final theory" noNav onBack={() => (i ? setI(i - 1) : back())}>
      <div className="scroll pad">
        <p className="step">QUESTION {i + 1} OF {Q.length}</p>
        <h2 className="q-title">{q.title}</h2>
        {q.kind === 'suspect' && <div className="pick-grid">{cs.suspects.map(s => (
          <button key={s.id} className={`pick-sus ${a.killer === s.id ? 'sel' : ''}`} onClick={() => set(s.id)}><Portrait person={s} size="sm" /><b>{s.name}</b><small>{s.occupation}</small></button>))}</div>}
        {q.kind === 'options' && <div className="choice">{q.options.map(o => <button key={o.id} className={`opt ${a[q.id] === o.id ? 'sel' : ''}`} onClick={() => set(o.id)}>{o.text}</button>)}</div>}
        {q.kind === 'evidence' && <><p className="muted small">Choose the single piece of evidence that best breaks the killer’s alibi.</p>{evs.map(e => <EvidenceCard key={e.id} ev={e} selected={a.evidence === e.id} onClick={() => set(e.id)} />)}</>}
        <div className="row theory-nav">
          {i > 0 && <button className="btn" onClick={() => setI(i - 1)}>Back</button>}
          {i < Q.length - 1
            ? <button className="btn primary" disabled={!a[q.id]} onClick={() => setI(i + 1)}>Next</button>
            : <button className="btn primary" disabled={!a[q.id]} onClick={() => setSure(true)}>Submit theory</button>}
        </div>
        {sure && <div className="confirm"><p>This will close the case. You cannot change your answer.</p>
          <div className="row"><button className="btn" onClick={() => setSure(false)}>Not yet</button><button className="btn primary" onClick={submit}>Accuse</button></div></div>}
      </div>
    </Shell>
  );
}
