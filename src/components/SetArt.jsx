// Procedural "placeholder art": layered SVG sets so the game looks cinematic with zero image files.
// Each set returns three layers (far / mid / near) that the Backdrop moves at different speeds for parallax.
const rng = (s) => () => (s = (s * 9301 + 49297) % 233280) / 233280;
const S = (c) => <svg viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" className="art" aria-hidden="true">{c}</svg>;
const Grad = ({ id, a, b, x2 = 0, y2 = 1 }) => <linearGradient id={id} x1="0" y1="0" x2={x2} y2={y2}><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient>;
const Glow = ({ id, x, y, r, c = '#e8b64a', o = 0.5 }) => <><radialGradient id={id}><stop offset="0" stopColor={c} stopOpacity={o} /><stop offset="1" stopColor={c} stopOpacity="0" /></radialGradient><circle cx={x} cy={y} r={r} fill={`url(#${id})`} /></>;
function Skyline({ seed = 1, base = 430, minH = 60, maxH = 230, fill = '#0b0e16', lit = '#e8b64a', count = 14, opacity = 1 }) {
  const r = rng(seed); let x = -10; const out = [];
  for (let i = 0; i < count; i++) {
    const w = 30 + r() * 40, h = minH + r() * (maxH - minH); const wins = [];
    for (let j = 0; j < Math.floor(h / 18); j++) for (let k = 0; k < Math.floor(w / 12); k++) if (r() > 0.8) wins.push(<rect key={j + '-' + k} x={x + 4 + k * 12} y={base - h + 6 + j * 18} width="5" height="8" fill={lit} opacity={0.3 + r() * 0.5} />);
    out.push(<g key={i}><rect x={x} y={base - h} width={w} height={h + 400} fill={fill} />{wins}</g>); x += w + r() * 6;
  }
  return <g opacity={opacity}>{out}</g>;
}
const Clock = ({ cx, cy, r, h = 11.78, m = 47, stroke = '#c9a45c' }) => {
  const ang = (d, l) => [cx + Math.sin(d * Math.PI / 180) * l, cy - Math.cos(d * Math.PI / 180) * l];
  const [hx, hy] = ang((h % 12) * 30, r * 0.5), [mx, my] = ang(m * 6, r * 0.78);
  return <g><circle cx={cx} cy={cy} r={r} fill="#0c0906" stroke={stroke} strokeWidth="3" />{Array.from({ length: 12 }, (_, i) => { const [x1, y1] = ang(i * 30, r * 0.86), [x2, y2] = ang(i * 30, r * 0.95); return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth="2" />; })}
    <line x1={cx} y1={cy} x2={hx} y2={hy} stroke={stroke} strokeWidth="5" strokeLinecap="round" /><line x1={cx} y1={cy} x2={mx} y2={my} stroke={stroke} strokeWidth="3" strokeLinecap="round" /><circle cx={cx} cy={cy} r="4" fill={stroke} /></g>;
};
const Vig = ({ id }) => <><radialGradient id={id} cx="50%" cy="50%" r="75%"><stop offset=".55" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".85" /></radialGradient><rect width="400" height="700" fill={`url(#${id})`} /></>;

const SETS = {
  black: () => ({ far: S(<rect width="400" height="700" fill="#020204" />) }),
  city: () => ({
    far: S(<><Grad id="cf" a="#04060c" b="#1b2436" /><rect width="400" height="700" fill="url(#cf)" /><Glow id="cg" x="200" y="380" r="260" c="#3b5a86" o=".25" /><Skyline seed={3} base={470} count={16} fill="#0a0e18" opacity=".85" /></>),
    mid: S(<><Skyline seed={7} base={540} minH={90} maxH={310} count={12} fill="#05070c" lit="#ffcf6b" /><Grad id="cm" a="#080b12" b="#020204" /><rect y="540" width="400" height="200" fill="url(#cm)" /><Glow id="cm2" x="120" y="600" r="120" c="#ffcf6b" o=".18" /></>),
    near: S(<><rect y="660" width="400" height="60" fill="#020204" /><Vig id="cv" /></>) }),
  street: () => ({
    far: S(<><Grad id="sf" a="#05070d" b="#17202f" /><rect width="400" height="700" fill="url(#sf)" /><Skyline seed={11} base={430} count={14} fill="#0a0e18" opacity=".8" /></>),
    mid: S(<><rect x="150" y="190" width="260" height="500" fill="#0e0d10" /><rect x="176" y="250" width="90" height="120" fill="#2a1d0e" /><Glow id="sw" x="221" y="310" r="130" c="#ffb347" o=".45" /><rect x="176" y="250" width="90" height="120" fill="#f0b45a" opacity=".55" /><rect x="286" y="420" width="70" height="150" fill="#08070a" /><text x="200" y="228" fill="#c9a45c" fontSize="15" fontFamily="serif" letterSpacing="3">VALE &amp; SONS</text><rect x="0" y="560" width="400" height="140" fill="#07080c" /><Glow id="sl" x="70" y="520" r="90" c="#ffcf6b" o=".35" /><rect x="66" y="400" width="4" height="160" fill="#0a0a0d" /></>),
    near: S(<><ellipse cx="150" cy="660" rx="150" ry="14" fill="#1a2233" opacity=".6" /><rect y="670" width="400" height="40" fill="#020204" /><Vig id="sv" /></>) }),
  clock: () => ({
    far: S(<><Grad id="kf" a="#0b0805" b="#1c1409" /><rect width="400" height="700" fill="url(#kf)" /><Glow id="kg" x="200" y="330" r="260" c="#c9a45c" o=".3" /></>),
    mid: S(<><Clock cx="200" cy="330" r="140" /><rect x="188" y="470" width="24" height="200" fill="#2b1f10" /><circle cx="200" cy="640" r="26" fill="#9a7a35" /></>),
    near: S(<Vig id="kv" />) }),
  phone: () => ({
    far: S(<><rect width="400" height="700" fill="#040408" /><Glow id="pg" x="200" y="350" r="240" c="#4a78c8" o=".3" /></>),
    mid: S(<><rect x="120" y="150" width="160" height="330" rx="26" fill="#0a0c12" stroke="#2a3348" strokeWidth="3" /><rect x="130" y="166" width="140" height="298" rx="16" fill="#101a2c" /><Glow id="pg2" x="200" y="300" r="110" c="#6fa0ff" o=".35" /></>),
    near: S(<Vig id="pv" />) }),
  workshop: () => {
    const r = rng(5); const clocks = Array.from({ length: 12 }, (_, i) => <Clock key={i} cx={40 + (i % 4) * 100 + r() * 12} cy={90 + Math.floor(i / 4) * 92} r={22 + r() * 8} h={r() * 12} m={r() * 60} stroke="#8c6a2e" />);
    return {
      far: S(<><Grad id="wf" a="#160f08" b="#0a0705" /><rect width="400" height="700" fill="url(#wf)" /><Glow id="wg" x="200" y="200" r="300" c="#b8843a" o=".22" />{clocks}</>),
      mid: S(<><rect x="20" y="230" width="60" height="330" rx="4" fill="#100b06" stroke="#3a2a14" strokeWidth="2" /><circle cx="50" cy="270" r="18" fill="#160f08" stroke="#8c6a2e" strokeWidth="2" /><rect x="0" y="470" width="400" height="230" fill="#0b0805" /><rect x="70" y="470" width="300" height="24" fill="#2a1c0c" /><Glow id="wl" x="290" y="380" r="140" c="#ffc266" o=".4" /><ellipse cx="190" cy="600" rx="52" ry="10" fill="#1a0c0c" /></>),
      near: S(<><rect x="0" y="650" width="400" height="60" fill="#050403" /><Vig id="wv" /></>) };
  },
  office: () => ({
    far: S(<><Grad id="of" a="#0a1210" b="#050807" /><rect width="400" height="700" fill="url(#of)" /><rect x="150" y="90" width="110" height="200" fill="#0d1622" stroke="#2a3a4a" strokeWidth="3" /><Glow id="ow" x="205" y="190" r="110" c="#4a6a9a" o=".3" /></>),
    mid: S(<><rect x="20" y="130" width="90" height="360" fill="#0d0a06" stroke="#2a2010" strokeWidth="2" />{Array.from({ length: 8 }, (_, i) => <rect key={i} x="28" y={140 + i * 42} width="74" height="6" fill="#2a2010" />)}<rect x="60" y="440" width="300" height="34" fill="#150f08" /><rect x="70" y="474" width="14" height="140" fill="#100b06" /><rect x="336" y="474" width="14" height="140" fill="#100b06" /><Glow id="ol" x="300" y="400" r="130" c="#ffc266" o=".4" /></>),
    near: S(<><rect y="640" width="400" height="70" fill="#040604" /><Vig id="ov" /></>) }),
  alley: () => ({
    far: S(<><Grad id="af" a="#06080b" b="#10161f" /><rect width="400" height="700" fill="url(#af)" />{Array.from({ length: 16 }, (_, i) => <rect key={i} x="0" y={60 + i * 34} width="400" height="1.5" fill="#1a222e" opacity=".5" />)}<Glow id="ag" x="320" y="190" r="150" c="#e8b64a" o=".35" /></>),
    mid: S(<><rect x="0" y="0" width="90" height="700" fill="#07090c" /><rect x="310" y="0" width="90" height="700" fill="#07090c" /><rect x="120" y="400" width="60" height="120" fill="#0c0f14" /><rect x="220" y="440" width="50" height="90" fill="#0a0d11" /><rect x="0" y="540" width="400" height="160" fill="#080b0f" /><ellipse cx="200" cy="600" rx="120" ry="16" fill="#1c2a3d" opacity=".55" /></>),
    near: S(<><ellipse cx="90" cy="670" rx="90" ry="12" fill="#1c2a3d" opacity=".45" /><Vig id="av" /></>) }),
  hotel: () => ({
    far: S(<><Grad id="hf" a="#0d0a08" b="#1d150c" /><rect width="400" height="700" fill="url(#hf)" /><Glow id="hg1" x="200" y="110" r="220" c="#ffd27a" o=".45" /><Glow id="hg2" x="90" y="160" r="110" c="#ffd27a" o=".3" /><Glow id="hg3" x="310" y="160" r="110" c="#ffd27a" o=".3" /></>),
    mid: S(<>{[40, 150, 250, 360].map((x, i) => <rect key={i} x={x - 14} y="120" width="28" height="460" fill="#150f09" stroke="#3a2a14" strokeWidth="2" />)}<rect x="130" y="380" width="140" height="10" fill="#4a3618" /><rect x="0" y="580" width="400" height="120" fill="#0c0906" /><Glow id="hf2" x="200" y="590" r="200" c="#ffd27a" o=".16" /></>),
    near: S(<><rect y="660" width="400" height="50" fill="#050403" /><Vig id="hv" /></>) }),
  interrogation: () => ({
    far: S(<><rect width="400" height="700" fill="#060709" /><Glow id="ig" x="200" y="300" r="300" c="#8aa0c0" o=".18" />{Array.from({ length: 10 }, (_, i) => <rect key={i} x={i * 44} y="0" width="2" height="700" fill="#10141c" />)}</>),
    mid: null, near: S(<Vig id="iv" />) }),
};
export function SetArt(set) { return (SETS[set] || SETS.black)(); }
