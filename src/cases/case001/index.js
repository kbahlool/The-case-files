// Case 001 — assembled case object. The engine only ever sees this shape.
import { meta, victim, suspects, cast } from './people.js';
import { locations } from './locations.js';
import { evidence } from './evidence.js';
import { scenes } from './scenes.js';
import { interrogations } from './interrogations.js';
import { puzzles } from './puzzles.js';
import { timeline, boardLinks, objectives, finalObjective } from './timeline.js';
import { theory, endings } from './theory.js';

export default {
  ...meta, victim, suspects, cast, locations, evidence, scenes,
  interrogations, puzzles, timeline, boardLinks, objectives, finalObjective,
  finalTheory: theory, endings,
};
