// Header — 44px top bar (gym-industrial)

import { fmtNum } from '../utils.js';

export function Header({ c, theme, tab, running, elapsed, formatTime, streak, weeklyRank }) {
  const now = new Date();
  const week = Math.ceil(((now - new Date(now.getFullYear(), 0, 1)) / 86400000 + 1) / 7);
  const sessionCount = 1; // incremented from real session count in parent

  return (
    <div style={{
      height: 44, flexShrink: 0,
      borderBottom: `1px solid ${c.border}`,
      background: c.surface,
      display: 'flex', alignItems: 'center',
      fontFamily: c.fontMono, fontSize: 10.5, letterSpacing: 1.3,
    }}>
      <div style={{ padding: '0 18px', height: '100%', display: 'flex', alignItems: 'center', gap: 10, borderRight: `1px solid ${c.border}` }}>
        <span style={{ width: 8, height: 8, background: c.primary, display: 'inline-block' }} />
        <span style={{ color: c.text, fontWeight: 700, letterSpacing: 2 }}>
          KINARA<span style={{ color: c.textMute }}> · {(theme || 'COBALT').toUpperCase()}</span>
        </span>
      </div>
      <div style={{ padding: '0 18px', height: '100%', display: 'flex', alignItems: 'center', gap: 22, flex: 1, color: c.textDim }}>
        <span>WK <span style={{ color: c.text, fontWeight: 700 }}>{String(week).padStart(2, '0')}</span></span>
        <span>·</span>
        <span>STREAK <span style={{ color: c.text, fontWeight: 700 }}>{streak || 0}</span></span>
        {running && (<>
          <span>·</span>
          <span style={{ color: c.success, fontWeight: 700, animation: 'pulse 1.4s infinite' }}>
            ● {formatTime ? formatTime(elapsed || 0) : '00:00:00'}
          </span>
        </>)}
        <span>·</span>
        <span>TAB <span style={{ color: c.text, fontWeight: 700, textTransform: 'uppercase' }}>{tab}</span></span>
      </div>
      <div style={{ padding: '0 18px', height: '100%', display: 'flex', alignItems: 'center', gap: 14, borderLeft: `1px solid ${c.border}` }}>
        {weeklyRank && <span style={{ color: c.primary, fontWeight: 700 }}>RANK #{weeklyRank}</span>}
        <span style={{ color: running ? c.success : c.textMute }}>● {running ? 'LIVE' : 'READY'}</span>
      </div>
    </div>
  );
}
