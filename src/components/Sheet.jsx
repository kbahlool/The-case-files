import { useEffect } from 'react';
export default function Sheet({ open, onClose, title, children, tall }) {
  useEffect(() => { if (!open) return; const k = (e) => e.key === 'Escape' && onClose?.(); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="sheet-wrap" onClick={onClose}>
      <div className={`sheet ${tall ? 'tall' : ''}`} role="dialog" aria-modal="true" aria-label={title} onClick={e => e.stopPropagation()}>
        <div className="sheet-grab" />
        {title && <h3 className="sheet-title">{title}</h3>}
        <div className="sheet-body">{children}</div>
      </div>
    </div>
  );
}
