// SaveSystem — localStorage only. Not secure; do not store secrets here.
const KEY = 'thecasefiles.save.v1';
export const defaultSettings = () => ({
  sound: true, music: true, textSpeed: 'normal', lang: 'en',
  reduceMotion: typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches,
});
export const emptyProgress = () => ({
  started: false, stage: 'new', scenes: [], evidence: [], examined: [], visited: [],
  puzzles: {}, asked: {}, suspicion: {}, timeline: { order: [], flags: {}, solved: false },
  board: { links: [] }, theory: null, result: null,
});
export function loadSave() { try { const r = JSON.parse(localStorage.getItem(KEY)); return r && r.v === 1 ? r : null; } catch { return null; } }
export function writeSave(data) { try { localStorage.setItem(KEY, JSON.stringify({ v: 1, ...data })); } catch { /* storage full or blocked */ } }
export function wipeSave() { try { localStorage.removeItem(KEY); } catch { /* ignore */ } }
