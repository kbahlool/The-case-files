// AudioSystem. Works with zero audio files: cues are synthesised with WebAudio.
// To use real recordings, fill AUDIO_MANIFEST paths, drop the files in /public/assets/case001/audio/ and set USE_FILES = true.
export const AUDIO_MANIFEST = {
  rain: (import.meta.env?.BASE_URL || '/') + 'assets/case001/audio/rain.mp3', footsteps: (import.meta.env?.BASE_URL || '/') + 'assets/case001/audio/footsteps.mp3', door: (import.meta.env?.BASE_URL || '/') + 'assets/case001/audio/door.mp3',
  evidence: (import.meta.env?.BASE_URL || '/') + 'assets/case001/audio/evidence.mp3', notification: (import.meta.env?.BASE_URL || '/') + 'assets/case001/audio/notification.mp3', tension: (import.meta.env?.BASE_URL || '/') + 'assets/case001/audio/tension.mp3',
  success: (import.meta.env?.BASE_URL || '/') + 'assets/case001/audio/success.mp3', failure: (import.meta.env?.BASE_URL || '/') + 'assets/case001/audio/failure.mp3', transition: (import.meta.env?.BASE_URL || '/') + 'assets/case001/audio/transition.mp3',
  reveal: (import.meta.env?.BASE_URL || '/') + 'assets/case001/audio/reveal.mp3', music: (import.meta.env?.BASE_URL || '/') + 'assets/case001/audio/music-main.mp3',
};
const USE_FILES = false;
const AC = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext);
let ctx, noiseBuf, rainNode, droneNodes, prefs = { sound: true, music: true }, files = {};

function ensure() {
  if (!AC) return null;
  if (!ctx) { ctx = new AC(); const n = ctx.sampleRate * 2; noiseBuf = ctx.createBuffer(1, n, ctx.sampleRate); const d = noiseBuf.getChannelData(0); for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1; }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}
function tone(f, dur, type = 'sine', vol = 0.08, delay = 0, slideTo) {
  const c = ensure(); if (!c) return; const t = c.currentTime + delay; const o = c.createOscillator(), g = c.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t); if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + 0.05);
}
function noise(dur, freq = 800, vol = 0.05, delay = 0, type = 'lowpass') {
  const c = ensure(); if (!c) return; const t = c.currentTime + delay; const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
  s.buffer = noiseBuf; f.type = type; f.frequency.value = freq; g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(f).connect(g).connect(c.destination); s.start(t); s.stop(t + dur);
}
const CUES = {
  click: () => tone(520, 0.05, 'triangle', 0.03),
  ping: () => { tone(880, 0.25, 'sine', 0.07); tone(1320, 0.4, 'sine', 0.05, 0.08); },
  evidence: () => CUES.ping(),
  notification: () => { tone(660, 0.12, 'triangle', 0.06); tone(880, 0.18, 'triangle', 0.06, 0.12); },
  success: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.35, 'sine', 0.06, i * 0.1)),
  failure: () => tone(220, 0.45, 'sawtooth', 0.04, 0, 110),
  door: () => { noise(0.3, 220, 0.12); tone(80, 0.3, 'sine', 0.1); },
  footsteps: () => [0, 0.35, 0.7, 1.05].forEach(d => noise(0.12, 300, 0.09, d)),
  transition: () => noise(0.9, 1800, 0.05, 0, 'bandpass'),
  tension: () => { tone(55, 1.6, 'sine', 0.12); tone(58, 1.6, 'sine', 0.08); },
  reveal: () => [220, 277, 330, 415].forEach((f, i) => tone(f, 2.2, 'sine', 0.05, i * 0.12)),
};
export const audio = {
  setPrefs(p) { prefs = { ...prefs, ...p }; if (!prefs.music) this.music(null, true); if (!prefs.sound) this.ambient(null, true); },
  unlock() { ensure(); },
  sfx(name) {
    if (!prefs.sound) return;
    if (USE_FILES && AUDIO_MANIFEST[name]) { try { new Audio(AUDIO_MANIFEST[name]).play().catch(() => CUES[name]?.()); return; } catch { /* fall through */ } }
    try { CUES[name]?.(); } catch { /* audio unavailable */ }
  },
  ambient(name, force) {
    try {
      if (rainNode) { rainNode.stop(); rainNode = null; }
      if (!name || (!prefs.sound && !force)) return; const c = ensure(); if (!c) return;
      const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(); s.buffer = noiseBuf; s.loop = true;
      f.type = 'highpass'; f.frequency.value = 1400; g.gain.value = 0.035; s.connect(f).connect(g).connect(c.destination); s.start(); rainNode = s;
    } catch { /* ignore */ }
  },
  music(name, force) {
    try {
      if (droneNodes) { droneNodes.forEach(o => o.stop()); droneNodes = null; }
      if (!name || (!prefs.music && !force)) return; const c = ensure(); if (!c) return;
      const g = c.createGain(); g.gain.value = 0.03; g.connect(c.destination);
      droneNodes = [55, 82.4, 110.3].map((f, i) => { const o = c.createOscillator(); o.type = i ? 'sine' : 'triangle'; o.frequency.value = f; o.connect(g); o.start(); return o; });
    } catch { /* ignore */ }
  },
};
