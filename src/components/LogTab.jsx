import { useState, useEffect } from 'react';
import { Ic } from '../icons.jsx';
import { MUSCLE_GROUP_COLORS, MUSCLE_GROUP_EMOJI } from '../constants.js';

export function LogTab({c,t,activeWorkout,setActiveWorkout,plans,onStart,checkSet,updateSet,finishWorkout,allSetsDone,formatTime,fmtMin,todayActivity,defaultPlanId,theme}){
  const [selPlanId,setSelPlanId]=useState(defaultPlanId||plans[0]?.id);
  useEffect(()=>{if(defaultPlanId)setSelPlanId(defaultPlanId);},[defaultPlanId]);

  if(!activeWorkout){
    if(todayActivity==="rest")return(<div style={{maxWidth:460,margin:"60px auto",textAlign:"center"}}><div style={{fontSize:48,marginBottom:16}}>🌙</div><p style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:30,fontWeight:900,color:c.textPrimary,marginBottom:8}}>{t.restBlockedMsg}</p><p style={{fontSize:14,color:c.textSecondary}}>{t.restBlockedSub}</p></div>);
    return(<div style={{maxWidth:500,margin:"56px auto",textAlign:"center"}}><p style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:34,fontWeight:900,color:c.textPrimary,marginBottom:6}}>{t.logWorkout}</p><p style={{fontSize:13,color:c.textSecondary,marginBottom:24}}>{t.selectPlan}</p><div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:20}}>{plans.map(p=>(<div key={p.id} onClick={()=>setSelPlanId(p.id)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:c.card,border:`1.5px solid ${selPlanId===p.id?c.primary:c.border}`,borderRadius:12,padding:"13px 16px",cursor:"pointer",transition:"all 0.15s",boxShadow:selPlanId===p.id?`0 0 0 3px ${c.primary}22`:"none"}}><div><p style={{fontSize:14,fontWeight:600,color:c.textPrimary}}>{p.name}</p><p style={{fontSize:11.5,color:c.textSecondary}}>{p.exercises.length} {t.exercises}</p></div><div style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${selPlanId===p.id?c.primary:c.border}`,background:selPlanId===p.id?c.primary:"transparent",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",flexShrink:0,transition:"all 0.15s"}}>{selPlanId===p.id&&Ic.check}</div></div>))}</div><button onClick={()=>{const p=plans.find(x=>x.id===selPlanId);if(p)onStart(p);}} style={{background:c.primary,color:"#fff",border:"none",borderRadius:12,padding:"13px 42px",fontSize:15,fontWeight:900,fontFamily:"'Barlow Condensed',sans-serif",cursor:"pointer",boxShadow:`0 4px 16px ${c.primary}44`}}>▶ {t.startWorkout}</button></div>);
  }

  const w=activeWorkout;
  const isDark=theme==="dark";
  const mgColors=MUSCLE_GROUP_COLORS[isDark?"dark":"light"];
  const totalSets=w.exercises.reduce((a,e)=>a+e.sets.length,0);
  const doneSets=w.exercises.reduce((a,e)=>a+e.sets.filter(s=>s.done).length,0);
  const progress=(doneSets/totalSets)*100;
  const togglePause=()=>setActiveWorkout(p=>({...p,paused:!p.paused}));
  const warmupProgress=Math.min(100,(w.elapsed/w.warmup.target)*100);
  const warmupDone=w.elapsed>=w.warmup.target;

  // Group exercises by muscleGroup
  const grouped=[];
  const groupMap={};
  w.exercises.forEach((ex,exIdx)=>{
    const g=ex.muscleGroup||'general';
    if(!groupMap[g]){groupMap[g]={group:g,exercises:[]};grouped.push(groupMap[g]);}
    groupMap[g].exercises.push({...ex,_exIdx:exIdx});
  });

  const getGroupColor=(group)=>mgColors[group]||mgColors.general;
  const getGroupEmoji=(group)=>MUSCLE_GROUP_EMOJI[group]||'🏋️';

  return(<div style={{maxWidth:720,margin:"0 auto"}}>
    {/* ── Top Header ── */}
    <div style={{background:c.card,border:`1px solid ${c.border}`,borderRadius:16,padding:"16px 20px",marginBottom:16}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
        <div>
          <p style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,fontWeight:700,color:c.primary,letterSpacing:2.5,textTransform:"uppercase",marginBottom:2}}>{w.planName}</p>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <span style={{fontSize:10,color:c.textMuted}}>⏱</span>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:16,fontWeight:500,color:w.paused?c.gold:c.textPrimary,letterSpacing:1}}>{formatTime(w.elapsed)}</span>
          </div>
          <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:c.textSecondary}}>{doneSets}/{totalSets} {t.setsLabel}</span>
        </div>
      </div>
      <div style={{height:5,background:c.border,borderRadius:3,marginBottom:10}}>
        <div style={{height:"100%",width:`${progress}%`,background:doneSets===totalSets?c.success:c.primary,borderRadius:3,transition:"width 0.4s"}}/>
      </div>
      <div style={{display:"flex",gap:7}}>
        <button onClick={togglePause} style={{background:w.paused?c.primaryDim:"transparent",color:w.paused?c.primary:c.textSecondary,border:`1px solid ${w.paused?c.primary+"55":c.border}`,borderRadius:8,padding:"6px 14px",fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:5}}>{w.paused?<>{Ic.play} {t.resume}</>:<>{Ic.pause} {t.pause}</>}</button>
        <button onClick={()=>setActiveWorkout(null)} style={{background:"none",border:`1px solid ${c.border}`,color:c.textSecondary,borderRadius:8,padding:"6px 11px",fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>✕ {t.cancelWorkout}</button>
      </div>
    </div>

    {/* ── Warm-up Section ── */}
    {w.warmup.enabled&&!w.warmup.done&&(()=>{
      const wuColor=getGroupColor('warm-up');
      return(
      <div style={{marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
          <span style={{fontSize:13}}>{getGroupEmoji('warm-up')}</span>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,fontWeight:800,color:wuColor.accent,letterSpacing:2,textTransform:"uppercase"}}>{t.warmup}</span>
          <div style={{flex:1,height:1,background:wuColor.border}}/>
        </div>
        <div style={{background:c.card,border:`1.5px solid ${wuColor.border}`,borderLeft:`4px solid ${wuColor.accent}`,borderRadius:"0 14px 14px 0",padding:"14px 18px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:13,fontWeight:600,color:warmupDone?c.success:c.textPrimary}}>{t.warmup}</span>
              {warmupDone&&<span style={{fontSize:9,background:c.successDim,color:c.success,padding:"2px 7px",borderRadius:20,fontWeight:700}}>TARGET REACHED</span>}
            </div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:14,color:warmupDone?c.success:wuColor.accent,fontWeight:600}}>{fmtMin(w.elapsed)}</span>
              <span style={{fontSize:11,color:c.textMuted}}>/</span>
              <div style={{display:"flex",alignItems:"center",gap:4}}>
                <input type="number" min="1" max="60" value={Math.max(1,Math.round(w.warmup.target/60))} onChange={e=>setActiveWorkout(p=>({...p,warmup:{...p.warmup,target:Math.max(60,(parseInt(e.target.value)||1)*60)}}))} style={{width:36,background:c.inputBg,border:`1px solid ${c.borderMid}`,borderRadius:6,padding:"3px 5px",color:c.textPrimary,fontSize:12,fontFamily:"'JetBrains Mono',monospace",textAlign:"center"}}/>
                <span style={{fontSize:11,color:c.textMuted}}>min</span>
              </div>
              <button onClick={()=>setActiveWorkout(p=>({...p,warmup:{...p.warmup,done:true}}))} style={{background:warmupDone?c.success:wuColor.accent,color:"#fff",border:"none",borderRadius:7,padding:"5px 13px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:5}}>{Ic.check} Done</button>
            </div>
          </div>
          <div style={{height:4,background:c.border,borderRadius:2}}><div style={{height:"100%",width:`${warmupProgress}%`,background:warmupDone?c.success:wuColor.accent,borderRadius:2,transition:"width 1s linear"}}/></div>
        </div>
      </div>);
    })()}

    {/* ── Muscle Group Sections ── */}
    {grouped.map(({group,exercises:groupExs})=>{
      const gc=getGroupColor(group);
      const emoji=getGroupEmoji(group);
      return(
        <div key={group} style={{marginBottom:20}}>
          {/* Section Header */}
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            <span style={{fontSize:13}}>{emoji}</span>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,fontWeight:800,color:gc.accent,letterSpacing:2,textTransform:"uppercase"}}>{group}</span>
            <div style={{flex:1,height:1,background:gc.border}}/>
          </div>

          {/* Exercise Cards */}
          {groupExs.map(ex=>{
            const exIdx=ex._exIdx;
            const allExDone=ex.sets.every(s=>s.done);
            const doneCount=ex.sets.filter(s=>s.done).length;
            const isActive=exIdx===w.currentExIdx&&!allExDone;
            const isResting=w.restTimer&&w.restTimer.exIdx===exIdx;
            const isUpcoming=exIdx>w.currentExIdx&&!allExDone;

            return(
              <div key={ex.id||exIdx} style={{
                background:isActive?gc.dim:allExDone?c.successDim:c.card,
                border:`1.5px solid ${isActive?gc.border:allExDone?c.success+"55":c.border}`,
                borderLeft:`4px solid ${isActive?gc.accent:allExDone?c.success:c.border}`,
                borderRadius:"0 14px 14px 0",
                padding:allExDone?"12px 16px":"16px 18px",
                marginBottom:8,
                transition:"all 0.2s",
                opacity:isUpcoming?0.5:1,
              }}>
                {/* Exercise Header */}
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:allExDone?0:8}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,flex:1,minWidth:0}}>
                    <span style={{
                      fontFamily:"'Barlow Condensed',sans-serif",fontSize:17,fontWeight:700,
                      color:isActive?gc.accent:allExDone?c.success:c.textSecondary,
                      textDecoration:allExDone?"line-through":"none",
                    }}>{ex.name}</span>
                    {isActive&&<span style={{fontSize:9,background:gc.dim,color:gc.accent,padding:"2px 8px",borderRadius:20,fontWeight:800,letterSpacing:1,border:`1px solid ${gc.border}`}}>ACTIVE</span>}
                    {allExDone&&<span style={{fontSize:9,background:c.successDim,color:c.success,padding:"2px 8px",borderRadius:20,fontWeight:800}}>DONE ✓</span>}
                  </div>
                  <span style={{fontSize:11,color:c.textMuted,fontFamily:"'JetBrains Mono',monospace",flexShrink:0}}>{doneCount}/{ex.sets.length}</span>
                </div>

                {/* Instruction (active only) */}
                {isActive&&ex.instruction&&(
                  <p style={{fontSize:12.5,color:c.textSecondary,lineHeight:1.6,margin:"0 0 12px",padding:"8px 12px",background:c.bg,borderRadius:8,borderLeft:`3px solid ${gc.accent}44`}}>{ex.instruction}</p>
                )}

                {/* Segmented Progress Bar */}
                {!allExDone&&(isActive||isUpcoming)&&(
                  <div style={{display:"flex",gap:3,marginBottom:isActive?10:6}}>
                    {ex.sets.map((s,si)=>(
                      <div key={si} style={{flex:1,height:4,borderRadius:2,background:s.done?gc.accent:`${gc.accent}22`,transition:"background 0.3s"}}/>
                    ))}
                  </div>
                )}

                {/* Set counter */}
                {isActive&&!allExDone&&(
                  <p style={{fontSize:11,color:gc.accent,fontWeight:600,marginBottom:8,fontFamily:"'JetBrains Mono',monospace"}}>
                    {t.setOfLabel} {doneCount+1} {t.ofLabel} {ex.sets.length}
                  </p>
                )}

                {/* Set Inputs (active only) */}
                {isActive&&!allExDone&&(
                  <div style={{display:"flex",flexDirection:"column",gap:7}}>
                    {ex.sets.map((s,si)=>(
                      <div key={si} style={{display:"flex",alignItems:"center",gap:8}}>
                        <span style={{fontSize:10,color:s.done?c.success:gc.accent,width:22,textAlign:"right",flexShrink:0,fontWeight:600,fontFamily:"'JetBrains Mono',monospace"}}>S{si+1}</span>
                        <input type="number" value={s.reps} onChange={e=>updateSet(exIdx,si,"reps",e.target.value)} disabled={s.done} style={{width:50,background:s.done?c.border:c.inputBg,border:`1px solid ${s.done?c.border:c.borderMid}`,borderRadius:6,padding:"6px 7px",color:c.textPrimary,fontSize:12,textAlign:"center",fontFamily:"'JetBrains Mono',monospace",opacity:s.done?0.4:1}}/>
                        <span style={{fontSize:10,color:c.textMuted}}>{t.repsLabel}</span>
                        <input type="number" value={s.weight} onChange={e=>updateSet(exIdx,si,"weight",e.target.value)} disabled={s.done} placeholder="0" style={{width:56,background:s.done?c.border:c.inputBg,border:`1px solid ${s.done?c.border:c.borderMid}`,borderRadius:6,padding:"6px 7px",color:c.textPrimary,fontSize:12,textAlign:"center",fontFamily:"'JetBrains Mono',monospace",opacity:s.done?0.4:1}}/>
                        <span style={{fontSize:10,color:c.textMuted}}>{t.kgLabel}</span>
                        <button type="button" onClick={()=>checkSet(exIdx,si)} disabled={s.done} style={{width:32,height:32,borderRadius:8,border:`2px solid ${s.done?c.success:gc.accent}`,background:s.done?c.success:gc.dim,cursor:s.done?"default":"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:s.done?"#fff":gc.accent,transition:"all 0.15s",flexShrink:0,padding:0}}>{s.done&&Ic.check}</button>
                      </div>
                    ))}

                    {/* Inline Rest Timer */}
                    {isResting&&(
                      <div style={{marginTop:8,background:c.bg,borderRadius:12,padding:"16px 18px",border:`1.5px solid ${gc.border}`,animation:"restPulse 2s infinite"}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                          <span style={{fontSize:11,color:gc.accent,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase"}}>{t.restLabel}{w.paused?" (paused)":""}</span>
                          <button onClick={()=>setActiveWorkout(p=>({...p,restTimer:null}))} style={{background:gc.dim,border:`1px solid ${gc.border}`,color:gc.accent,borderRadius:8,padding:"5px 14px",fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,display:"flex",alignItems:"center",gap:4}}>
                            {t.skipRestBtn||t.skip} →
                          </button>
                        </div>
                        <div style={{textAlign:"center",marginBottom:12}}>
                          <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:42,fontWeight:500,color:gc.accent,letterSpacing:2}}>
                            {w.restTimer.remaining}s
                          </span>
                        </div>
                        <div style={{height:5,background:c.border,borderRadius:3}}>
                          <div style={{height:"100%",width:`${(w.restTimer.remaining/w.restTimer.total)*100}%`,background:gc.accent,borderRadius:3,transition:"width 1s linear"}}/>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Upcoming exercise summary */}
                {isUpcoming&&(
                  <p style={{fontSize:11,color:c.textMuted,marginTop:2}}>
                    {ex.sets.length} {t.setsLabel} × {ex.sets[0]?.reps||"—"} {t.repsLabel} · {ex.rest}s {t.restLabel?.toLowerCase()||"rest"}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      );
    })}

    {/* ── Finish Button ── */}
    <button onClick={finishWorkout} disabled={!allSetsDone} style={{width:"100%",background:allSetsDone?c.primary:"transparent",color:allSetsDone?"#fff":c.textMuted,border:`1.5px solid ${allSetsDone?c.primary:c.border}`,borderRadius:12,padding:"14px",fontSize:15,fontWeight:900,fontFamily:"'Barlow Condensed',sans-serif",cursor:allSetsDone?"pointer":"not-allowed",marginTop:5,transition:"all 0.3s",boxShadow:allSetsDone?`0 4px 16px ${c.primary}44`:"none"}}>{allSetsDone?"✓ ":""}{t.finishWorkout}</button>
  </div>);
}
