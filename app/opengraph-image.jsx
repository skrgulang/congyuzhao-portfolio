import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(
    <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',width:'100%',height:'100%',padding:'74px 78px',background:'#121513',color:'#f2f0e9'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:24,letterSpacing:2}}>
        <span style={{fontWeight:800,color:'#d8e8bb'}}>CZ.</span>
        <span style={{fontSize:20,color:'#aeb8aa'}}>PURDUE UNIVERSITY</span>
      </div>
      <div style={{display:'flex',flexDirection:'column'}}>
        <span style={{fontSize:102,fontWeight:800,letterSpacing:-6,lineHeight:1}}>Congyu Zhao<span style={{color:'#d8e8bb'}}>.</span></span>
        <span style={{fontSize:37,color:'#c3cbbf',marginTop:24}}>Software · Games · Aspire 101</span>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',fontSize:20,color:'#acb8aa'}}>
        <span>SELECTED PROJECTS & EXPERIENCE</span><span>congyuzhao.com</span>
      </div>
    </div>,
    size
  );
}
