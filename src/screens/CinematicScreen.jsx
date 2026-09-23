import { useGame } from '../engine/GameContext.jsx';
import ScenePlayer from '../components/ScenePlayer.jsx';

/** Plays a scene from case data, then routes to params.next (default: investigation hub). */
export default function CinematicScreen({ sceneId, next }) {
  const { cs, markScene, grant, setStage, go } = useGame();
  const scene = cs.scenes[sceneId];
  const done = () => {
    markScene(sceneId); grant(scene.beats.flatMap(b => b.grants || []));
    if (sceneId === 'intro') setStage('hub');
    go(next?.screen || 'hub', next?.params, true);
  };
  return <ScenePlayer key={sceneId} beats={scene.beats} onBeat={b => b.grants && grant(b.grants)} onDone={done} label={sceneId} />;
}
