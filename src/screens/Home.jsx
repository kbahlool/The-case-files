import { useEffect } from 'react';
import { useGame } from '../engine/GameContext.jsx';
import { audio } from '../engine/audio.js';
import Backdrop from '../components/Backdrop.jsx';
import { Fx } from '../components/Fx.jsx';

export default function Home() {
  const { go, progress, startCase, state, settings } = useGame();
  const started = Object.values(progress).some(p => p.started);
  useEffect(() => { audio.ambient('rain'); audio.music('drone'); return () => { audio.ambient(null); audio.music(null); }; }, []);
  const cam = { from: { s: 1.05, x: 0, y: 0 }, to: { s: 1.35, x: -5, y: -3 } };
  return (
    <div className="screen home" onPointerDown={() => audio.unlock()}>
      <Backdrop set="street" image="street.webp" camera={cam} dur={26000} reduce={settings.reduceMotion} />
      <Fx list={['rain', 'fog', 'grain']} />
      <div className="letterbox top" /><div className="letterbox bottom" />
      <div className="home-inner">
        <p className="kicker">An interactive crime series</p>
        <h1 className="logo"><span>THE</span> CASE FILES</h1>
        <p className="tagline">Every clue has a story.</p>
        <nav className="menu" aria-label="Main menu">
          <button className="btn primary big" onClick={() => { audio.sfx('transition'); started ? startCase(state.activeCase) : startCase('case001'); }}>{started ? 'Continue case' : 'Start investigation'}</button>
          <button className="btn big" onClick={() => go('cases')}>Case files</button>
          <button className="btn big" onClick={() => go('howto')}>How to play</button>
          <button className="btn big" onClick={() => go('settings')}>Settings</button>
        </nav>
      </div>
    </div>
  );
}
