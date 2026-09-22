export const has = (p, id) => p.evidence.includes(id);
export const hasAll = (p, ids = []) => ids.every(i => p.evidence.includes(i));
export const hasAny = (p, ids = []) => !ids.length || ids.some(i => p.evidence.includes(i));
export const locationUnlocked = (loc, p) => !loc.unlock || hasAll(p, loc.unlock.evidence || []);
export const questionState = (q, p, sid) => { const asked = p.asked[sid] || []; return { asked: asked.includes(q.id), available: hasAll(p, q.requires) && (q.after || []).every(a => asked.includes(a)) }; };
export const visibleEvents = (cs, p) => cs.timeline.events.filter(e => hasAny(p, e.requires));
export const evidenceById = (cs, id) => cs.evidence.find(e => e.id === id);
export const personById = (cs, id) => id === cs.victim.id ? cs.victim : cs.suspects.find(s => s.id === id);
export const objectKey = (locId, objId) => `${locId}:${objId}`;
function done(d, p) {
  if (d.evidence && !hasAll(p, d.evidence)) return false;
  if (d.visited && !d.visited.every(v => p.visited.includes(v))) return false;
  if (d.timelineSolved && !p.timeline.solved) return false;
  if (d.links && p.board.links.length < d.links) return false;
  return true;
}
export const currentObjective = (cs, p) => cs.objectives.find(o => !done(o.done, p)) || cs.finalObjective;
export function nodeKey(a, b) { return [a, b].sort().join('|'); }
export function validLinks(cs, p) {
  return cs.boardLinks.filter(l => nodeAvailable(cs, p, l.a) && nodeAvailable(cs, p, l.b));
}
export function nodeAvailable(cs, p, id) {
  if (id.startsWith('S:')) return true;
  if (id.startsWith('L:')) return p.visited.includes(id.slice(2));
  return p.evidence.includes(id);
}
