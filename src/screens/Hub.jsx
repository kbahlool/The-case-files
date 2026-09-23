import { useEffect } from 'react';
import { useGame } from '../engine/GameContext.jsx';
import { currentObjective, locationUnlocked, hasAll } from '../engine/selectors.js';
import { audio } from '../engine/audio.js';
import Shell from '../components/Shell.jsx';
import Backdrop from '../components/Backdrop.jsx';

/** Investigation hub: next lead, places to go, and the final theory once enough is known. */
export default function Hub() {
  const { cs, prog, go, root, settings, t, lang } = useGame();
  const obj = currentObjective(cs, prog);
  const ready = prog.evidence.length >= 14 && hasAll(prog, ['E02', 'E10']);
  useEffect(() => { audio.ambient('rain'); return () => audio.ambient(null); }, []);
  const open = (l) => { audio.sfx('door'); go('location', { id: l.id }); };
  return (
    <Shell title={cs.title} tab="hub" onBack={() => root('home')}>
      <div className="scroll pad">
        <div className="lead"><small>{t('NEXT LEAD')}</small><p>{obj.text}</p></div>
        <p className="season">{t('LOCATIONS')}</p>
        {cs.locations.map(l => {
          const ok = locationUnlocked(l, prog);
          return (
            <button key={l.id} className={`loc-card ${ok ? '' : 'locked'}`} disabled={!ok} onClick={() => open(l)}>
              <div className="loc-art"><Backdrop set={l.set} image={l.image} caseId={cs.id} dur={60000} reduce /></div>
              <div className="loc-txt"><small>{ok ? l.tag : t('LOCKED')}</small><b>{ok ? l.name : (lang === 'ar' ? 'مكان مجهول' : 'Unknown location')}</b><em>{ok ? l.blurb : l.unlock.hint || l.hint}</em></div>
              {ok && prog.visited.includes(l.id) && <span className="loc-done">{cs.locations.length ? '✓' : ''}</span>}
            </button>);
        })}
        <div className="row hub-actions">
          <button className="btn" onClick={() => go('suspects', {}, true)}>{t('Question suspects')}</button>
        </div>
        <button className={`btn big ${ready ? 'primary' : ''}`} onClick={() => go(prog.scenes.includes('theory_night') ? 'theory' : 'scene', prog.scenes.includes('theory_night') ? {} : { sceneId: 'theory_night', next: { screen: 'theory' } })}>
          {t('Build your final theory')}
        </button>
        {!ready && <p className="muted small center">{t('You can accuse at any time, but you are probably not ready.')}</p>}
      </div>
    </Shell>
  );
}
