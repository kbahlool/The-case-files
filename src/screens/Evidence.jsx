import { useState } from 'react';
import { useGame } from '../engine/GameContext.jsx';
import Shell from '../components/Shell.jsx';
import Sheet from '../components/Sheet.jsx';
import EvidenceCard, { CAT_ICON } from '../components/EvidenceCard.jsx';

const CATS = ['ALL', 'PHYSICAL', 'DIGITAL', 'TESTIMONY', 'DOCUMENT', 'FINANCIAL', 'TIMELINE'];
export default function Evidence({ open }) {
  const { cs, prog, go, t, lang } = useGame();
  const [cat, setCat] = useState('ALL'); const [sel, setSel] = useState(open || null);
  const list = cs.evidence.filter(e => prog.evidence.includes(e.id) && (cat === 'ALL' || e.category === cat));
  const ev = cs.evidence.find(e => e.id === sel);
  const linked = ev && cs.boardLinks.some(l => prog.board.links.includes([l.a, l.b].sort().join('|')) && (l.a === ev.id || l.b === ev.id));
  const names = (ev?.related || []).map(r => cs.suspects.find(s => s.id === r)?.name || (r === cs.victim.id ? cs.victim.name : null)).filter(Boolean);
  return (
    <Shell title={`${t('Evidence')} · ${prog.evidence.length}/${cs.evidence.length}`} tab="evidence" onBack={() => go('hub', {}, true)}>
      <div className="chips" role="tablist">{CATS.map(c => <button key={c} className={cat === c ? 'on' : ''} onClick={() => setCat(c)}>{c === 'ALL' ? t('All') : t(c)}</button>)}</div>
      <div className="scroll pad">
        {list.length === 0 && <p className="empty">{prog.evidence.length ? t('Nothing in this category yet.') : t('No evidence yet. Search the scene.')}</p>}
        {list.map(e => <EvidenceCard key={e.id} ev={e} onClick={() => setSel(e.id)} t={t} />)}
      </div>
      <Sheet open={!!ev} onClose={() => setSel(null)} title={ev?.title} tall>
        {ev && <>
          <p className="meta">{CAT_ICON[ev.category]} {t(ev.category)} · {t('Found')}: {ev.location}{ev.importance === 'KEY' ? ` · ${t('KEY')}` : ''}</p>
          <p>{ev.description}</p>
          {names.length > 0 && <p className="meta">{t('Related')}: {names.join(lang === 'ar' ? '، ' : ', ')}</p>}
          {ev.timeline && <p className="meta">{t('Timeline')}: {cs.timeline.events.find(ti => ti.id === ev.timeline)?.time || ev.timeline}</p>}
          {linked && ev.hidden && <p className="hidden-conn"><small>{t('CONNECTION')}</small>{ev.hidden}</p>}
          {!linked && ev.hidden && <p className="muted small">{t('Connect this on the Evidence Board to reveal more.')}</p>}
          <button className="btn" onClick={() => setSel(null)}>{t('Close')}</button>
        </>}
      </Sheet>
    </Shell>
  );
}
