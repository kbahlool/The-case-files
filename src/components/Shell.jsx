import { useEffect } from 'react';
import { useGame } from '../engine/GameContext.jsx';
import { audio } from '../engine/audio.js';

const TABS = [['hub', 'Scene', '⌖'], ['evidence', 'Evidence', '▤'], ['suspects', 'Suspects', '☺'], ['timeline', 'Timeline', '◷'], ['board', 'Board', '⌗']];

/** Investigation chrome: slim top bar + bottom tab bar. Disappears (noNav) when the story needs the full screen. */
export default function Shell({ title, tab, onBack, right, children, noNav, className = '' }) {
  const { go, back, prog } = useGame();
  return (
    <div className={`screen shell ${className}`}>
      <header className="topbar">
        <button className="icon-btn" onClick={onBack || back} aria-label="Back">‹</button>
        <h2 className="tb-title">{title}</h2>
        <div className="tb-right">{right}</div>
      </header>
      <main className="shell-main">{children}</main>
      {!noNav && (
        <nav className="tabbar" aria-label="Investigation">
          {TABS.map(([id, label, ico]) => (
            <button key={id} className={tab === id ? 'on' : ''} aria-current={tab === id ? 'page' : undefined} onClick={() => { audio.sfx('click'); if (tab !== id) go(id, {}, true); }}>
              <span className="t-ico" aria-hidden="true">{ico}</span><span>{label}</span>
              {id === 'evidence' && prog.evidence.length > 0 && <i className="badge">{prog.evidence.length}</i>}
            </button>))}
        </nav>)}
    </div>
  );
}

export function Toasts() {
  const { state, dismissToast, cs, go } = useGame();
  const t = state.toasts[0];
  useEffect(() => {
    if (!t) return; audio.sfx('ping'); const id = setTimeout(() => dismissToast(t.key), 3400); return () => clearTimeout(id);
  }, [t?.key]);
  if (!t) return null;
  const ev = cs.evidence.find(e => e.id === t.id);
  return (
    <button className="toast" key={t.key} onClick={() => { dismissToast(t.key); go('evidence', { open: t.id }); }} aria-live="polite">
      <small>EVIDENCE DISCOVERED</small><b>{ev?.title}</b>
    </button>
  );
}
