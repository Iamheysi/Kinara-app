import { BurgerBtn } from './BurgerBtn.jsx';

export function Header({running,time,formatTime,setTab,menuOpen,setMenuOpen,c,t}){
  const h=new Date().getHours();const g=h<12?t.goodMorning:h<17?t.goodAfternoon:t.goodEvening;
  const ds=new Date().toLocaleDateString("en-GB",{weekday:"long",month:"long",day:"numeric"});
  return(<header style={{height:56,background:c.surface,borderBottom:`1px solid ${c.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 26px",flexShrink:0,zIndex:50}} className="kb-header-pad"><div><p style={{fontSize:11,color:c.textSecondary}}>{ds}</p><p style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:800,color:c.textPrimary,lineHeight:1.1}}>{g}<span style={{color:c.primary}}>.</span></p></div><div style={{display:"flex",alignItems:"center",gap:9}}>{running&&(<div onClick={()=>setTab("log")} style={{display:"flex",alignItems:"center",gap:7,background:c.primaryDim,border:`1px solid ${c.primary}33`,borderRadius:9,padding:"5px 12px",cursor:"pointer"}}><span style={{width:7,height:7,borderRadius:"50%",background:c.primary,animation:"pulse 1.5s infinite"}}/><span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:c.primaryLight}}>{formatTime(time)}</span></div>)}<BurgerBtn open={menuOpen} onClick={()=>setMenuOpen(!menuOpen)} c={c}/></div></header>);
}
