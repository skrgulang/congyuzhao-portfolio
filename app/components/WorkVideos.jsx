'use client';
import {useState,useEffect,useRef} from 'react';
import {workVideos} from '../videos/data';

export default function WorkVideos(){
 const [selected,setSelected]=useState(null);
 const [failedThumbs,setFailedThumbs]=useState([]);
 const lastTrigger=useRef(null);
 const currentIndex=workVideos.findIndex(video=>video.id===selected);
 const current=currentIndex===-1?null:workVideos[currentIndex];
 const openVideo=(id,event)=>{
  if(event?.currentTarget)lastTrigger.current=event.currentTarget;
  setSelected(id);
 };
 const closeVideo=()=>{
  setSelected(null);
  requestAnimationFrame(()=>lastTrigger.current?.focus({preventScroll:true}));
 };
 const selectAdjacent=(direction)=>{
  if(currentIndex<0)return;
  const next=(currentIndex+direction+workVideos.length)%workVideos.length;
  setSelected(workVideos[next].id);
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
   section.focus({preventScroll:true});
  });
  return()=>cancelAnimationFrame(frame);
 },[selected]);

 return <div className="videoArchiveWrap">
   {current&&<div className="videoArchiveViewer" role="region" aria-label="Selected mini-game recording" id="selected-video" tabIndex={-1}>
     <div className="videoArchiveViewerHeading">
       <div><p className="newEyebrow">NOW VIEWING / SOLO MINI GAME {String(currentIndex+1).padStart(2,'0')} OF {workVideos.length}</p><h2>{current.title}</h2></div>
       <button type="button" className="videoArchiveClose" onClick={closeVideo}>Close player ×</button>
     </div>
     <iframe key={current.id} src={'https://www.youtube-nocookie.com/embed/'+current.id+'?rel=0'} title={current.title} loading="eager" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/>
     <div className="videoArchivePlaybackActions">
       <button type="button" onClick={()=>selectAdjacent(-1)} aria-label="Play previous mini game">← Previous</button>
       <a href={'https://www.youtube.com/watch?v='+current.id} target="_blank" rel="noopener noreferrer">Watch original on YouTube ↗︎</a>
       <button type="button" onClick={()=>selectAdjacent(1)} aria-label="Play next mini game">Next →</button>
     </div>
     <p>These are my six independently created mini-games, numbered rather than given invented project titles. If YouTube blocks embedded playback, open the original recording above.</p>
   </div>}
   <div className="videoArchiveGrid">{workVideos.map((video,index)=><article className="videoArchiveCard" key={video.id}>
    <button type="button" className="videoArchiveCover" onClick={event=>openVideo(video.id,event)} aria-label={'Play '+video.title+' on this page'} aria-controls={selected?'selected-video':undefined} aria-expanded={selected===video.id}>
     {video.thumbnail&&!failedThumbs.includes(video.id)?<img src={'https://i.ytimg.com/vi/'+video.id+'/hqdefault.jpg'} alt="" loading="lazy" decoding="async" onError={()=>setFailedThumbs(previous=>previous.includes(video.id)?previous:[...previous,video.id])}/>:<span className="videoArchiveMissing" aria-hidden="true">MINI GAME {String(index+1).padStart(2,'0')}<small>Original recording · Play to watch</small></span>}
     <span className="videoArchivePlay" aria-hidden="true">▶</span>
    </button>
    <div className="videoArchiveInfo"><span className="videoArchiveTag">{String(index+1).padStart(2,'0')} / {video.label}</span>
     <h2>{video.title}</h2><p>{video.note}</p>
     <div className="videoArchiveActions"><button type="button" onClick={event=>openVideo(video.id,event)} aria-controls={selected?'selected-video':undefined} aria-expanded={selected===video.id}>Play here</button><a href={'https://www.youtube.com/watch?v='+video.id} target="_blank" rel="noopener noreferrer">Open on YouTube ↗︎</a></div>
    </div>
   </article>)}</div>
 </div>;
}
