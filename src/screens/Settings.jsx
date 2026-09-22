import { useState } from 'react';
import { useGame } from '../engine/GameContext.jsx';
import Shell from '../components/Shell.jsx';
import Sheet from '../components/Sheet.jsx';

const Toggle = ({ label, sub, on, set }) => (
  <div className="set-row"><div><b>{label}</b>{sub && <small>{sub}</small>}</div>
    <button role="switch" aria-checked={on} aria-label={label} className={`switch ${on ? 'on' : ''}`} onClick={() => set(!on)}><i /></button></div>);
export default function Settings() {
  const { settings, setSetting, resetAll, resetCase, cs } = useGame(); const [ask, setAsk] = useState(null);
  return (
    <Shell title="Settings" noNav><div className="scroll pad">
      <Toggle label="Sound effects" on={settings.sound} set={v => setSetting('sound', v)} />
      <Toggle label="Music & ambience" on={settings.music} set={v => setSetting('music', v)} />
      <Toggle label="Reduce motion" sub="Stops camera moves, rain and grain" on={settings.reduceMotion} set={v => setSetting('reduceMotion', v)} />
      <div className="set-row col"><div><b>Text speed</b></div>
        <div className="seg" role="radiogroup" aria-label="Text speed">{['slow', 'normal', 'fast', 'instant'].map(s => <button key={s} role="radio" aria-checked={settings.textSpeed === s} className={settings.textSpeed === s ? 'on' : ''} onClick={() => setSetting('textSpeed', s)}>{s}</button>)}</div></div>
      <div className="set-row col"><div><b>Progress</b><small>Saved in this browser only.</small></div>
        <div className="row"><button className="btn" onClick={() => setAsk('case')}>Reset this case</button><button className="btn danger" onClick={() => setAsk('all')}>Reset everything</button></div></div>
      <Sheet open={!!ask} onClose={() => setAsk(null)} title={ask === 'all' ? 'Reset all progress?' : `Reset ${cs.title}?`}>
        <p>This cannot be undone.</p>
        <div className="row"><button className="btn" onClick={() => setAsk(null)}>Cancel</button><button className="btn danger" onClick={() => { ask === 'all' ? resetAll() : resetCase(); setAsk(null); }}>Reset</button></div>
      </Sheet>
    </div></Shell>
  );
}
