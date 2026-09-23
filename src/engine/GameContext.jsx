import { createContext, useContext, useEffect, useMemo, useReducer, useCallback } from 'react';
import { loadSave, writeSave, wipeSave, defaultSettings, emptyProgress } from './save.js';
import { getCase } from '../cases/index.js';
import { audio } from './audio.js';
import { localizeCase } from './localize.js';
import { t as translate } from '../i18n/strings.js';

const Ctx = createContext(null);
export const useGame = () => useContext(Ctx);

function init() {
  const s = loadSave();
  return { settings: { ...defaultSettings(), ...(s?.settings || {}) }, progress: s?.progress || {}, activeCase: s?.activeCase || 'case001',
    nav: { screen: 'home', params: {}, stack: [] }, toasts: [] };
}
const cur = (st) => st.progress[st.activeCase] || emptyProgress();
const withProg = (st, fn) => ({ ...st, progress: { ...st.progress, [st.activeCase]: fn(cur(st)) } });
const addEv = (st, ids) => {
  const p = cur(st); const fresh = [...new Set(ids)].filter(i => !p.evidence.includes(i));
  if (!fresh.length) return st;
  const next = withProg(st, q => ({ ...q, evidence: [...q.evidence, ...fresh] }));
  return { ...next, toasts: [...st.toasts, ...fresh.map(id => ({ id, key: id + Date.now() }))] };
};

function reducer(st, a) {
  switch (a.type) {
    case 'NAV': return { ...st, nav: { screen: a.screen, params: a.params || {}, stack: a.replace ? st.nav.stack : [...st.nav.stack.slice(-30), { screen: st.nav.screen, params: st.nav.params }] } };
    case 'BACK': { const stack = [...st.nav.stack]; const prev = stack.pop() || { screen: 'home', params: {} }; return { ...st, nav: { ...prev, stack } }; }
    case 'ROOT': return { ...st, nav: { screen: a.screen, params: a.params || {}, stack: [] } };
    case 'SETTING': return { ...st, settings: { ...st.settings, [a.key]: a.value } };
    case 'ACTIVE': return { ...st, activeCase: a.id };
    case 'START': return withProg({ ...st, activeCase: a.id }, p => ({ ...p, started: true, stage: p.stage === 'new' ? 'intro' : p.stage }));
    case 'STAGE': return withProg(st, p => ({ ...p, stage: a.stage }));
    case 'SCENE': return withProg(st, p => p.scenes.includes(a.id) ? p : { ...p, scenes: [...p.scenes, a.id] });
    case 'VISIT': return withProg(st, p => p.visited.includes(a.id) ? p : { ...p, visited: [...p.visited, a.id] });
    case 'EXAMINE': return withProg(st, p => p.examined.includes(a.key) ? p : { ...p, examined: [...p.examined, a.key] });
    case 'GRANT': return addEv(st, a.ids);
    case 'ASK': {
      let n = withProg(st, p => { const asked = p.asked[a.sid] || []; const s = Math.max(0, Math.min(100, (p.suspicion[a.sid] || 0) + (asked.includes(a.qid) ? 0 : a.delta || 0)));
        return { ...p, asked: { ...p.asked, [a.sid]: asked.includes(a.qid) ? asked : [...asked, a.qid] }, suspicion: { ...p.suspicion, [a.sid]: s } }; });
      return addEv(n, a.reveals || []);
    }
    case 'PUZZLE_FAIL': return withProg(st, p => ({ ...p, puzzles: { ...p.puzzles, [a.id]: { ...(p.puzzles[a.id] || {}), attempts: ((p.puzzles[a.id] || {}).attempts || 0) + 1 } } }));
    case 'PUZZLE_SOLVE': { const n = withProg(st, p => ({ ...p, puzzles: { ...p.puzzles, [a.id]: { ...(p.puzzles[a.id] || {}), solved: true } } })); return addEv(n, a.rewards || []); }
    case 'TIMELINE': return withProg(st, p => ({ ...p, timeline: { ...p.timeline, ...a.patch } }));
    case 'LINK': return withProg(st, p => p.board.links.includes(a.key) ? p : { ...p, board: { links: [...p.board.links, a.key] } });
    case 'THEORY': return withProg(st, p => ({ ...p, theory: a.answers, result: a.result, stage: 'done' }));
    case 'TOAST_DONE': return { ...st, toasts: st.toasts.filter(t => t.key !== a.key) };
    case 'RESET_CASE': return { ...st, progress: { ...st.progress, [st.activeCase]: emptyProgress() } };
    case 'RESET_ALL': return { ...st, progress: {}, nav: { screen: 'home', params: {}, stack: [] } };
    default: return st;
  }
}

export function GameProvider({ children }) {
  const [st, dispatch] = useReducer(reducer, undefined, init);
  const cs = useMemo(() => localizeCase(getCase(st.activeCase), st.settings.lang), [st.activeCase, st.settings.lang]);
  const prog = cur(st);

  useEffect(() => { writeSave({ settings: st.settings, progress: st.progress, activeCase: st.activeCase }); }, [st.settings, st.progress, st.activeCase]);
  useEffect(() => { audio.setPrefs({ sound: st.settings.sound, music: st.settings.music }); }, [st.settings.sound, st.settings.music]);
  useEffect(() => { document.documentElement.dataset.reduce = st.settings.reduceMotion ? '1' : '0'; }, [st.settings.reduceMotion]);
  useEffect(() => {
    const ar = st.settings.lang === 'ar';
    document.documentElement.dir = ar ? 'rtl' : 'ltr';
    document.documentElement.lang = ar ? 'ar' : 'en';
  }, [st.settings.lang]);

  const A = useMemo(() => ({
    go: (screen, params, replace) => dispatch({ type: 'NAV', screen, params, replace }),
    back: () => dispatch({ type: 'BACK' }),
    root: (screen, params) => dispatch({ type: 'ROOT', screen, params }),
    setSetting: (key, value) => dispatch({ type: 'SETTING', key, value }),
    grant: (ids) => dispatch({ type: 'GRANT', ids }),
    examine: (key) => dispatch({ type: 'EXAMINE', key }),
    visit: (id) => dispatch({ type: 'VISIT', id }),
    markScene: (id) => dispatch({ type: 'SCENE', id }),
    setStage: (stage) => dispatch({ type: 'STAGE', stage }),
    ask: (sid, q) => dispatch({ type: 'ASK', sid, qid: q.id, delta: q.suspicion, reveals: q.reveals }),
    puzzleFail: (id) => dispatch({ type: 'PUZZLE_FAIL', id }),
    puzzleSolve: (id, rewards) => dispatch({ type: 'PUZZLE_SOLVE', id, rewards }),
    setTimeline: (patch) => dispatch({ type: 'TIMELINE', patch }),
    addLink: (key) => dispatch({ type: 'LINK', key }),
    submitTheory: (answers, result) => dispatch({ type: 'THEORY', answers, result }),
    dismissToast: (key) => dispatch({ type: 'TOAST_DONE', key }),
    resetCase: () => dispatch({ type: 'RESET_CASE' }),
    resetAll: () => { wipeSave(); dispatch({ type: 'RESET_ALL' }); },
    startCase: (id) => {
      dispatch({ type: 'START', id });
      const p = st.progress[id] || emptyProgress();
      const stage = p.stage === 'new' ? 'intro' : p.stage;
      if (stage === 'intro') dispatch({ type: 'ROOT', screen: 'scene', params: { sceneId: 'intro', next: { screen: 'hub' } } });
      else if (stage === 'done') dispatch({ type: 'ROOT', screen: 'results' });
      else dispatch({ type: 'ROOT', screen: 'hub' });
    },
  }), [st.progress]);

  const t = useCallback((s) => translate(st.settings.lang, s), [st.settings.lang]);
  const value = { state: st, settings: st.settings, lang: st.settings.lang, nav: st.nav, cs, prog, progress: st.progress, t, ...A };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
