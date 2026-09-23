import { useGame } from '../engine/GameContext.jsx';
import { CASES, canPlay } from '../cases/index.js';
import { localizeCase } from '../engine/localize.js';
import Shell from '../components/Shell.jsx';

const ACCESS_LABEL = { FREE: 'FREE', PREMIUM: 'PREMIUM', LOCKED: 'LOCKED', COMING_SOON: 'COMING SOON' };
export default function CaseSelect() {
  const { go, root, progress, startCase, t, lang } = useGame();
  return (
    <Shell title={t('Case files')} noNav onBack={() => root('home')}>
      <div className="scroll pad">
        <p className="season">{lang === 'ar' ? 'الموسم الأول' : 'SEASON ONE'}</p>
        {CASES.map(c => {
          const playable = canPlay(c); const p = progress[c.id]; const d = c.data ? localizeCase(c.data, lang) : c.data;
          const status = !playable ? 'CLASSIFIED' : p?.stage === 'done' ? 'CLOSED' : p?.started ? 'IN PROGRESS' : 'AVAILABLE';
          const statusLabel = lang === 'ar' ? { CLASSIFIED: 'سرّي', CLOSED: 'مغلقة', 'IN PROGRESS': 'جارية', AVAILABLE: 'متاحة' }[status] : status;
          return (
            <article key={c.id} className={`case-card ${playable ? '' : 'locked'}`}>
              <div className="cc-head"><span className="cc-num">{lang === 'ar' ? `القضية ${c.number}` : `CASE ${c.number}`}</span><span className={`pill ${status.replace(' ', '')}`}>{statusLabel}</span></div>
              {playable ? <>
                <h3 className="cc-title">{d.title}</h3>
                <p className="cc-sub">{d.subtitle}</p>
                <p className="muted">{d.tease}</p>
                <div className="cc-meta"><span aria-label={`Difficulty ${d.difficultyLevel} of 5`}>{'●'.repeat(d.difficultyLevel)}{'○'.repeat(5 - d.difficultyLevel)}</span><span>{d.difficulty}</span><span>{d.estMinutes}</span><span className="tag-free">{ACCESS_LABEL[c.access]}</span></div>
                {p?.result && <p className="cc-score">{t('Score')} {p.result.total} / 100 · {d.endings[p.result.ending].title}</p>}
                <button className="btn primary" onClick={() => startCase(c.id)}>{lang === 'ar' ? (p?.stage === 'done' ? 'مراجعة القضية' : p?.started ? 'متابعة' : 'فتح الملف') : (p?.stage === 'done' ? 'Review case' : p?.started ? 'Continue' : 'Open file')}</button>
              </> : <>
                <h3 className="cc-title redacted"><i /><i /></h3>
                <p className="muted">{lang === 'ar' && c.teaser_ar ? c.teaser_ar : c.teaser}</p>
                <div className="cc-meta"><span>🔒 {t(ACCESS_LABEL[c.access])}</span></div>
              </>}
            </article>);
        })}
      </div>
    </Shell>
  );
}
