import { useState } from 'react';
import { useGame } from '../engine/GameContext.jsx';
import { audio } from '../engine/audio.js';
import Shell from '../components/Shell.jsx';
import PuzzleSystem, { Exhibit } from '../components/PuzzleSystem.jsx';

export default function PuzzleHost({ id }) {
  const { cs, prog, puzzleFail, puzzleSolve, back, t } = useGame();
  const p = cs.puzzles[id]; const st = prog.puzzles[id] || {};
  const [won, setWon] = useState(!!st.solved);
  const hintOn = !p.hint?.requiresExamined || prog.examined.includes(p.hint.requiresExamined);
  const solve = () => { audio.sfx('success'); puzzleSolve(id, p.rewards); setWon(true); };
  const fail = () => { audio.sfx('failure'); puzzleFail(id); };
  return (
    <Shell title={p.title} noNav>
      <div className="scroll pad">
        <p className="lead-text">{p.intro}</p>
        {p.exhibit && <Exhibit ex={p.exhibit} />}
        {won ? (
          <div className="win"><small>{t('SOLVED')}</small><p>{p.lesson}</p>
            <button className="btn primary big" onClick={back}>{t('Back to the investigation')}</button></div>
        ) : <PuzzleSystem p={p} hintOn={hintOn} attempts={st.attempts || 0} onSolve={solve} onFail={fail} />}
      </div>
    </Shell>
  );
}
