import { useGame } from '../engine/GameContext.jsx';
import { CASES, canPlay } from '../cases/index.js';
import Shell from '../components/Shell.jsx';

const ACCESS_LABEL = { FREE: 'FREE', PREMIUM: 'PREMIUM', LOCKED: 'LOCKED', COMING_SOON: 'COMING SOON' };
export default function CaseSelect() {
  const { go, root, progress, startCase } = useGame();
  return (
    <Shell title="Case files" noNav onBack={() => root('home')}>
      <div className="scroll pad">
        <p className="season">SEASON ONE</p>
        {CASES.map(c => {
          const playable = canPlay(c); const p = progress[c.id]; const d = c.data;
          const status = !playable ? 'CLASSIFIED' : p?.stage === 'done' ? 'CLOSED' : p?.started ? 'IN PROGRESS' : 'AVAILABLE';
          return (
            <article key={c.id} className={`case-card ${playable ? '' : 'locked'}`}>
              <div className="cc-head"><span className="cc-num">CASE {c.number}</span><span className={`pill ${status.replace(' ', '')}`}>{status}</span></div>
              {playable ? <>
                <h3 className="cc-title">{d.title}</h3>
                <p className="cc-sub">{d.subtitle}</p>
                <p className="muted">{d.tease}</p>
                <div className="cc-meta"><span aria-label={`Difficulty ${d.difficultyLevel} of 5`}>{'●'.repeat(d.difficultyLevel)}{'○'.repeat(5 - d.difficultyLevel)}</span><span>{d.difficulty}</span><span>{d.estMinutes}</span><span className="tag-free">{ACCESS_LABEL[c.access]}</span></div>
                {p?.result && <p className="cc-score">Score {p.result.total} / 100 · {d.endings[p.result.ending].title}</p>}
                <button className="btn primary" onClick={() => startCase(c.id)}>{p?.stage === 'done' ? 'Review case' : p?.started ? 'Continue' : 'Open file'}</button>
              </> : <>
                <h3 className="cc-title redacted"><i /><i /></h3>
                <p className="muted">{c.teaser}</p>
                <div className="cc-meta"><span>🔒 {ACCESS_LABEL[c.access]}</span></div>
              </>}
            </article>);
        })}
      </div>
    </Shell>
  );
}
