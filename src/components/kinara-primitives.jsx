// Shared design primitives — gym-industrial aesthetic

import { hexA } from '../utils.js';

export function PulseBars({ c, w = 460, h = 180, seed = 1, accent }) {
  const color = accent || c.primary;
  const bars = Array.from({ length: 32 }, (_, i) => {
    const x = Math.sin((i + seed) * 0.7) * 0.5 + Math.sin((i + seed) * 0.23) * 0.3 + 0.6;
    return Math.max(0.08, Math.min(1, x));
  });
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" preserveAspectRatio="none" style={{ display: 'block' }}>
      {bars.map((v, i) => (
        <rect key={i}
          x={i * (w / 32) + 1} y={h - v * h * 0.92} width={(w / 32) - 3} height={v * h * 0.92}
          fill={i > 26 ? color : c.text} opacity={i > 26 ? 1 : 0.08 + (i / 64)} />
      ))}
    </svg>
  );
}

export function PulseLine({ c, w = 600, h = 80, accent, dense = 60 }) {
  const color = accent || c.primary;
  const pts = Array.from({ length: dense }, (_, i) => {
    const x = (i / (dense - 1)) * w;
    const y = h / 2 + Math.sin(i * 0.4) * h * 0.28 + Math.sin(i * 1.3) * h * 0.12;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" preserveAspectRatio="none" style={{ display: 'block' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function Tag({ c, children, filled, color, size = 'sm' }) {
  const bg = filled ? (color || c.primary) : 'transparent';
  const ink = filled ? (color ? c.text : c.primaryInk) : (color || c.text);
  const border = filled ? bg : (color || c.borderHi);
  const pad = size === 'lg' ? '6px 12px' : '3px 9px';
  const fs = size === 'lg' ? 12 : 10.5;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: pad, background: bg, color: ink,
      border: `1px solid ${border}`,
      fontFamily: c.fontMono, fontSize: fs, fontWeight: 700, letterSpacing: 1.3,
      textTransform: 'uppercase', borderRadius: 0, flexShrink: 0,
    }}>{children}</span>
  );
}

export function CornerFrame({ c, color, sz = 10, thk = 1.5 }) {
  const col = color || c.text;
  const corner = (t, r, b, l) => ({
    position: 'absolute', width: sz, height: sz,
    borderTop: t ? `${thk}px solid ${col}` : 'none',
    borderRight: r ? `${thk}px solid ${col}` : 'none',
    borderBottom: b ? `${thk}px solid ${col}` : 'none',
    borderLeft: l ? `${thk}px solid ${col}` : 'none',
  });
  return (<>
    <span style={{ ...corner(1, 0, 0, 1), top: 0, left: 0 }} />
    <span style={{ ...corner(1, 1, 0, 0), top: 0, right: 0 }} />
    <span style={{ ...corner(0, 0, 1, 1), bottom: 0, left: 0 }} />
    <span style={{ ...corner(0, 1, 1, 0), bottom: 0, right: 0 }} />
  </>);
}

export function RankShield({ c, lvl, size = 64, accent }) {
  const col = accent || c.primary;
  const bgCol = c.bg;
  const chev = Math.min(4, Math.ceil(lvl / 3));
  return (
    <svg viewBox="0 0 64 80" width={size} height={size * 80 / 64} style={{ display: 'block', flexShrink: 0 }}>
      <polygon points="32,2 62,18 62,58 32,78 2,58 2,18" fill={bgCol} stroke={col} strokeWidth="2" />
      <polygon points="32,8 57,22 57,54 32,72 7,54 7,22" fill="none" stroke={col} strokeWidth="0.8" opacity="0.35" />
      {Array.from({ length: chev }).map((_, i) => (
        <polyline key={i}
          points={`${18 + i * 2.5},${34 + i * 6} 32,${26 + i * 6} ${46 - i * 2.5},${34 + i * 6}`}
          fill="none" stroke={col} strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter" />
      ))}
      <text x="32" y={chev === 4 ? 18 : 21} textAnchor="middle" fill={col}
        fontFamily="'Archivo', sans-serif" fontStyle="italic" fontWeight="900" fontSize="11" letterSpacing="-0.5">
        {String(lvl).padStart(2, '0')}
      </text>
    </svg>
  );
}
