import { useMemo } from 'react';
const r = (n) => Array.from({ length: n }, () => Math.random());
export function Rain() {
  const drops = useMemo(() => r(70).map(a => ({ l: a * 100, h: 18 + a * 34, d: 0.45 + ((a * 7) % 1) * 0.5, de: (a * 13) % 2 })), []);
  return <div className="fx rain" aria-hidden="true">{drops.map((d, i) => <i key={i} style={{ left: d.l + '%', height: d.h, animationDuration: d.d + 's', animationDelay: '-' + d.de + 's' }} />)}</div>;
}
export function Dust() {
  const p = useMemo(() => r(26).map(a => ({ l: a * 100, t: ((a * 31) % 1) * 100, s: 1 + ((a * 7) % 1) * 2.5, d: 9 + ((a * 17) % 1) * 12 })), []);
  return <div className="fx dust" aria-hidden="true">{p.map((d, i) => <i key={i} style={{ left: d.l + '%', top: d.t + '%', width: d.s, height: d.s, animationDuration: d.d + 's' }} />)}</div>;
}
export const Fog = () => <div className="fx fog" aria-hidden="true"><i /><i /></div>;
export const Siren = () => <div className="fx siren" aria-hidden="true"><i /><i /></div>;
export const Grain = () => <div className="fx grain" aria-hidden="true" />;
export function Fx({ list = [] }) {
  return <>{list.includes('fog') && <Fog />}{list.includes('rain') && <Rain />}{list.includes('dust') && <Dust />}{list.includes('siren') && <Siren />}{list.includes('grain') && <Grain />}</>;
}
