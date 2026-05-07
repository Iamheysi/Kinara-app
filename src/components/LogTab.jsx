// LogTab — gym-industrial workout HUD
import { useState, useEffect } from 'react';
import { getPlanXpReward, calcSessionXp } from '../constants.js';
import { hexA } from '../utils.js';
import { Tag, CornerFrame } from './kinara-primitives.jsx';

export function LogTab({ c, activeWorkout, setActiveWorkout, plans, onStart, checkSet, updateSet, finishWorkout, allSetsDone, formatTime, todayActivity, defaultPlanId }) {
  if (!activeWorkout) {
    return <PlanSelect c={c} plans={plans} onStartPlan={onStart} defaultPlanId={defaultPlanId} todayActivity={todayActivity} />;
  }
  return <ActiveWorkout c={c} w={activeWorkout} setW={setActiveWorkout} checkSet={checkSet} updateSet={updateSet} onExit={() => setActiveWorkout(null)} finishWorkout={finishWorkout} allSetsDone={allSetsDone} formatTime={formatTime} />;
}

// ── Plan Select ──────────────────────────────────────────────────────────────

function PlanSelect({ c, plans, onStartPlan, defaultPlanId, todayActivity }) {
  const [selId, setSelId] = useState(defaultPlanId || plans[0]?.id);

  const sel = plans.find(p => p.id === selId) || plans[0];
  const totalSets = sel ? sel.exercises.reduce((a, e) => a + (e.sets || 3), 0) : 0;
  const estMin = sel ? Math.round(sel.exercises.reduce((a, e) => a + (e.rest || 60) * (e.sets || 3), 0) / 60) : 0;
  const xpReward = sel ? getPlanXpReward(sel) : 0;

  const DIFF_COLORS = { STARTER: c.success, INTERMEDIATE: c.warn, ADVANCED: c.primary, BRUTAL: c.danger };

  if (todayActivity === 'rest') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 20 }}>
        <div style={{ fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 72, color: c.textDim, letterSpacing: -3, textTransform: 'uppercase', lineHeight: 0.9 }}>REST</div>
        <div style={{ fontFamily: c.fontMono, fontSize: 11, color: c.textMute, letterSpacing: 2 }}>REST DAY SCHEDULED — RECOVER HARD</div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* Left rail — plan list */}
      <div style={{ width: 280, borderRight: `1px solid ${c.border}`, overflowY: 'auto', padding: '28px 0' }}>
        <div style={{ padding: '0 20px 16px', fontFamily: c.fontMono, fontSize: 9, color: c.textMute, letterSpacing: 2, fontWeight: 700 }}>SELECT PROTOCOL</div>
        {plans.map((pl, i) => {
          const active = selId === pl.id;
          const diffCol = DIFF_COLORS[pl.difficulty] || c.text;
          return (
            <div key={pl.id} onClick={() => setSelId(pl.id)} style={{
              padding: '14px 20px', cursor: 'pointer',
              borderLeft: `3px solid ${active ? c.primary : 'transparent'}`,
              background: active ? hexA(c.primary, 0.06) : 'transparent',
              transition: 'all .12s',
            }}>
              <div style={{ fontFamily: c.fontMono, fontSize: 9, color: active ? c.primary : c.textMute, letterSpacing: 1.5, marginBottom: 4, fontWeight: 700 }}>
                {String(i + 1).padStart(2, '0')} · {pl.code || pl.id}
              </div>
              <div style={{ fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 18, color: active ? c.text : c.textDim, letterSpacing: -0.5, textTransform: 'uppercase', lineHeight: 1 }}>
                {pl.name}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                <span style={{ fontFamily: c.fontMono, fontSize: 9, color: diffCol, letterSpacing: 1, fontWeight: 700 }}>{pl.difficulty || 'INTERMEDIATE'}</span>
                <span style={{ fontFamily: c.fontMono, fontSize: 9, color: c.textMute, letterSpacing: 1 }}>{pl.exercises.length} EX</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right panel — plan detail */}
      {sel && (
        <div style={{ flex: 1, padding: '36px 44px 40px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: 6, fontFamily: c.fontMono, fontSize: 10, color: c.primary, letterSpacing: 2, fontWeight: 700 }}>
            {sel.code || sel.id} · PROTOCOL BRIEF
          </div>
          <h2 style={{ fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 52, color: c.text, textTransform: 'uppercase', letterSpacing: -2, lineHeight: 0.9, marginBottom: 10 }}>
            {sel.name}
          </h2>
          {sel.tag && (
            <div style={{ fontFamily: c.fontMono, fontSize: 11, color: c.textDim, letterSpacing: 1, marginBottom: 20 }}>{sel.tag}</div>
          )}

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 28, padding: '18px 0', borderTop: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}`, marginBottom: 24 }}>
            {[
              { v: sel.exercises.length, l: 'EXERCISES' },
              { v: totalSets, l: 'TOTAL SETS' },
              { v: `~${estMin}m`, l: 'EST. TIME' },
              { v: `+${xpReward}`, l: 'XP REWARD', hi: true },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 32, color: s.hi ? c.primary : c.text, lineHeight: 0.9, letterSpacing: -1 }}>{s.v}</div>
                <div style={{ fontFamily: c.fontMono, fontSize: 8.5, color: c.textMute, letterSpacing: 1.5, marginTop: 4, fontWeight: 700 }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Exercise list */}
          <div style={{ flex: 1, marginBottom: 28 }}>
            {sel.exercises.map((ex, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 14, padding: '9px 0', borderBottom: `1px solid ${hexA(c.border, 0.5)}` }}>
                <span style={{ fontFamily: c.fontMono, fontSize: 9, color: c.primary, letterSpacing: 1.5, fontWeight: 700, width: 20 }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontFamily: c.fontMono, fontSize: 12, color: c.text, flex: 1, letterSpacing: 0.5 }}>{ex.name}</span>
                <span style={{ fontFamily: c.fontMono, fontSize: 10, color: c.textDim, letterSpacing: 1 }}>
                  {ex.sets || 3} × {ex.reps || '—'}
                </span>
                <span style={{ fontFamily: c.fontMono, fontSize: 9, color: c.textMute, letterSpacing: 1 }}>{ex.rest || 60}s</span>
              </div>
            ))}
          </div>

          <button onClick={() => onStartPlan(sel)} style={{
            alignSelf: 'flex-start',
            background: c.primary, color: c.primaryInk, border: 'none',
            padding: '14px 40px',
            fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 18, letterSpacing: 1,
            textTransform: 'uppercase', cursor: 'pointer',
            position: 'relative',
          }}>
            ▶ INITIATE PROTOCOL
            <CornerFrame c={c} color={c.primaryInk} sz={6} thk={1.5} />
          </button>
        </div>
      )}
    </div>
  );
}

// ── Active Workout ────────────────────────────────────────────────────────────

function ActiveWorkout({ c, w, setW, checkSet, updateSet, onExit, finishWorkout, allSetsDone, formatTime }) {
  const totalSets = w.exercises.reduce((a, e) => a + e.sets.length, 0);
  const doneSets = w.exercises.reduce((a, e) => a + e.sets.filter(s => s.done).length, 0);
  const progress = totalSets ? (doneSets / totalSets) : 0;

  const curEx = w.exercises[w.currentExIdx] || w.exercises[0];
  const curDone = curEx ? curEx.sets.filter(s => s.done).length : 0;

  const combo = w.combo || 0;
  const xp = w.xp || 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', position: 'relative' }}>
      {/* ── Top HUD bar ── */}
      <div style={{
        flexShrink: 0, borderBottom: `1px solid ${c.border}`,
        background: c.surface, padding: '0 28px',
        display: 'flex', alignItems: 'center', gap: 0, height: 52,
      }}>
        {/* Plan name */}
        <div style={{ flex: 1, fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 16, color: c.text, letterSpacing: -0.3, textTransform: 'uppercase' }}>
          {w.planName}
        </div>

        {/* Stats cluster */}
        <div style={{ display: 'flex', height: '100%', borderLeft: `1px solid ${c.border}` }}>
          {[
            { l: 'ELAPSED', v: formatTime ? formatTime(w.elapsed || 0) : '00:00:00', hi: w.paused },
            { l: 'XP', v: `+${xp}`, hi: true },
            { l: 'COMBO', v: `×${combo}`, hi: combo > 1 },
            { l: 'PROGRESS', v: `${doneSets}/${totalSets}` },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '0 22px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
              borderRight: `1px solid ${c.border}`, gap: 1,
            }}>
              <div style={{ fontFamily: c.fontMono, fontSize: 9, color: c.textMute, letterSpacing: 1.5, fontWeight: 700 }}>{s.l}</div>
              <div style={{ fontFamily: s.l === 'ELAPSED' ? c.fontMono : c.fontDisp, fontStyle: s.l !== 'ELAPSED' ? 'italic' : 'normal', fontWeight: 900, fontSize: s.l === 'ELAPSED' ? 14 : 18, color: s.hi ? c.primary : c.text, letterSpacing: s.l === 'ELAPSED' ? 1 : -0.5, lineHeight: 1 }}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 16 }}>
          <button onClick={() => setW(p => ({ ...p, paused: !p.paused }))} style={{
            background: 'transparent', border: `1px solid ${c.border}`, color: c.textDim,
            padding: '6px 12px', fontFamily: c.fontMono, fontSize: 10, letterSpacing: 1,
            cursor: 'pointer', fontWeight: 700,
          }}>{w.paused ? '▶ RESUME' : '⏸ PAUSE'}</button>
          <button onClick={onExit} style={{
            background: 'transparent', border: `1px solid ${c.border}`, color: c.textMute,
            padding: '6px 10px', fontFamily: c.fontMono, fontSize: 10, letterSpacing: 1,
            cursor: 'pointer',
          }}>✕</button>
        </div>
      </div>

      {/* ── Segment progress bar ── */}
      <div style={{ flexShrink: 0, height: 4, display: 'flex', gap: 1, background: c.bg }}>
        {w.exercises.map((ex, i) => {
          const exDone = ex.sets.filter(s => s.done).length;
          const exTotal = ex.sets.length;
          const isCur = i === w.currentExIdx;
          return (
            <div key={i} style={{ flex: 1, height: '100%', background: hexA(c.primary, 0.15), position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', inset: 0, width: exTotal ? `${(exDone / exTotal) * 100}%` : '0%',
                background: isCur ? c.primary : hexA(c.primary, 0.5),
                transition: 'width .3s',
              }} />
            </div>
          );
        })}
      </div>

      {/* ── Main area ── */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
        {/* Exercise queue — left rail */}
        <div style={{ width: 240, borderRight: `1px solid ${c.border}`, overflowY: 'auto', padding: '16px 0', flexShrink: 0 }}>
          {w.exercises.map((ex, i) => {
            const done = ex.sets.every(s => s.done);
            const active = i === w.currentExIdx && !done;
            const doneCount = ex.sets.filter(s => s.done).length;
            return (
              <div key={i} style={{
                padding: '10px 16px',
                borderLeft: `2px solid ${active ? c.primary : done ? hexA(c.success, 0.5) : 'transparent'}`,
                background: active ? hexA(c.primary, 0.05) : 'transparent',
                opacity: i > w.currentExIdx && !done ? 0.45 : 1,
              }}>
                <div style={{ fontFamily: c.fontMono, fontSize: 8.5, color: active ? c.primary : done ? c.success : c.textMute, letterSpacing: 1.5, fontWeight: 700, marginBottom: 3 }}>
                  {String(i + 1).padStart(2, '0')} {done ? '✓' : active ? '▶' : '·'}
                </div>
                <div style={{ fontFamily: c.fontMono, fontSize: 11, color: done ? c.textDim : active ? c.text : c.textDim, letterSpacing: 0.3, lineHeight: 1.3 }}>{ex.name}</div>
                <div style={{ fontFamily: c.fontMono, fontSize: 9, color: c.textMute, marginTop: 3 }}>
                  {doneCount}/{ex.sets.length} SETS
                </div>
              </div>
            );
          })}
        </div>

        {/* Main exercise display */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px 36px 40px' }}>
          {curEx && (
            <>
              {/* Exercise name */}
              <div style={{ marginBottom: 4, fontFamily: c.fontMono, fontSize: 9, color: c.primary, letterSpacing: 2, fontWeight: 700 }}>
                EX {String(w.currentExIdx + 1).padStart(2, '0')} · SET {curDone + 1} OF {curEx.sets.length}
              </div>
              <h2 style={{
                fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900,
                fontSize: Math.max(28, Math.min(52, 680 / Math.max(curEx.name.length, 1))),
                color: c.text, textTransform: 'uppercase', letterSpacing: -1.5, lineHeight: 0.9,
                marginBottom: 8,
              }}>{curEx.name}</h2>

              {curEx.instruction && (
                <div style={{ fontFamily: c.fontMono, fontSize: 11, color: c.textDim, letterSpacing: 0.5, marginBottom: 20, maxWidth: 480, lineHeight: 1.5 }}>
                  {curEx.instruction}
                </div>
              )}

              {/* Set rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 20, maxWidth: 500 }}>
                {curEx.sets.map((s, si) => (
                  <SetRow key={si} c={c} s={s} si={si} isNext={si === curDone} onCheck={() => checkSet(w.currentExIdx, si)} onUpdate={(f, v) => updateSet(w.currentExIdx, si, f, v)} />
                ))}
              </div>

              {/* Rest note */}
              <div style={{ marginTop: 20, fontFamily: c.fontMono, fontSize: 10, color: c.textMute, letterSpacing: 1.5 }}>
                REST BETWEEN SETS · {curEx.rest || 60}s
              </div>
            </>
          )}

          {/* Finish button */}
          <div style={{ marginTop: 36 }}>
            <button onClick={finishWorkout} disabled={!allSetsDone} style={{
              background: allSetsDone ? c.primary : 'transparent',
              color: allSetsDone ? c.primaryInk : c.textMute,
              border: `1px solid ${allSetsDone ? c.primary : c.border}`,
              padding: '14px 36px',
              fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 18,
              letterSpacing: 0.5, textTransform: 'uppercase', cursor: allSetsDone ? 'pointer' : 'not-allowed',
              transition: 'all .2s', position: 'relative',
            }}>
              {allSetsDone ? '✓ COMPLETE SESSION' : `${totalSets - doneSets} SETS REMAINING`}
              {allSetsDone && <CornerFrame c={c} color={c.primaryInk} sz={6} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Rest overlay ── */}
      {w.restTimer && (
        <RestOverlay
          c={c}
          rest={w.restTimer}
          nextEx={w.exercises[w.currentExIdx]}
          combo={combo}
          lastXp={w.lastXp || 0}
          onSkip={() => setW(p => ({ ...p, restTimer: null }))}
        />
      )}
    </div>
  );
}

// ── Set Row ──────────────────────────────────────────────────────────────────

function SetRow({ c, s, si, isNext, onCheck, onUpdate }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 16px',
      background: s.done ? hexA(c.success, 0.06) : isNext ? hexA(c.primary, 0.06) : c.surface,
      border: `1px solid ${s.done ? hexA(c.success, 0.25) : isNext ? hexA(c.primary, 0.3) : c.border}`,
      opacity: !isNext && !s.done ? 0.5 : 1,
      transition: 'all .15s',
    }}>
      <span style={{ fontFamily: c.fontMono, fontSize: 10, color: s.done ? c.success : isNext ? c.primary : c.textMute, fontWeight: 700, letterSpacing: 1, width: 24 }}>
        S{si + 1}
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <input type="number" value={s.reps} onChange={e => onUpdate('reps', e.target.value)} disabled={s.done}
          style={{ width: 52, background: c.bg, border: `1px solid ${c.border}`, color: c.text, padding: '5px 8px', fontFamily: c.fontMono, fontSize: 13, textAlign: 'center', fontWeight: 700, opacity: s.done ? 0.5 : 1 }} />
        <span style={{ fontFamily: c.fontMono, fontSize: 9, color: c.textMute, letterSpacing: 1 }}>REPS</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <input type="number" value={s.weight || ''} onChange={e => onUpdate('weight', e.target.value)} disabled={s.done} placeholder="—"
          style={{ width: 60, background: c.bg, border: `1px solid ${c.border}`, color: c.text, padding: '5px 8px', fontFamily: c.fontMono, fontSize: 13, textAlign: 'center', fontWeight: 700, opacity: s.done ? 0.5 : 1 }} />
        <span style={{ fontFamily: c.fontMono, fontSize: 9, color: c.textMute, letterSpacing: 1 }}>KG</span>
      </div>

      <button onClick={onCheck} disabled={s.done} style={{
        marginLeft: 'auto', width: 36, height: 36,
        background: s.done ? hexA(c.success, 0.2) : isNext ? c.primary : 'transparent',
        border: `1px solid ${s.done ? c.success : isNext ? c.primary : c.border}`,
        color: s.done ? c.success : isNext ? c.primaryInk : c.textMute,
        cursor: s.done ? 'default' : 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: c.fontMono, fontSize: 14, fontWeight: 700,
        transition: 'all .12s',
      }}>
        {s.done ? '✓' : '→'}
      </button>
    </div>
  );
}

// ── Rest Overlay ─────────────────────────────────────────────────────────────

function RestOverlay({ c, rest, nextEx, combo, lastXp, onSkip }) {
  const pct = rest.total ? (rest.remaining / rest.total) : 0;
  const urgent = rest.remaining <= 5;

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: hexA(c.bg, 0.96),
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 0,
    }}>
      <div style={{ fontFamily: c.fontMono, fontSize: 10, color: c.textMute, letterSpacing: 3, marginBottom: 20, fontWeight: 700 }}>REST INTERVAL</div>

      {/* Giant countdown */}
      <div style={{
        fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900,
        fontSize: 120, color: urgent ? c.danger : c.primary,
        lineHeight: 0.85, letterSpacing: -6,
        transition: 'color .3s',
      }}>{rest.remaining}</div>

      <div style={{ fontFamily: c.fontMono, fontSize: 11, color: c.textMute, letterSpacing: 2, marginBottom: 32, marginTop: 8 }}>SECONDS</div>

      {/* Progress bar */}
      <div style={{ width: 320, height: 3, background: hexA(c.text, 0.1), marginBottom: 32 }}>
        <div style={{ height: '100%', width: `${pct * 100}%`, background: urgent ? c.danger : c.primary, transition: 'width 1s linear, background .3s' }} />
      </div>

      {/* XP / combo earned */}
      {lastXp > 0 && (
        <div style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 28, color: c.primary, letterSpacing: -1 }}>+{lastXp}</div>
            <div style={{ fontFamily: c.fontMono, fontSize: 9, color: c.textMute, letterSpacing: 1.5, fontWeight: 700 }}>XP EARNED</div>
          </div>
          {combo > 1 && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 28, color: c.warn, letterSpacing: -1 }}>×{combo}</div>
              <div style={{ fontFamily: c.fontMono, fontSize: 9, color: c.textMute, letterSpacing: 1.5, fontWeight: 700 }}>COMBO</div>
            </div>
          )}
        </div>
      )}

      {/* Next up */}
      {nextEx && (
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontFamily: c.fontMono, fontSize: 9, color: c.textMute, letterSpacing: 2, fontWeight: 700, marginBottom: 6 }}>NEXT EXERCISE</div>
          <div style={{ fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 22, color: c.text, textTransform: 'uppercase', letterSpacing: -0.5 }}>{nextEx.name}</div>
        </div>
      )}

      <button onClick={onSkip} style={{
        background: 'transparent', border: `1px solid ${c.border}`,
        color: c.textDim, padding: '10px 28px',
        fontFamily: c.fontMono, fontSize: 10, letterSpacing: 2, fontWeight: 700,
        cursor: 'pointer', textTransform: 'uppercase',
      }}>SKIP REST →</button>
    </div>
  );
}
