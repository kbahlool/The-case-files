import { useGame } from '../engine/GameContext.jsx';
import Shell from '../components/Shell.jsx';
import Backdrop from '../components/Backdrop.jsx';
import { Fx } from '../components/Fx.jsx';

const ROWS = [['killer', 'Killer'], ['motive', 'Motive'], ['method', 'Method'], ['time', 'Time of death'], ['evidence', 'Key evidence']];
export default function Results() {
  const { cs, prog, go, root, resetCase, t } = useGame(); const r = prog.result;
  if (!r) return <Shell title={t('Results')} noNav onBack={() => root('hub')}><p className="pad">{t('No verdict yet.')}</p></Shell>;
  const end = cs.endings[r.ending];
  const kicker = r.ending === 'A' ? t('CASE CLOSED') : r.ending === 'B' ? t('CASE CLOSED · WITH DOUBT') : t('CASE CLOSED · WRONGLY');
  return (
    <div className="screen results">
      <Backdrop set="workshop" caseId={cs.id} dur={60000} /><Fx list={['dust', 'grain']} />
      <div className="scroll res-inner">
        <p className="kicker">{kicker}</p>
        <h1 className="res-title">{end.title}</h1>
        <p className="res-label">{end.label}</p>
        <ul className="res-list">{ROWS.map(([k, l]) => <li key={k} className={r.ok[k] ? 'y' : 'n'}><span>{t(l)}</span><b>{r.ok[k] ? '✓' : '✗'}</b></li>)}
          <li className={prog.timeline.solved ? 'y' : 'n'}><span>{t('Timeline rebuilt')}</span><b>{prog.timeline.solved ? '✓' : '✗'}</b></li></ul>
        <div className="score"><small>{t('INVESTIGATION SCORE')}</small><b>{r.total}<i> / 100</i></b></div>
        <p className="res-sum">{end.summary}</p>
        <button className="btn primary big" onClick={() => go('scene', { sceneId: end.scene, next: { screen: 'results' } }, true)}>{t('Watch the final scene')}</button>
        <div className="row"><button className="btn" onClick={() => root('cases')}>{t('Case files')}</button>
          <button className="btn" onClick={() => { resetCase(); root('scene', { sceneId: 'intro', next: { screen: 'hub' } }); }}>{t('Replay case')}</button>
          <button className="btn" onClick={() => root('home')}>{t('Home')}</button></div>
      </div>
    </div>);
}
