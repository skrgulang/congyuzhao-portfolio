'use client';
import {useState,useEffect,useRef} from 'react';
import {workVideos} from '../videos/data';

export default function WorkVideos(){
 const [selected,setSelected]=useState(null);
 const lastTrigger=useRef(null);
 const current=workVideos.find(video=>video.id===selected);
 const openVideo=(id,event)=>{
  lastTrigger.current=event.currentTarget;
  setSelected(id);
 };
 const closeVideo=()=>{
  setSelected(null);
  requestAnimationFrame(()=>lastTrigger.current?.focus({preventScroll:true}));
 };
 useEffect(()=>{
  if(!selected)return;
  const onKeyDown=event=>{
   if(event.key==='Escape'){
    event.preventDefault();
    setSelected(null);
    requestAnimationFrame(()=>lastTrigger.current?.focus({preventScroll:true}));
   }
  };
  window.addEventListener('keydown',onKeyDown);
  return()=>window.removeEventListener('keydown',onKeyDown);
 },[selected]);
 useEffect(()=>{
  if(!selected)return;
  const frame=requestAnimationFrame(()=>{
   const section=document.getElementById('selected-video');
   if(!section)return;
   const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   section.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'});
   // Make the newly inserted player discoverable to keyboard and screen-reader users.
   // Prevent focus itself from overriding the intentional scroll position.
   section.focus({preventScroll:true});
  });
  return()=>cancelAnimationFrame(frame);
 },[selected]);

 return <div className="videoArchiveWrap">
   {current&&<div className="videoArchiveViewer" role="region" aria-label="Selected mini-game recording" id="selected-video" tabIndex={-1}>
     <div className="videoArchiveViewerHeading">
       <div><p className="newEyebrow">NOW VIEWING / SOLO MINI GAME</p><h2>{current.title}</h2></div>
       <button type="button" className="videoArchiveClose" onClick={closeVideo}>Close player ×</button>
     </div>
     <iframe key={current.id} src={'https://www.youtube-nocookie.com/embed/'+current.id+'?rel=0'} title={current.title} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/>
     <p>I made all six mini-games independently. They have numbered labels rather than invented project titles. If a clip cannot play here, use its original YouTube link below.</p>
   </div>}
   <div className="videoArchiveGrid">{workVideos.map((video,index)=><article className="videoArchiveCard" key={video.id}>
    <button type="button" className="videoArchiveCover" onClick={event=>openVideo(video.id,event)} aria-label={'Play '+video.title+' on this page'} aria-controls="selected-video" aria-expanded={selected===video.id}>
     {video.thumbnail?<img src={'https://i.ytimg.com/vi/'+video.id+'/hqdefault.jpg'} alt="" loading="lazy" decoding="async"/>:<span className="videoArchiveMissing" aria-hidden="true">MINI GAME {String(index+1).padStart(2,'0')}<small>Original recording · Play to watch</small></span>}
     <span className="videoArchivePlay" aria-hidden="true">▶</span>
    </button>
    <div className="videoArchiveInfo"><span className="videoArchiveTag">{String(index+1).padStart(2,'0')} / {video.label}</span>
     <h2>{video.title}</h2><p>{video.note}</p>
     <div className="videoArchiveActions"><button type="button" onClick={event=>openVideo(video.id,event)} aria-controls="selected-video" aria-expanded={selected===video.id}>Play here</button><a href={'https://www.youtube.com/watch?v='+video.id} target="_blank" rel="noopener noreferrer">Open on YouTube ↗︎</a></div>
    </div>
   </article>)}</div>
 </div>;
}
