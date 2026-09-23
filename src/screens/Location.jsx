import { useEffect, useState } from 'react';
import { useGame } from '../engine/GameContext.jsx';
import { hasAll, objectKey } from '../engine/selectors.js';
import { audio } from '../engine/audio.js';
import Shell from '../components/Shell.jsx';
import Backdrop from '../components/Backdrop.jsx';
import { Fx } from '../components/Fx.jsx';
import Sheet from '../components/Sheet.jsx';

/** Location explorer: a full-bleed scene with tappable hotspots. */
export default function Location({ id }) {
  const { cs, prog, go, back, visit, examine, grant, settings, t } = useGame();
  const loc = cs.locations.find(l => l.id === id);
  const [sel, setSel] = useState(null);
  const intro = loc.intro && !prog.scenes.includes(loc.intro);
  useEffect(() => {
    if (intro) { go('scene', { sceneId: loc.intro, next: { screen: 'location', params: { id } } }, true); return; }
    visit(id); audio.ambient('rain'); return () => audio.ambient(null);
    // eslint-disable-next-line
  }, [id, intro]);
  if (intro) return null;
  const unlocked = (o) => hasAll(prog, o.requires);
  const tap = (o) => {
    audio.sfx('click'); setSel(o);
    if (unlocked(o)) { examine(objectKey(id, o.id)); if (o.evidence?.length) grant(o.evidence); }
  };
  const solved = (o) => o.puzzle && prog.puzzles[o.puzzle]?.solved;
  const found = (o) => prog.examined.includes(objectKey(id, o.id));
  const total = loc.objects.filter(o => o.evidence?.length).length;
  const got = loc.objects.filter(o => o.evidence?.length && o.evidence.every(e => prog.evidence.includes(e))).length;
  return (
    <Shell title={loc.name} tab="hub" onBack={() => go('hub', {}, true)} right={<span className="counter">{got}/{total}</span>}>
      <div className="stage">
        <Backdrop set={loc.set} image={loc.image} caseId={cs.id} dur={40000} reduce={settings.reduceMotion} />
        <Fx list={['dust', 'grain']} />
        <div className="hot-layer">
          {loc.objects.map(o => (
            <button key={o.id} className={`hot ${found(o) ? 'seen' : ''}`} style={{ left: o.x + '%', top: o.y + '%' }} onClick={() => tap(o)} aria-label={o.label}>
              <i className="hot-dot">{o.icon}</i><span>{o.label}</span>
            </button>))}
        </div>
      </div>
      <Sheet open={!!sel} onClose={() => setSel(null)} title={sel?.label}>
        {sel && (unlocked(sel) ? <>
          <p>{solved(sel) && sel.doneText ? sel.doneText : sel.text}</p>
          {sel.evidence?.length > 0 && <p className="found">{sel.evidence.map(e => cs.evidence.find(x => x.id === e)?.title).join(' · ')} {t('added to evidence.')}</p>}
          {sel.puzzle && !solved(sel) && <button className="btn primary" onClick={() => { setSel(null); go('puzzle', { id: sel.puzzle, loc: id }); }}>{t('Examine closely')}</button>}
        </> : <p>{sel.lockedText || t('Nothing of interest yet.')}</p>)}
        <button className="btn" onClick={() => setSel(null)}>{t('Close')}</button>
      </Sheet>
    </Shell>
  );
}
