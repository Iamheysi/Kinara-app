// HomeTab — editorial magazine dashboard

import { hexA, fmtNum, fmtTime } from '../utils.js';
import { getPlanXpReward } from '../constants.js';
import { PulseBars, Tag, CornerFrame } from './kinara-primitives.jsx';

export function HomeTab({ c, sessions, plans, schedule, streak, levelInfo, setTab, onStartPlan, totalXp }) {
  const lv = levelInfo || { lvl: 1, name: 'INITIATE', progress: 0, xpToNext: 500, next: { xpReq: 500 } };
  const todayDow = new Date().getDay();
  const today = plans.find(p => p.id === schedule[todayDow]) || plans[0];
  const recent = sessions.slice(0, 5);
  const weekSessions = sessions.slice(0, 7);

  return (
    <div style={{ padding: 0, overflowY: 'auto', height: '100%', background: c.bg }}>

      {/* HERO — editorial takeover */}
      <section style={{
        position: 'relative', padding: '32px 40px 40px',
        borderBottom: `1px solid ${c.border}`, background: c.bg, overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: c.heroGlow, pointerEvents: 'none' }} />

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, position: 'relative' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Tag c={c} filled>VOL · 04</Tag>
              <Tag c={c}>ISSUE {new Date().toISOString().slice(0, 10)}</Tag>
              <div style={{ flex: 1, height: 1, background: c.borderHi, opacity: 0.3 }} />
              <span style={{ fontFamily: c.fontMono, fontSize: 10, color: c.textDim, letterSpacing: 1.5 }}>
                DAY {streak || 0}
              </span>
            </div>

            <h1 style={{
              fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900,
              fontSize: 110, lineHeight: 0.85, letterSpacing: -4,
              color: c.text, textTransform: 'uppercase', marginTop: 12,
            }}>
              TRAIN<br />
              <span style={{ color: c.primary }}>HARD.</span><br />
              <span style={{ WebkitTextStroke: `2px ${c.text}`, color: 'transparent' }}>REST LOUD.</span>
            </h1>

            <p style={{ fontFamily: c.fontBody, fontSize: 14, color: c.textDim, marginTop: 20, maxWidth: 420, lineHeight: 1.55 }}>
              {streak > 0 ? `${streak} days on the grind.` : 'Start your streak today.'} One session stands between you and level <strong style={{ color: c.text }}>{lv.next?.name || lv.name}</strong>.
            </p>
          </div>

          {/* Motion graphic block */}
          <div style={{
            width: 320, flexShrink: 0,
            border: `1px solid ${c.borderHi}`, background: c.surface,
            position: 'relative', padding: 18,
          }}>
            <CornerFrame c={c} color={c.primary} sz={14} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontFamily: c.fontMono, fontSize: 9.5, letterSpacing: 1.5, fontWeight: 700 }}>
              <span style={{ color: c.primary }}>● WEEKLY VOLUME</span>
              <span style={{ color: c.textMute }}>LAST 12W</span>
            </div>
            <div style={{ height: 100 }}>
              <PulseBars c={c} seed={3} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', marginTop: 14, borderTop: `1px solid ${c.border}`, paddingTop: 12 }}>
              {[
                { v: fmtNum(totalXp || 0), l: 'TOTAL XP', col: c.primary },
                { v: `${streak || 0}`, l: 'STREAK', col: c.text },
                { v: `${sessions.length}`, l: 'SESSIONS', col: c.text },
              ].map((s, i) => (
                <div key={i} style={{ borderLeft: i > 0 ? `1px solid ${c.border}` : 'none', paddingLeft: i > 0 ? 12 : 0 }}>
                  <div style={{ fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 26, color: s.col, lineHeight: 0.95, letterSpacing: -0.5 }}>{s.v}</div>
                  <div style={{ fontFamily: c.fontMono, fontSize: 8, color: c.textMute, letterSpacing: 1.4, marginTop: 3, fontWeight: 700 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* XP PROGRESS STRIP */}
      <section style={{
        padding: '16px 40px', borderBottom: `1px solid ${c.border}`, background: c.surface,
        display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: 20,
      }}>
        <div>
          <div style={{ fontFamily: c.fontMono, fontSize: 9, color: c.textMute, letterSpacing: 1.5, fontWeight: 700 }}>CURRENT</div>
          <div style={{ fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 20, color: c.text, letterSpacing: -0.5 }}>
            LVL {lv.lvl} · <span style={{ color: c.primary }}>{lv.name}</span>
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: c.fontMono, fontSize: 10, color: c.textDim, marginBottom: 6, letterSpacing: 1.2 }}>
            <span>{fmtNum(totalXp || 0)} XP</span>
            <span>{fmtNum(lv.next?.xpReq || 0)} XP</span>
          </div>
          <div style={{ height: 8, background: c.card, border: `1px solid ${c.border}`, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, width: `${(lv.progress || 0) * 100}%`, background: c.primary }} />
            {[0.25, 0.5, 0.75].map(t => (
              <div key={t} style={{ position: 'absolute', left: `${t * 100}%`, top: 0, bottom: 0, width: 1, background: c.bg, opacity: 0.4 }} />
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: c.fontMono, fontSize: 9, color: c.textMute, letterSpacing: 1.5, fontWeight: 700 }}>TO NEXT</div>
          <div style={{ fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 20, color: c.text, letterSpacing: -0.5 }}>
            {fmtNum(lv.xpToNext || 0)} <span style={{ color: c.primary }}>XP</span>
          </div>
        </div>
      </section>

      {/* TODAY'S PROTOCOL */}
      {today && (
        <section style={{ padding: '36px 40px', borderBottom: `1px solid ${c.border}` }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 24 }}>
            <span style={{ fontFamily: c.fontMono, fontSize: 10, color: c.primary, letterSpacing: 2, fontWeight: 700 }}>§.01</span>
            <h2 style={{ fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 30, letterSpacing: -1, color: c.text, textTransform: 'uppercase' }}>TODAY'S PROTOCOL</h2>
            <div style={{ flex: 1, height: 1, background: c.borderHi, opacity: 0.25 }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 0, border: `1px solid ${c.borderHi}`, background: c.surface }}>
            <div style={{ padding: '32px 32px 28px', position: 'relative', borderRight: `1px solid ${c.border}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <span style={{ fontFamily: c.fontMono, fontSize: 10, color: c.primary, letterSpacing: 2, fontWeight: 700 }}>
                    PROTOCOL · {today.code || today.id}
                  </span>
                  <div style={{ fontFamily: c.fontMono, fontSize: 10, color: c.textMute, letterSpacing: 1.5, marginTop: 4 }}>{today.tag || today.notes}</div>
                </div>
                <Tag c={c} filled color={c.warn}>{today.difficulty || 'INTERMEDIATE'}</Tag>
              </div>

              <h3 style={{
                fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900,
                fontSize: 64, lineHeight: 0.9, letterSpacing: -2.5, color: c.text,
                textTransform: 'uppercase', marginTop: 18,
              }}>{today.name}</h3>

              <div style={{ display: 'flex', gap: 24, marginTop: 24, paddingTop: 20, borderTop: `1px solid ${c.border}` }}>
                {[
                  { v: today.exercises.length, l: 'EXERCISES' },
                  { v: today.exercises.reduce((a, e) => a + (e.sets || 3), 0), l: 'SETS' },
                  { v: `~${Math.round(today.exercises.reduce((a, e) => a + (e.rest || 60) * (e.sets || 3), 0) / 60)}m`, l: 'EST. TIME' },
                  { v: `+${getPlanXpReward(today)}`, l: 'XP REWARD', hi: true },
                ].map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 34, color: s.hi ? c.primary : c.text, letterSpacing: -1, lineHeight: 0.95 }}>{s.v}</div>
                    <div style={{ fontFamily: c.fontMono, fontSize: 8.5, color: c.textMute, letterSpacing: 1.4, marginTop: 3, fontWeight: 700 }}>{s.l}</div>
                  </div>
                ))}
              </div>

              <button onClick={() => onStartPlan(today)} style={{
                marginTop: 28, width: '100%',
                background: c.primary, color: c.primaryInk, border: 'none',
                padding: '18px 24px',
                fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 20, letterSpacing: 0.5,
                textTransform: 'uppercase', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
                borderRadius: 0,
              }}>
                ▶ INITIATE SESSION
                <span style={{ fontFamily: c.fontMono, fontSize: 11, letterSpacing: 2, fontStyle: 'normal', opacity: 0.6, fontWeight: 700 }}>[ENTER]</span>
              </button>
            </div>

            <div style={{ padding: '24px 28px' }}>
              <div style={{ fontFamily: c.fontMono, fontSize: 10, color: c.textMute, letterSpacing: 1.5, fontWeight: 700, marginBottom: 14 }}>· EXERCISE STACK</div>
              {today.exercises.map((ex, i) => (
                <div key={ex.id || i} style={{
                  display: 'grid', gridTemplateColumns: '28px 1fr auto', gap: 12,
                  padding: '11px 0', borderBottom: i < today.exercises.length - 1 ? `1px solid ${c.border}` : 'none',
                  alignItems: 'center',
                }}>
                  <span style={{ fontFamily: c.fontMono, fontSize: 11, color: c.textMute, letterSpacing: 1, fontWeight: 700 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontFamily: c.fontDisp, fontSize: 15, fontWeight: 700, color: c.text, letterSpacing: 0.3 }}>{ex.name}</span>
                  <span style={{ fontFamily: c.fontMono, fontSize: 10, color: c.primary, letterSpacing: 1, fontWeight: 700 }}>{ex.sets} × {ex.reps}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RECENT LOGS */}
      {recent.length > 0 && (
        <section style={{ padding: '36px 40px', borderBottom: `1px solid ${c.border}` }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 24 }}>
            <span style={{ fontFamily: c.fontMono, fontSize: 10, color: c.primary, letterSpacing: 2, fontWeight: 700 }}>§.02</span>
            <h2 style={{ fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 30, letterSpacing: -1, color: c.text, textTransform: 'uppercase' }}>RECENT LOGS</h2>
            <div style={{ flex: 1, height: 1, background: c.borderHi, opacity: 0.25 }} />
          </div>

          <div style={{ border: `1px solid ${c.borderHi}`, background: c.surface }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '46px 80px 1fr 80px 100px 70px',
              padding: '10px 20px', background: c.card, borderBottom: `1px solid ${c.border}`,
              fontFamily: c.fontMono, fontSize: 9, color: c.textMute, letterSpacing: 1.5, fontWeight: 700,
            }}>
              <span>#</span><span>DATE</span><span>PROTOCOL</span><span>TIME</span><span>VOL</span><span>XP</span>
            </div>
            {recent.map((s, i) => (
              <div key={s.id} style={{
                display: 'grid', gridTemplateColumns: '46px 80px 1fr 80px 100px 70px',
                padding: '14px 20px',
                borderBottom: i < recent.length - 1 ? `1px solid ${c.border}` : 'none',
                alignItems: 'center', fontFamily: c.fontMono, fontSize: 12, color: c.text,
              }}>
                <span style={{ color: c.textMute }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ color: c.textDim }}>{s.date.slice(5)}</span>
                <span style={{ fontFamily: c.fontDisp, fontWeight: 700, letterSpacing: 0.3, fontSize: 13 }}>{s.planName}</span>
                <span>{Math.round((s.duration || 0) / 60)}m</span>
                <span>{fmtNum(Math.round(s.totalVolume || 0))} <span style={{ color: c.textMute }}>kg</span></span>
                <span style={{ color: c.primary, fontWeight: 700 }}>+{s.xp || '—'}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* WEEK GRID */}
      <section style={{ padding: '36px 40px 60px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 24 }}>
          <span style={{ fontFamily: c.fontMono, fontSize: 10, color: c.primary, letterSpacing: 2, fontWeight: 700 }}>§.03</span>
          <h2 style={{ fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 30, letterSpacing: -1, color: c.text, textTransform: 'uppercase' }}>THIS WEEK</h2>
          <div style={{ flex: 1, height: 1, background: c.borderHi, opacity: 0.25 }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 8 }}>
          {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day, i) => {
            const s = weekSessions[i];
            const isToday = i === (new Date().getDay() + 6) % 7;
            return (
              <div key={i} style={{
                background: s ? c.card : c.surface,
                border: `1px solid ${isToday ? c.primary : c.borderHi}`,
                padding: '14px 14px 16px', position: 'relative', minHeight: 120,
              }}>
                {isToday && <CornerFrame c={c} color={c.primary} />}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontFamily: c.fontMono, fontSize: 9.5, color: isToday ? c.primary : c.textMute, letterSpacing: 1.5, fontWeight: 700 }}>{day}</span>
                </div>
                {s ? (<>
                  <div style={{ fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 28, color: c.primary, lineHeight: 0.9, letterSpacing: -1 }}>
                    {Math.round((s.duration || 0) / 60)}m
                  </div>
                  <div style={{ fontFamily: c.fontMono, fontSize: 9, color: c.textMute, letterSpacing: 1.3, fontWeight: 700, marginTop: 3 }}>DURATION</div>
                  <div style={{ marginTop: 10, paddingTop: 8, borderTop: `1px solid ${c.border}` }}>
                    <div style={{ fontFamily: c.fontDisp, fontSize: 11, fontWeight: 700, color: c.text, letterSpacing: 0.3 }}>{s.planName}</div>
                    {s.xp && <div style={{ fontFamily: c.fontMono, fontSize: 9, color: c.textDim, marginTop: 2 }}>+{s.xp} XP</div>}
                  </div>
                </>) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 80, color: c.textMute }}>
                    <svg width="28" height="28" viewBox="0 0 28 28">
                      <line x1="4" y1="4" x2="24" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.2" />
                      <line x1="24" y1="4" x2="4" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.2" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
