// ScoringSystem. Score is deliberately secondary to the story.
export function scoreTheory(cs, prog, a) {
  const t = cs.finalTheory, P = t.points;
  const ok = { killer: a.killer === t.killer, motive: a.motive === t.correct.motive, method: a.method === t.correct.method, time: a.time === t.correct.time, evidence: t.correct.evidence.includes(a.evidence) };
  const points = { killer: ok.killer ? P.killer : 0, motive: ok.motive ? P.motive : 0, method: ok.method ? P.method : 0,
    timeline: (ok.time ? P.time : 0) + (prog.timeline.solved ? P.timeline : 0), evidence: ok.evidence ? P.evidence : 0 };
  const total = Object.values(points).reduce((x, y) => x + y, 0);
  const ending = ok.killer && ok.motive && ok.method && ok.time && ok.evidence ? 'A' : ok.killer ? 'B' : 'C';
  return { ok, points, total, ending, accused: a.killer };
}
