// Sidebar — 88px gym-industrial left nav

import { THEME_ORDER, THEMES } from '../constants.js';
import { hexA } from '../utils.js';

const NAV_ITEMS = [
  { id: 'home',     label: 'HOME',  glyph: '◼' },
  { id: 'plans',    label: 'PLANS', glyph: '▤' },
  { id: 'log',      label: 'TRAIN', glyph: '▶' },
  { id: 'progress', label: 'STATS', glyph: '▲' },
  { id: 'calendar', label: 'CAL',   glyph: '◫' },
  { id: 'profile',  label: 'ME',    glyph: '◉' },
];

export function Sidebar({ tab, setTab, c, theme, setTheme, running, levelInfo }) {
  const lv = levelInfo || { lvl: 1, name: 'INITIATE', progress: 0 };

  return (
    <aside className="kb-sidebar" style={{
      width: 88, background: c.bg,
      borderRight: `1px solid ${c.border}`,
      display: 'flex', flexDirection: 'column', alignItems: 'stretch', flexShrink: 0,
      zIndex: 10,
    }}>
      {/* Logo */}
      <div style={{
        padding: '18px 0', borderBottom: `1px solid ${c.border}`,
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-block', width: 44, height: 44,
          background: c.primary, color: c.primaryInk,
          fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 24,
          letterSpacing: -0.5, lineHeight: '44px',
          transform: 'skewX(-8deg)',
        }}>K</div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 0', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV_ITEMS.map(it => {
          const active = tab === it.id;
          const isRunning = it.id === 'log' && running;
          return (
            <div key={it.id} onClick={() => setTab(it.id)} style={{
              padding: '12px 0', textAlign: 'center', cursor: 'pointer',
              borderLeft: `3px solid ${active ? c.primary : 'transparent'}`,
              background: active ? hexA(c.primary, 0.06) : 'transparent',
              transition: 'all .15s', position: 'relative',
            }}>
              {isRunning && (
                <span style={{
                  position: 'absolute', top: 8, right: 10,
                  width: 7, height: 7, background: c.success,
                  borderRadius: '50%', animation: 'pulse 1.4s infinite',
                }} />
              )}
              <div style={{
                fontSize: 13, color: active ? c.primary : c.textDim, marginBottom: 4,
                fontFamily: c.fontMono,
              }}>{it.glyph}</div>
              <div style={{
                fontFamily: c.fontMono, fontSize: 8.5, fontWeight: 700, letterSpacing: 1.4,
                color: active ? c.text : c.textMute,
              }}>{it.label}</div>
            </div>
          );
        })}
      </nav>

      {/* Gamma swatches */}
      <div style={{
        padding: '10px 8px', borderTop: `1px solid ${c.border}`,
        display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center',
      }}>
        <div style={{ fontFamily: c.fontMono, fontSize: 7.5, letterSpacing: 1.3, color: c.textMute, fontWeight: 700, marginBottom: 2 }}>THEME</div>
        <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
          {THEME_ORDER.map(id => {
            const t = THEMES[id];
            const active = theme === id;
            return (
              <button key={id} onClick={() => setTheme(id)} title={t.name} style={{
                width: active ? 14 : 11, height: active ? 14 : 11,
                background: t.primary, border: `${active ? 2 : 1}px solid ${active ? c.text : 'transparent'}`,
                borderRadius: 0, cursor: 'pointer', padding: 0,
                transition: 'all .15s',
              }} />
            );
          })}
        </div>
      </div>

      {/* Level badge */}
      <div style={{
        padding: '12px 8px 14px', borderTop: `1px solid ${c.border}`, textAlign: 'center',
      }}>
        <div style={{
          fontFamily: c.fontMono, fontSize: 7.5, letterSpacing: 1.5, color: c.textMute,
          fontWeight: 700, marginBottom: 3,
        }}>LVL</div>
        <div style={{
          fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 32,
          color: c.primary, lineHeight: 1, letterSpacing: -1.5,
        }}>{String(lv.lvl).padStart(2, '0')}</div>
        <div style={{
          fontFamily: c.fontMono, fontSize: 7, letterSpacing: 1.2, color: c.text,
          fontWeight: 700, marginTop: 3,
        }}>{lv.name}</div>
        <div style={{ height: 2, background: hexA(c.text, 0.1), marginTop: 6, position: 'relative' }}>
          <div style={{
            position: 'absolute', inset: 0, width: `${(lv.progress || 0) * 100}%`,
            background: c.primary, transition: 'width 1s ease',
          }} />
        </div>
      </div>
    </aside>
  );
}
