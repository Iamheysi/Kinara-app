// PlansTab — protocol library

import { getPlanXpReward } from '../constants.js';
import { hexA } from '../utils.js';
import { Tag, CornerFrame } from './kinara-primitives.jsx';

const DIFF_COLORS = (c) => ({
  STARTER: c.success, INTERMEDIATE: c.warn, ADVANCED: c.primary, BRUTAL: c.danger,
});

export function PlansTab({ c, plans, onStart }) {
  const diffColors = DIFF_COLORS(c);

  return (
    <div style={{ padding: '32px 40px 60px', overflowY: 'auto', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 28 }}>
        <span style={{ fontFamily: c.fontMono, fontSize: 10, color: c.primary, letterSpacing: 2, fontWeight: 700 }}>§ LIBRARY</span>
        <h1 style={{ fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 64, letterSpacing: -2.5, color: c.text, textTransform: 'uppercase', lineHeight: 0.9 }}>PROTOCOLS</h1>
        <div style={{ flex: 1, height: 1, background: c.borderHi, opacity: 0.25 }} />
        <span style={{ fontFamily: c.fontMono, fontSize: 10, color: c.textDim, letterSpacing: 1.5 }}>{plans.length} AVAILABLE</span>
      </div>

      <div className="kb-plans-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
        {plans.map((pl, idx) => {
          const diffCol = diffColors[pl.difficulty] || c.text;
          const xpReward = getPlanXpReward(pl);
          const totalSets = pl.exercises.reduce((a, e) => a + (e.sets || 3), 0);
          const estMin = Math.round(pl.exercises.reduce((a, e) => a + (e.rest || 60) * (e.sets || 3), 0) / 60);

          return (
            <div key={pl.id} style={{
              background: c.surface, border: `1px solid ${c.borderHi}`,
              position: 'relative', padding: '24px 26px 22px',
              display: 'grid', gridTemplateColumns: '1fr auto', gap: 20,
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ fontFamily: c.fontMono, fontSize: 10, color: c.primary, letterSpacing: 2, fontWeight: 700 }}>
                    {String(idx + 1).padStart(2, '0')} · {pl.code || pl.id}
                  </span>
                  <Tag c={c} color={diffCol}>{pl.difficulty || 'INTERMEDIATE'}</Tag>
                </div>
                <h3 style={{
                  fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 38,
                  letterSpacing: -1.2, color: c.text, textTransform: 'uppercase', lineHeight: 0.9,
                }}>{pl.name}</h3>
                <div style={{ fontFamily: c.fontMono, fontSize: 11, color: c.textDim, letterSpacing: 1, marginTop: 8 }}>
                  {pl.tag || pl.notes}
                </div>

                <div style={{ display: 'flex', gap: 22, marginTop: 20, paddingTop: 16, borderTop: `1px solid ${c.border}` }}>
                  {[
                    { v: pl.exercises.length, l: 'EX' },
                    { v: totalSets, l: 'SETS' },
                    { v: `~${estMin}m`, l: 'TIME' },
                    { v: `+${xpReward}`, l: 'XP', hi: true },
                  ].map((s, i) => (
                    <div key={i}>
                      <div style={{ fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 24, color: s.hi ? c.primary : c.text, lineHeight: 0.95, letterSpacing: -0.5 }}>{s.v}</div>
                      <div style={{ fontFamily: c.fontMono, fontSize: 8.5, color: c.textMute, letterSpacing: 1.3, marginTop: 2, fontWeight: 700 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
                <div style={{ width: 72, height: 72, background: c.bg, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <span style={{ fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 40, color: c.primary, letterSpacing: -1 }}>
                    {(pl.code || pl.name)[0]}
                  </span>
                  <CornerFrame c={c} color={c.borderHi} sz={8} />
                </div>
                <button onClick={() => onStart(pl)} style={{
                  background: c.primary, color: c.primaryInk, border: 'none',
                  padding: '10px 16px',
                  fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 14, letterSpacing: 0.5,
                  textTransform: 'uppercase', cursor: 'pointer',
                }}>▶ START</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
