import { useState } from 'react';
import { useGame } from '../engine/GameContext.jsx';
import Shell from '../components/Shell.jsx';
import Sheet from '../components/Sheet.jsx';

const Toggle = ({ label, sub, on, set }) => (
  <div className="set-row"><div><b>{label}</b>{sub && <small>{sub}</small>}</div>
    <button role="switch" aria-checked={on} aria-label={label} className={`switch ${on ? 'on' : ''}`} onClick={() => set(!on)}><i /></button></div>);
export default function Settings() {
  const { settings, setSetting, resetAll, resetCase, cs, t, lang } = useGame(); const [ask, setAsk] = useState(null);
  return (
    <Shell title={t('Settings')} noNav><div className="scroll pad">
      <div className="set-row col"><div><b>{t('Language')}</b></div>
        <div className="seg" role="radiogroup" aria-label={t('Language')}>
          <button role="radio" aria-checked={lang === 'en'} className={lang === 'en' ? 'on' : ''} onClick={() => setSetting('lang', 'en')}>English</button>
          <button role="radio" aria-checked={lang === 'ar'} className={lang === 'ar' ? 'on' : ''} onClick={() => setSetting('lang', 'ar')}>العربية</button>
        </div></div>
      <Toggle label={t('Sound effects')} on={settings.sound} set={v => setSetting('sound', v)} />
      <Toggle label={t('Music')} on={settings.music} set={v => setSetting('music', v)} />
      <Toggle label={t('Reduce motion')} sub={lang === 'ar' ? 'يوقف حركة الكاميرا والمطر والتحبب' : 'Stops camera moves, rain and grain'} on={settings.reduceMotion} set={v => setSetting('reduceMotion', v)} />
      <div className="set-row col"><div><b>{t('Text speed')}</b></div>
        <div className="seg" role="radiogroup" aria-label={t('Text speed')}>{['slow', 'normal', 'fast', 'instant'].map(s => <button key={s} role="radio" aria-checked={settings.textSpeed === s} className={settings.textSpeed === s ? 'on' : ''} onClick={() => setSetting('textSpeed', s)}>{t(s)}</button>)}</div></div>
      <div className="set-row col"><div><b>{lang === 'ar' ? 'التقدّم' : 'Progress'}</b><small>{lang === 'ar' ? 'محفوظ في هذا المتصفح فقط.' : 'Saved in this browser only.'}</small></div>
        <div className="row"><button className="btn" onClick={() => setAsk('case')}>{t('Reset this case')}</button><button className="btn danger" onClick={() => setAsk('all')}>{t('Reset all progress')}</button></div></div>
      <Sheet open={!!ask} onClose={() => setAsk(null)} title={ask === 'all' ? t('Reset all progress') + '?' : `${t('Reset this case')}: ${cs.title}?`}>
        <p>{ask === 'all' ? t('This clears everything — every case, every save. This cannot be undone.') : t('This clears your progress on this case only. This cannot be undone.')}</p>
        <div className="row"><button className="btn" onClick={() => setAsk(null)}>{t('Cancel')}</button><button className="btn danger" onClick={() => { ask === 'all' ? resetAll() : resetCase(); setAsk(null); }}>{t('Reset')}</button></div>
      </Sheet>
    </div></Shell>
  );
}
