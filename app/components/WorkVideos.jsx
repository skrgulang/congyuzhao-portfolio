'use client';
import {useState,useEffect} from 'react';
import {workVideos} from '../videos/data';

export default function WorkVideos(){
 const [selected,setSelected]=useState(null);
 useEffect(()=>{
  if(!selected)return;
  const section=document.getElementById('selected-video');
  if(!section)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  section.scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'});
 },[selected]);
 return <div className="videoArchiveWrap">
   <div className="videoArchiveGrid">{workVideos.map((video,index)=><article className="videoArchiveCard" key={video.id}>
    <button type="button" className="videoArchiveCover" onClick={()=>setSelected(video.id)} aria-label={'Play '+video.title+' on this page'} aria-pressed={selected===video.id}>
     {video.thumbnail?<img src={'https://i.ytimg.com/vi/'+video.id+'/hqdefault.jpg'} alt="" loading="lazy" decoding="async"/>:<span className="videoArchiveMissing" aria-hidden="true">VIDEO {String(index+1).padStart(2,'0')}<small>Preview unavailable</small></span>}
     <span className="videoArchivePlay" aria-hidden="true">▶</span>
    </button>
    <div className="videoArchiveInfo"><span className="videoArchiveTag">{String(index+1).padStart(2,'0')} / {video.label}</span>
     <h2>{video.title}</h2><p>{video.note}</p>
     <div className="videoArchiveActions"><button type="button" onClick={()=>setSelected(video.id)}>Play here</button><a href={'https://www.youtube.com/watch?v='+video.id} target="_blank" rel="noopener noreferrer">Open on YouTube ↗︎</a></div>
    </div>
   </article>)}</div>
   {selected&&<div className="videoArchiveViewer" role="region" aria-label="Selected work video" id="selected-video">
     <div className="videoArchiveViewerHeading"><div><p className="newEyebrow">NOW VIEWING</p><h2>{workVideos.find(v=>v.id===selected)?.title}</h2></div><button type="button" className="videoArchiveClose" onClick={()=>setSelected(null)}>Close player ×</button></div>
     <iframe key={selected} src={'https://www.youtube-nocookie.com/embed/'+selected+'?rel=0'} title={workVideos.find(v=>v.id===selected)?.title||'Selected video'} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
     <p>These videos were supplied by the portfolio owner. Some original YouTube titles are generic, so specific project attribution is not assumed. If a video is unavailable to embed, use its YouTube link above.</p>
   </div>}
 </div>;
}
