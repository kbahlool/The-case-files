export const CAT_ICON = { PHYSICAL: '◆', DIGITAL: '▣', TESTIMONY: '❝', DOCUMENT: '▤', FINANCIAL: '$', TIMELINE: '◷' };
export default function EvidenceCard({ ev, onClick, selected, fresh, t }) {
  const tt = t || ((s) => s);
  return (
    <button className={`ev-card ${selected ? 'sel' : ''} ${fresh ? 'fresh' : ''}`} data-cat={ev.category} onClick={onClick}>
      <span className="ev-ico" aria-hidden="true">{CAT_ICON[ev.category]}</span>
      <span className="ev-txt"><b>{ev.title}</b><em>{tt(ev.category)} · {ev.location}</em></span>
      {ev.importance === 'KEY' && <span className="ev-key" title="Key evidence">{tt('KEY')}</span>}
    </button>
  );
}
