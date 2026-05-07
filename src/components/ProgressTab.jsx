// ProgressTab — gym-industrial analytics view
import { useState } from 'react';
import { calcTrainingLoads, detectPlateaus } from '../utils.js';
import { hexA } from '../utils.js';
import { Tag } from './kinara-primitives.jsx';

export function ProgressTab({ c, t, sessions, lang }) {
  const [section, setSection] = useState('overview');
  const isRu = lang === 'ru';

  const totalVol = sessions.reduce((a, s) => a + s.totalVolume, 0);
  const avgDur = sessions.length ? Math.round(sessions.reduce((a, s) => a + s.duration, 0) / sessions.length / 60) : 0;
  const now = new Date();

  let weeksWithData = 0;
  for (let w = 0; w < 8; w++) {
    const ws = new Date(now); ws.setDate(now.getDate() - (w + 1) * 7);
    const we = new Date(now); we.setDate(now.getDate() - w * 7);
    if (sessions.some(s => new Date(s.date) >= ws && new Date(s.date) < we)) weeksWithData++;
  }
  const weeklyAvg = weeksWithData > 0
    ? (sessions.filter(s => { const sd = new Date(s.date); const ago = new Date(now); ago.setDate(now.getDate() - 56); return sd >= ago; }).length / Math.max(weeksWithData, 1)).toFixed(1)
    : '0';

  const exFreq = {}, exPRs = {}, exBestSets = {};
  sessions.forEach(s => s.exercises.forEach(ex => {
    exFreq[ex.name] = (exFreq[ex.name] || 0) + 1;
    let bestW = 0, bestReps = 8;
    ex.sets.forEach(s2 => { const w = parseFloat(s2.weight) || 0; if (w > bestW) { bestW = w; bestReps = parseInt(s2.reps) || 8; } });
    if (bestW > 0) { if (!exPRs[ex.name] || bestW > exPRs[ex.name]) { exPRs[ex.name] = bestW; exBestSets[ex.name] = bestReps; } }
  }));
  const freqList = Object.entries(exFreq).sort((a, b) => b[1] - a[1]).slice(0, 8);

  const { atl, ctl, tsb } = calcTrainingLoads(sessions);
  const plateaus = detectPlateaus(sessions);

  const wkData = Array.from({ length: 12 }, (_, i) => {
    const wS = new Date(now); wS.setDate(now.getDate() - (11 - i) * 7);
    const wE = new Date(wS); wE.setDate(wE.getDate() + 7);
    const ws = sessions.filter(s => new Date(s.date) >= wS && new Date(s.date) < wE);
    return { week: `W${i + 1}`, workouts: ws.length, volume: ws.reduce((a, s) => a + s.totalVolume, 0) };
  });
  const maxVol = Math.max(...wkData.map(w => w.volume), 1);
  const maxWk = Math.max(...wkData.map(w => w.workouts), 1);

  const SECTIONS = [
    { id: 'overview', l: isRu ? 'ОБЗОР' : 'OVERVIEW' },
    { id: 'strength', l: isRu ? 'СИЛА' : 'STRENGTH' },
    { id: 'load', l: isRu ? 'НАГРУЗКА' : 'LOAD' },
  ];

  const Empty = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 0', gap: 16 }}>
      <div style={{ fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 64, color: hexA(c.text, 0.08), letterSpacing: -3, lineHeight: 1 }}>ZERO</div>
      <div style={{ fontFamily: c.fontMono, fontSize: 11, color: c.textMute, letterSpacing: 2 }}>{isRu ? 'НЕТ ДАННЫХ — НАЧНИТЕ ТРЕНИРОВКУ' : 'NO DATA — START A SESSION'}</div>
    </div>
  );

  return (
    <div style={{ padding: '32px 40px 60px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 28 }}>
        <span style={{ fontFamily: c.fontMono, fontSize: 10, color: c.primary, letterSpacing: 2, fontWeight: 700 }}>§ ANALYTICS</span>
        <h1 style={{ fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 56, letterSpacing: -2, color: c.text, textTransform: 'uppercase', lineHeight: 0.9 }}>
          {isRu ? 'ПРОГРЕСС' : 'PROGRESS'}
        </h1>
        <div style={{ flex: 1, height: 1, background: c.borderHi, opacity: 0.25 }} />
        <span style={{ fontFamily: c.fontMono, fontSize: 10, color: c.textDim, letterSpacing: 1.5 }}>{sessions.length} {isRu ? 'СЕССИЙ' : 'SESSIONS'}</span>
      </div>

      {/* Section tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 28, borderBottom: `1px solid ${c.border}` }}>
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => setSection(s.id)} style={{
            padding: '10px 22px',
            background: 'transparent', border: 'none', borderBottom: `2px solid ${section === s.id ? c.primary : 'transparent'}`,
            fontFamily: c.fontMono, fontSize: 10, fontWeight: 700, letterSpacing: 2,
            color: section === s.id ? c.primary : c.textMute,
            cursor: 'pointer', transition: 'all .15s',
            marginBottom: -1,
          }}>{s.l}</button>
        ))}
      </div>

      {/* ── OVERVIEW ── */}
      {section === 'overview' && (sessions.length === 0 ? <Empty /> : (
        <>
          {/* Mega stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, marginBottom: 20, border: `1px solid ${c.border}` }}>
            {[
              { l: isRu ? 'ОБЪЁМ' : 'TOTAL VOLUME', v: totalVol > 1000 ? `${(totalVol / 1000).toFixed(1)}t` : `${Math.round(totalVol)}kg`, hi: true },
              { l: isRu ? 'СЕССИЙ' : 'SESSIONS', v: String(sessions.length) },
              { l: isRu ? 'СР. ВРЕМЯ' : 'AVG DURATION', v: `${avgDur}${isRu ? 'м' : 'm'}` },
              { l: isRu ? 'В НЕДЕЛЮ' : 'WEEKLY AVG', v: weeklyAvg },
            ].map((s, i) => (
              <div key={i} style={{ background: c.surface, padding: '20px 22px', borderRight: i < 3 ? `1px solid ${c.border}` : 'none' }}>
                <div style={{ fontFamily: c.fontMono, fontSize: 9, color: c.textMute, letterSpacing: 1.5, fontWeight: 700, marginBottom: 6 }}>{s.l}</div>
                <div style={{ fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 36, color: s.hi ? c.primary : c.text, letterSpacing: -1.5, lineHeight: 0.9 }}>{s.v}</div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            {[
              { title: isRu ? 'ТРЕНИРОВКИ / НЕДЕЛЯ' : 'WORKOUTS PER WEEK', key: 'workouts', max: maxWk },
              { title: isRu ? 'ОБЪЁМ / НЕДЕЛЯ' : 'VOLUME PER WEEK', key: 'volume', max: maxVol },
            ].map(chart => (
              <div key={chart.key} style={{ background: c.surface, border: `1px solid ${c.border}`, padding: '18px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ fontFamily: c.fontMono, fontSize: 9, color: c.textMute, letterSpacing: 2, fontWeight: 700 }}>{chart.title}</span>
                  <span style={{ fontFamily: c.fontMono, fontSize: 9, color: c.textMute, letterSpacing: 1 }}>{isRu ? 'ПОСЛЕДНИЕ 12 НЕД' : 'LAST 12 WEEKS'}</span>
                </div>
                <svg viewBox={`0 0 ${wkData.length * 22} 72`} width="100%" style={{ display: 'block' }}>
                  <line x1="0" y1="60" x2={wkData.length * 22} y2="60" stroke={c.border} strokeWidth="0.8" />
                  {wkData.map((w, i) => {
                    const h = chart.max > 0 ? (w[chart.key] / chart.max) * 54 : 0;
                    const x = i * 22 + 3;
                    const isLast = i === wkData.length - 1;
                    return (
                      <g key={i}>
                        <rect x={x} y={60 - h} width={16} height={h || 1} fill={isLast ? c.primary : i >= wkData.length - 4 ? hexA(c.primary, 0.45) : hexA(c.primary, 0.18)} />
                        {isLast && h > 0 && <text x={x + 8} y={60 - h - 3} textAnchor="middle" fontSize="7" fill={c.primary} fontFamily="JetBrains Mono" fontWeight="700">{w[chart.key]}</text>}
                      </g>
                    );
                  })}
                </svg>
              </div>
            ))}
          </div>

          {/* Freq + PRs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 14 }}>
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, padding: '18px 20px' }}>
              <div style={{ fontFamily: c.fontMono, fontSize: 9, color: c.textMute, letterSpacing: 2, fontWeight: 700, marginBottom: 14 }}>{isRu ? 'ТОП УПРАЖНЕНИЙ' : 'TOP EXERCISES'}</div>
              {freqList.length === 0
                ? <div style={{ fontFamily: c.fontMono, fontSize: 11, color: c.textMute }}>{isRu ? 'Нет данных' : 'No data yet'}</div>
                : freqList.map(([name, count], i) => (
                  <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <span style={{ fontFamily: c.fontMono, fontSize: 9, color: i < 3 ? c.primary : c.textMute, width: 18, fontWeight: 700 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                        <span style={{ fontFamily: c.fontMono, fontSize: 11, color: c.text }}>{name}</span>
                        <span style={{ fontFamily: c.fontMono, fontSize: 10, color: c.textDim }}>{count}×</span>
                      </div>
                      <div style={{ height: 2, background: hexA(c.text, 0.08) }}>
                        <div style={{ height: '100%', width: `${(count / freqList[0][1]) * 100}%`, background: i < 3 ? c.primary : hexA(c.primary, 0.4) }} />
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div style={{ background: c.surface, border: `1px solid ${c.border}`, padding: '18px 20px' }}>
              <div style={{ fontFamily: c.fontMono, fontSize: 9, color: c.textMute, letterSpacing: 2, fontWeight: 700, marginBottom: 14 }}>{isRu ? 'ЛИЧНЫЕ РЕКОРДЫ' : 'PERSONAL RECORDS'}</div>
              {Object.keys(exPRs).length === 0
                ? <div style={{ fontFamily: c.fontMono, fontSize: 11, color: c.textMute }}>{isRu ? 'Нет рекордов' : 'No PRs yet'}</div>
                : Object.entries(exPRs).map(([name, w]) => (
                  <div key={name} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '7px 0', borderBottom: `1px solid ${hexA(c.border, 0.6)}` }}>
                    <span style={{ fontFamily: c.fontMono, fontSize: 11, color: c.text }}>{name}</span>
                    <span style={{ fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 18, color: c.primary, letterSpacing: -0.5 }}>{w}<span style={{ fontSize: 10, fontFamily: c.fontMono }}>kg</span></span>
                  </div>
                ))}
            </div>
          </div>
        </>
      ))}

      {/* ── STRENGTH ── */}
      {section === 'strength' && (sessions.length === 0 ? <Empty /> : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, padding: '20px 22px' }}>
            <div style={{ fontFamily: c.fontMono, fontSize: 9, color: c.textMute, letterSpacing: 2, fontWeight: 700, marginBottom: 4 }}>
              {isRu ? 'РАСЧ. 1ПМ' : 'ESTIMATED 1RM'}
            </div>
            <div style={{ fontFamily: c.fontMono, fontSize: 10, color: c.textMute, letterSpacing: 1, marginBottom: 16 }}>
              {isRu ? 'По лучшему подходу' : 'Based on heaviest logged set'}
            </div>
            {Object.keys(exPRs).length === 0
              ? <div style={{ fontFamily: c.fontMono, fontSize: 11, color: c.textMute }}>{isRu ? 'Запишите тренировки с весами' : 'Log weighted workouts to see estimates'}</div>
              : Object.entries(exPRs).map(([name, maxW]) => {
                const reps = exBestSets[name] || 8;
                const oneRm = reps <= 1 ? maxW : Math.round(maxW * 36 / (37 - reps));
                return (
                  <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '9px 0', borderBottom: `1px solid ${hexA(c.border, 0.6)}` }}>
                    <span style={{ fontFamily: c.fontMono, fontSize: 11, color: c.text }}>{name}</span>
                    <span style={{ fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 22, color: c.primary, letterSpacing: -0.5 }}>{oneRm}<span style={{ fontSize: 10, fontFamily: c.fontMono }}>kg</span></span>
                  </div>
                );
              })}
          </div>

          <div style={{ background: c.surface, border: `1px solid ${c.border}`, padding: '20px 22px' }}>
            <div style={{ fontFamily: c.fontMono, fontSize: 9, color: c.textMute, letterSpacing: 2, fontWeight: 700, marginBottom: 4 }}>
              {isRu ? 'ДЕТЕКТОР ПЛАТО' : 'PLATEAU DETECTOR'}
            </div>
            <div style={{ fontFamily: c.fontMono, fontSize: 10, color: c.textMute, letterSpacing: 1, marginBottom: 16 }}>
              {isRu ? 'Последние 21 день vs предыдущие 21' : 'Last 21 days vs previous 21'}
            </div>
            {Object.keys(plateaus).length === 0
              ? <div style={{ fontFamily: c.fontMono, fontSize: 11, color: c.textMute }}>{isRu ? 'Нужно больше данных' : 'Need more data'}</div>
              : Object.entries(plateaus).map(([name, p]) => (
                <div key={name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0', borderBottom: `1px solid ${hexA(c.border, 0.6)}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 6, height: 6, background: p.ok ? c.success : c.danger }} />
                    <span style={{ fontFamily: c.fontMono, fontSize: 11, color: c.text }}>{name}</span>
                  </div>
                  <span style={{ fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 18, color: p.ok ? c.success : c.danger, letterSpacing: -0.3 }}>
                    {p.ok ? (p.change !== null ? `+${p.change}%` : (isRu ? 'NEW' : 'NEW')) : (p.change !== null ? `${p.change}%` : (isRu ? 'ПЛАТО' : 'PLATEAU'))}
                  </span>
                </div>
              ))}
          </div>
        </div>
      ))}

      {/* ── LOAD ── */}
      {section === 'load' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, marginBottom: 14, border: `1px solid ${c.border}` }}>
            {[
              { l: `ATL · ${isRu ? 'ОСТРАЯ' : 'ACUTE LOAD'}`, v: sessions.length ? atl.toFixed(1) : '—', sub: isRu ? 'Усталость (7 дней)' : '7-day fatigue index', col: c.danger },
              { l: `CTL · ${isRu ? 'ХРОНИЧЕСКАЯ' : 'CHRONIC LOAD'}`, v: sessions.length ? ctl.toFixed(1) : '—', sub: isRu ? 'Фитнес-база (42 дня)' : '42-day fitness base', col: c.primary },
              { l: `TSB · ${isRu ? 'ФОРМА' : 'FORM'}`, v: sessions.length ? (tsb > 0 ? `+${tsb.toFixed(1)}` : tsb.toFixed(1)) : '—', sub: tsb > 5 ? (isRu ? 'Восстановлен ✓' : 'Recovered ✓') : tsb < -10 ? (isRu ? 'Утомлён ⚠' : 'Fatigued ⚠') : (isRu ? 'Нейтрально' : 'Neutral'), col: tsb > 5 ? c.success : tsb < -10 ? c.danger : c.warn },
            ].map((item, i) => (
              <div key={i} style={{ background: c.surface, padding: '20px 22px', borderRight: i < 2 ? `1px solid ${c.border}` : 'none' }}>
                <div style={{ fontFamily: c.fontMono, fontSize: 9, color: c.textMute, letterSpacing: 1.5, fontWeight: 700, marginBottom: 6 }}>{item.l}</div>
                <div style={{ fontFamily: c.fontDisp, fontStyle: 'italic', fontWeight: 900, fontSize: 40, color: item.col, letterSpacing: -2, lineHeight: 0.9, marginBottom: 6 }}>{item.v}</div>
                <div style={{ fontFamily: c.fontMono, fontSize: 10, color: c.textDim, letterSpacing: 1 }}>{item.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ background: c.surface, border: `1px solid ${c.border}`, padding: '20px 22px' }}>
            <div style={{ fontFamily: c.fontMono, fontSize: 9, color: c.textMute, letterSpacing: 2, fontWeight: 700, marginBottom: 4 }}>
              {isRu ? 'РЕКОМЕНДАЦИЯ ПО РАЗГРУЗКЕ' : 'DELOAD RECOMMENDATION'}
            </div>
            <div style={{ fontFamily: c.fontMono, fontSize: 10, color: c.textMute, letterSpacing: 1, marginBottom: 14 }}>
              {isRu ? 'Модель Банистера' : 'Banister Impulse-Response model'}
            </div>
            <div style={{ padding: '14px 16px', borderLeft: `3px solid ${tsb < -15 ? c.danger : tsb > 20 ? c.success : c.primary}`, background: hexA(tsb < -15 ? c.danger : tsb > 20 ? c.success : c.primary, 0.05) }}>
              <p style={{ fontFamily: c.fontMono, fontSize: 11, color: c.textDim, lineHeight: 1.7, letterSpacing: 0.5 }}>
                {sessions.length < 6
                  ? (isRu ? 'Запишите не менее 6 тренировок для персональной рекомендации.' : 'Log at least 6 workouts to receive a personalised recommendation.')
                  : tsb < -15
                    ? (isRu ? '⚠ Высокая усталость. Снизьте объём на 40–50%.' : '⚠ High fatigue detected. Reduce volume 40–50%, intensity 10–20%.')
                    : tsb > 20
                      ? (isRu ? '✓ Хорошо восстановлены. Отличная неделя для рекордов.' : '✓ Well recovered. Great week to push for new PRs.')
                      : (isRu ? 'Хорошее тренировочное окно. Продолжайте программу.' : 'Good training window. Continue your current programme.')}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
