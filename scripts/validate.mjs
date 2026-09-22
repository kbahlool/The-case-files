// Content validator: referential integrity + a full solve simulation. Run: npm run validate
import c from '../src/cases/case001/index.js';
const ids = new Set(c.evidence.map(e => e.id));
const errs = [];
const chk = (id, where) => { if (!ids.has(id)) errs.push(`unknown evidence ${id} in ${where}`); };
c.locations.forEach(l => { (l.unlock?.evidence||[]).forEach(e => chk(e, l.id)); l.objects.forEach(o => { [...(o.evidence||[]), ...(o.requires||[])].forEach(e => chk(e, l.id+':'+o.id)); if (o.puzzle && !c.puzzles[o.puzzle]) errs.push('bad puzzle '+o.puzzle); }); });
Object.entries(c.interrogations).forEach(([s, sc]) => { if (!c.suspects.find(x=>x.id===s)) errs.push('bad suspect '+s); const qs = sc.questions.map(q=>q.id); sc.questions.forEach(q => { [...(q.requires||[]), ...(q.reveals||[])].forEach(e => chk(e, q.id)); (q.after||[]).forEach(a => { if (!qs.includes(a)) errs.push(`bad after ${a} in ${q.id}`); }); }); });
Object.values(c.puzzles).forEach(p => (p.rewards||[]).forEach(e => chk(e, p.id)));
c.timeline.events.forEach(t => t.requires.forEach(e => chk(e, t.id)));
const nodes = new Set([...ids, ...c.suspects.map(s=>'S:'+s.id), ...c.locations.map(l=>'L:'+l.id)]);
c.boardLinks.forEach(l => { if (!nodes.has(l.a) || !nodes.has(l.b)) errs.push(`bad link ${l.a}-${l.b}`); });
c.objectives.forEach(o => (o.done.evidence||[]).forEach(e => chk(e,'objective')));
c.finalTheory.correct.evidence.forEach(e => chk(e,'theory'));
// simulate a full play
const own = new Set(['E24']); const asked = {}; const visited = new Set(); let changed = true;
const has = (a=[]) => a.every(x => own.has(x));
while (changed) { changed = false; const before = own.size + Object.values(asked).flat().length;
  c.locations.forEach(l => { if (!has(l.unlock?.evidence)) return; visited.add(l.id); l.objects.forEach(o => { if (!has(o.requires)) return; (o.evidence||[]).forEach(e => own.add(e)); if (o.puzzle) (c.puzzles[o.puzzle].rewards||[]).forEach(e => own.add(e)); }); });
  Object.entries(c.interrogations).forEach(([s, sc]) => { asked[s] ||= []; sc.questions.forEach(q => { if (has(q.requires) && (q.after||[]).every(a => asked[s].includes(a)) && !asked[s].includes(q.id)) { asked[s].push(q.id); (q.reveals||[]).forEach(e => own.add(e)); } }); });
  if (own.size + Object.values(asked).flat().length !== before) changed = true; }
const missing = [...ids].filter(i => !own.has(i)); if (missing.length) errs.push('UNREACHABLE evidence: '+missing.join(','));
const unasked = Object.entries(c.interrogations).flatMap(([s,sc]) => sc.questions.filter(q=>!asked[s].includes(q.id)).map(q=>q.id)); if (unasked.length) errs.push('UNREACHABLE questions: '+unasked.join(','));
const evs = c.timeline.events.filter(t => !t.requires.length || t.requires.some(e => own.has(e))); if (evs.length < c.timeline.minEvents) errs.push('timeline too short');
console.log(`evidence ${own.size}/${ids.size} reachable · locations ${visited.size}/${c.locations.length} · timeline events ${evs.length} · board links ${c.boardLinks.length} · puzzles ${Object.keys(c.puzzles).length}`);
console.log(errs.length ? 'ERRORS:\n' + errs.join('\n') : 'VALIDATION PASSED');
process.exit(errs.length ? 1 : 0);
