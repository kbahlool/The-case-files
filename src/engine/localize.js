// Generic structural merge: overlays translated strings from `patch` onto `base`,
// matching arrays by index and objects by shared keys. Anything patch omits falls
// back to the base (English) value, so partial translations never break the game.
export function deepLocalize(base, patch) {
  if (patch == null) return base;
  if (typeof patch === 'string') return patch;
  if (Array.isArray(base) && Array.isArray(patch)) {
    return base.map((item, i) => (patch[i] !== undefined ? deepLocalize(item, patch[i]) : item));
  }
  if (base && typeof base === 'object' && patch && typeof patch === 'object') {
    const out = { ...base };
    for (const k of Object.keys(patch)) out[k] = deepLocalize(base[k], patch[k]);
    return out;
  }
  return base;
}

export function localizeCase(cs, lang) {
  if (lang !== 'ar' || !cs.ar) return cs;
  return deepLocalize(cs, cs.ar);
}
