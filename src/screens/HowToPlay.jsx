import Shell from '../components/Shell.jsx';
const STEPS = [
  ['Watch', 'Story scenes play like a series. Tap to read on. Skip any time.'],
  ['Investigate', 'Tap the glowing points in each location. Some hold evidence, some only atmosphere.'],
  ['Question', 'Interview suspects. New questions unlock when you find evidence that contradicts them.'],
  ['Solve', 'Story puzzles unlock phones, ledgers and cameras. Each one teaches you something.'],
  ['Rebuild', 'Put events in the true order on the Timeline. One of the times you were given is a lie.'],
  ['Connect', 'On the Board, tap two items to link them. Correct links reveal what they mean.'],
  ['Accuse', 'Build your theory: who, why, how, when, and your key evidence. Then see the truth.'],
];
export default function HowToPlay() {
  return (
    <Shell title="How to play" noNav><div className="scroll pad">
      <p className="lead">You are the detective. Nobody will tell you what matters; you decide.</p>
      <ol className="howto">{STEPS.map(([h, t]) => <li key={h}><b>{h}</b><span>{t}</span></li>)}</ol>
      <p className="muted small">Your progress saves automatically on this device. Nothing leaves your browser.</p>
    </div></Shell>
  );
}
