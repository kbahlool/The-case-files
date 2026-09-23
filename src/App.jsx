import { GameProvider, useGame } from './engine/GameContext.jsx';
import { Toasts } from './components/Shell.jsx';
import Home from './screens/Home.jsx';
import CaseSelect from './screens/CaseSelect.jsx';
import HowToPlay from './screens/HowToPlay.jsx';
import Settings from './screens/Settings.jsx';
import CinematicScreen from './screens/CinematicScreen.jsx';
import Hub from './screens/Hub.jsx';
import Location from './screens/Location.jsx';
import PuzzleHost from './screens/PuzzleHost.jsx';
import Evidence from './screens/Evidence.jsx';
import { Suspects, SuspectProfile } from './screens/Suspects.jsx';
import Interrogation from './screens/Interrogation.jsx';
import Timeline from './screens/Timeline.jsx';
import Board from './screens/Board.jsx';
import Theory from './screens/Theory.jsx';
import Results from './screens/Results.jsx';

function Router() {
  const { nav } = useGame(); const p = nav.params || {};
  switch (nav.screen) {
    case 'home': return <Home />;
    case 'cases': return <CaseSelect />;
    case 'howto': return <HowToPlay />;
    case 'settings': return <Settings />;
    case 'scene': return <CinematicScreen sceneId={p.sceneId} next={p.next} />;
    case 'hub': return <Hub />;
    case 'location': return <Location id={p.id} />;
    case 'puzzle': return <PuzzleHost key={p.id} id={p.id} />;
    case 'evidence': return <Evidence open={p.open} />;
    case 'suspects': return <Suspects />;
    case 'suspect': return <SuspectProfile id={p.id} />;
    case 'interrogation': return <Interrogation id={p.id} />;
    case 'timeline': return <Timeline />;
    case 'board': return <Board />;
    case 'theory': return <Theory />;
    case 'results': return <Results />;
    default: return <Home />;
  }
}
export default function App() { return <GameProvider><div className="app"><Router /><Toasts /></div></GameProvider>; }
