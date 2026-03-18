import { Component } from 'react';

class ErrorBoundary extends Component{
  constructor(p){super(p);this.state={err:null};}
  static getDerivedStateFromError(e){return{err:e};}
  render(){
    if(this.state.err){
      const e=this.state.err;
      return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh",background:"#0D0D0D",color:"#F0F0F0",fontFamily:"'DM Sans',sans-serif",padding:32,gap:16}}>
        <div style={{fontSize:36}}>⚠️</div>
        <p style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:26,fontWeight:900,color:"#C4826A"}}>Something went wrong</p>
        <pre style={{background:"#1C1C1C",border:"1px solid #2E2E2E",borderRadius:10,padding:"14px 18px",fontSize:12,color:"#C4826A",maxWidth:560,width:"100%",overflow:"auto",whiteSpace:"pre-wrap",wordBreak:"break-word"}}>{e?.message||String(e)}</pre>
        <button onClick={()=>location.reload()} style={{background:"#C4826A",color:"#fff",border:"none",borderRadius:9,padding:"10px 24px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Reload App</button>
      </div>);
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
