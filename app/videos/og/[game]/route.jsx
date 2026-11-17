import {ImageResponse} from 'next/og';
import {workVideos} from '../../data';

export const runtime='nodejs';
export const dynamic='force-dynamic';

export async function GET(request,{params}){
 const {game}=await params;
 if(!/^(0[1-6])$/.test(game))return new Response('Not found',{status:404});
 const index=Number(game)-1;
 const video=workVideos[index];
 if(!video)return new Response('Not found',{status:404});
 return new ImageResponse(
  <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',background:'#0e1011',color:'#f7f4ed',padding:'70px 76px',fontFamily:'sans-serif',position:'relative',overflow:'hidden'}}>
   <div style={{display:'flex',position:'absolute',right:-132,top:58,width:500,height:500,borderRadius:250,border:'55px solid #b3a06b',opacity:.12}} />
   <div style={{display:'flex',position:'absolute',right:135,top:135,width:180,height:180,borderRadius:90,border:'2px solid #b3a06b',opacity:.3}} />
   <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%'}}>
    <span style={{fontSize:27,letterSpacing:5,fontWeight:700,color:'#d9c28a'}}>CZ / WORK</span>
    <span style={{fontSize:21,letterSpacing:4,color:'#bcb5a6'}}>GAME DEVELOPMENT · ORIGINAL RECORDING</span>
   </div>
   <div style={{display:'flex',flexDirection:'column',gap:24,maxWidth:850}}>
    <span style={{fontSize:24,letterSpacing:4,color:'#c7b486'}}>INDEPENDENT MINI GAME · {game} / 06</span>
    <span style={{fontSize:90,fontWeight:800,letterSpacing:-4,lineHeight:1.06}}>{video.title}</span>
    <span style={{fontSize:27,color:'#d6d1c5'}}>Designed and developed by Congyu Zhao</span>
   </div>
   <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%',borderTop:'2px solid #625941',paddingTop:26}}>
    <span style={{fontSize:23,color:'#ead9b5'}}>PURDUE UNIVERSITY · SOFTWARE & GAMES</span>
    <span style={{fontSize:23,color:'#ead9b5'}}>congyuzhao.com</span>
   </div>
  </div>,
  {width:1200,height:630,headers:{'Cache-Control':'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400'}}
 );
}
