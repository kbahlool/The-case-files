import { useImageOk } from '../engine/hooks.js';
/** Character portrait: real image if present, otherwise a rim-lit silhouette. */
export default function Portrait({ person, size = 'md', caseId = 'case001', className = '' }) {
  const url = person?.image ? `${import.meta.env.BASE_URL}assets/${caseId}/characters/${person.image}` : null;
  const ok = useImageOk(url); const c = person?.color || '#8899aa'; const fig = person?.figure || 'short';
  return (
    <div className={`portrait ${size} ${className}`} style={{ '--c': c }} aria-label={person?.name}>
      {ok ? <div className="photo" style={{ backgroundImage: `url(${url})` }} /> : (
        <svg viewBox="0 0 100 120" aria-hidden="true">
          <defs><linearGradient id={'pg' + (person?.id || 'x')} x1="0" x2="1"><stop offset="0" stopColor={c} stopOpacity=".9" /><stop offset=".5" stopColor="#0b0c10" /><stop offset="1" stopColor="#050608" /></linearGradient></defs>
          <path d="M8 120 C8 84 30 76 50 76 C70 76 92 84 92 120Z" fill={`url(#pg${person?.id || 'x'})`} />
          {fig === 'long' && <path d="M27 50 C27 20 73 20 73 50 L76 96 C66 84 34 84 24 96Z" fill="#0b0c10" stroke={c} strokeOpacity=".6" />}
          <ellipse cx="50" cy="48" rx="17" ry="21" fill={`url(#pg${person?.id || 'x'})`} stroke={c} strokeOpacity=".7" />
          {fig === 'short' && <path d="M32 44 C32 22 68 22 68 44 C62 34 38 34 32 44Z" fill="#0b0c10" />}
          {fig === 'cap' && <path d="M30 40 C32 22 68 22 70 40 L84 42 L30 44Z" fill="#0b0c10" stroke={c} strokeOpacity=".6" />}
        </svg>)}
    </div>
  );
}
