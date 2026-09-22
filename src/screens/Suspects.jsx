import { useGame } from '../engine/GameContext.jsx';
import Shell from '../components/Shell.jsx';
import Portrait from '../components/Portrait.jsx';
import { hasAll } from '../engine/selectors.js';

export function Suspects() {
  const { cs, prog, go } = useGame();
  return (
    <Shell title="Suspects" tab="suspects" onBack={() => go('hub', {}, true)}>
      <div className="scroll pad">
        {cs.suspects.map(s => (
          <button key={s.id} className="sus-card" onClick={() => go('suspect', { id: s.id })}>
            <Portrait person={s} size="sm" />
            <span className="sus-txt"><b>{s.name}</b><em>{s.occupation}</em><small>{s.relationship}</small></span>
            <span className="meter" aria-label={`Suspicion ${prog.suspicion[s.id] || 0}%`}><i style={{ height: (prog.suspicion[s.id] || 0) + '%' }} /></span>
          </button>))}
        <button className="sus-card victim" onClick={() => go('suspect', { id: cs.victim.id })}>
          <Portrait person={cs.victim} size="sm" />
          <span className="sus-txt"><b>{cs.victim.name}</b><em>The victim</em><small>{cs.victim.occupation}</small></span>
        </button>
      </div>
    </Shell>
  );
}

export function SuspectProfile({ id }) {
  const { cs, prog, go, back } = useGame();
  const isV = id === cs.victim.id; const s = isV ? cs.victim : cs.suspects.find(x => x.id === id);
  return (
    <Shell title={s.name} tab="suspects" onBack={back}>
      <div className="scroll pad">
        <div className="profile-head"><Portrait person={s} size="lg" />
          <div><h3>{s.name}</h3><p className="muted">{s.age} · {s.occupation}</p>{!isV && <p className="muted">{s.relationship}</p>}</div></div>
        <p>{isV ? s.bio : s.personality}</p>
        {!isV && <p className="meta">Stated alibi: {s.alibi}</p>}
        {!isV && <p className="meta">Why suspicious: {s.suspicious}</p>}
        <p className="season">DOSSIER</p>
        {s.dossier.map((d, i) => hasAll(prog, d.requires) ? <div className="dos" key={i}><small>{d.label}</small><p>{d.text}</p></div>
          : <div className="dos locked" key={i}><small>{d.label}</small><p>▒▒▒▒▒▒▒▒ Classified. More evidence needed.</p></div>)}
        {!isV && <button className="btn primary big" onClick={() => go('interrogation', { id })}>Interrogate</button>}
      </div>
    </Shell>
  );
}
