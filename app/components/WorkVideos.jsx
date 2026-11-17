'use client';
import {useState,useEffect,useRef} from 'react';
import {workVideos} from '../videos/data';

export default function WorkVideos(){
 const [selected,setSelected]=useState(null);
 const [failedThumbs,setFailedThumbs]=useState([]);
 const [copied,setCopied]=useState(false);
 const [copyError,setCopyError]=useState(false);
 const lastTrigger=useRef(null);
 const currentIndex=workVideos.findIndex(video=>video.id===selected);
 const current=currentIndex===-1?null:workVideos[currentIndex];
 const videoUrl=id=>{
  const index=workVideos.findIndex(video=>video.id===id);
  return '/videos?game='+String(index+1).padStart(2,'0');
 };
 const syncFromUrl=()=>{
  const requested=new URL(window.location.href).searchParams.get('game');
  const index=Number(requested);
  const match=/^(0?[1-6])$/.test(requested||'')?workVideos[index-1]:null;
  setSelected(match?.id||null);
  setCopied(false);
  setCopyError(false);
  // Browser Back/Forward can dismiss the selected player without a click.
  // Restore a useful focus target when the viewer is about to disappear.
  if(!match && document.activeElement?.closest('#selected-video')){
   requestAnimationFrame(()=>lastTrigger.current?.isConnected
    ?lastTrigger.current.focus({preventScroll:true})
    :document.querySelector('.videoArchiveCover')?.focus({preventScroll:true}));
  }
 };
 const updateUrl=(id,{replace=false}={})=>{
  const url=new URL(window.location.href);
  if(id)url.searchParams.set('game',String(workVideos.findIndex(video=>video.id===id)+1).padStart(2,'0'));
  else url.searchParams.delete('game');
  const next=url.pathname+url.search+url.hash;
  if(next===window.location.pathname+window.location.search+window.location.hash)return;
  // An initial open creates one browser history entry. Switching/closing
  // reuses that entry so Back never returns to a player just dismissed.
  window.history[replace?'replaceState':'pushState'](null,'',next);
 };
 useEffect(()=>{
  syncFromUrl();
  window.addEventListener('popstate',syncFromUrl);
  return()=>window.removeEventListener('popstate',syncFromUrl);
 },[]);
 const openVideo=(id,event)=>{
  if(event?.currentTarget)lastTrigger.current=event.currentTarget;
  setSelected(id);
  setCopied(false);
  setCopyError(false);
  updateUrl(id);
 };
 const closeVideo=()=>{
  setSelected(null);
  setCopied(false);
  setCopyError(false);
  updateUrl(null,{replace:true});
  requestAnimationFrame(()=>(lastTrigger.current?.isConnected
   ?lastTrigger.current:document.querySelector('.videoArchiveCover'))?.focus({preventScroll:true}));
 };
 const selectAdjacent=(direction)=>{
  if(currentIndex<0)return;
  const next=(currentIndex+direction+workVideos.length)%workVideos.length;
  setSelected(workVideos[next].id);
  setCopied(false);
  setCopyError(false);
  updateUrl(workVideos[next].id,{replace:true});
 };
 const [nativeShareAvailable,setNativeShareAvailable]=useState(false);
 useEffect(()=>setNativeShareAvailable(typeof navigator.share==='function'),[]);
 const shareNative=async()=>{
  if(!current || !nativeShareAvailable)return;
  const url=new URL(videoUrl(current.id),window.location.origin).href;
  try{
   await navigator.share({title:current.title+' | Congyu Zhao',url});
   setCopyError(false);
  }catch(error){
   // Users cancelling a system share sheet should not see an error.
   if(error?.name!=='AbortError')setCopyError(true);
  }
 };
 const shareVideo=async()=>{
  if(!current)return;
  const url=new URL(videoUrl(current.id),window.location.origin).href;
  try{
   await navigator.clipboard.writeText(url);
   setCopied(true);
   setCopyError(false);
  }catch{
   setCopied(false);
   setCopyError(true);
  }
 };
 useEffect(()=>{
  if(!selected)return;
  const onKeyDown=event=>{
   if(event.key==='Escape'){
    event.preventDefault();
    setSelected(null);
    setCopied(false);
    setCopyError(false);
    updateUrl(null,{replace:true});
    requestAnimationFrame(()=>(lastTrigger.current?.isConnected
   ?lastTrigger.current:document.querySelector('.videoArchiveCover'))?.focus({preventScroll:true}));
   }else if((event.key==='ArrowRight'||event.key==='ArrowLeft')&&
     document.activeElement?.closest('#selected-video')&&
     !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)&&
     !document.activeElement.isContentEditable){
    event.preventDefault();
    selectAdjacent(event.key==='ArrowRight'?1:-1);
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
   // Keep focus on Previous/Next while advancing the playlist. When a
   // gallery card opens the player, focus the region to announce the change.
   const adjustingPlaylist=Boolean(document.activeElement?.closest('.videoArchivePlaybackActions'));
   if(!adjustingPlaylist){
    section.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'});
    section.focus({preventScroll:true});
   }
  });
  return()=>cancelAnimationFrame(frame);
 },[selected]);

 return <div className="videoArchiveWrap">
   {current&&<div className="videoArchiveViewer" role="region" aria-label="Selected mini-game recording" id="selected-video" tabIndex={-1}>
     <div className="videoArchiveViewerHeading">
       <div aria-live="polite" aria-atomic="true"><p className="newEyebrow" data-testid="mini-game-position">NOW VIEWING / SOLO MINI GAME {String(currentIndex+1).padStart(2,'0')} OF {workVideos.length}</p><h2>{current.title}</h2></div>
       <button type="button" className="videoArchiveClose" onClick={closeVideo}>Close player ×</button>
     </div>
     <iframe key={current.id} src={'https://www.youtube-nocookie.com/embed/'+current.id+'?rel=0'} title={current.title} loading="eager" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/>
     <p className="videoArchiveKeyboardHint">Keyboard: use ← / → to browse mini-games, Esc to close the player. If YouTube requests verification, open the original on YouTube.</p>
     <div className="videoArchivePlaybackActions">
       <button type="button" onClick={()=>selectAdjacent(-1)} aria-label="Play previous mini game">← Previous</button>
       <a href={'https://www.youtube.com/watch?v='+current.id} target="_blank" rel="noopener noreferrer">Watch original on YouTube ↗︎</a>
       <button type="button" onClick={()=>selectAdjacent(1)} aria-label="Play next mini game">Next →</button>
     </div>
     <div className="videoArchiveShare">
       <a href={videoUrl(current.id)}>Shareable link to {current.title}</a>
       {nativeShareAvailable&&<button type="button" onClick={shareNative} aria-label={'Share '+current.title+' using device share sheet'}>Share…</button>}<button type="button" onClick={shareVideo} aria-label={'Copy link to '+current.title}>{copied?'Copied link ✓':'Copy video link'}</button>
       <span className="videoArchiveCopyStatus" role="status">{copied?'Link copied to clipboard':copyError?'Clipboard unavailable — use the shareable link above':''}</span>
     </div>
     <p>These are my six independently created mini-games, numbered rather than given invented project titles. If YouTube blocks embedded playback, open the original recording above.</p>
   </div>}
   <div className="videoArchiveGrid">{workVideos.map((video,index)=><article className="videoArchiveCard" key={video.id}>
    <button type="button" className="videoArchiveCover" onClick={event=>openVideo(video.id,event)} aria-label={'Play '+video.title+' on this page'} aria-controls={selected?'selected-video':undefined} aria-expanded={selected===video.id}>
     <img src={video.thumbnail&&!failedThumbs.includes(video.id)?'https://i.ytimg.com/vi/'+video.id+'/hqdefault.jpg':'/videos/og/'+String(index+1).padStart(2,'0')} alt="" loading="lazy" decoding="async" onError={()=>setFailedThumbs(previous=>previous.includes(video.id)?previous:[...previous,video.id])}/>
     <span className="videoArchivePlay" aria-hidden="true">▶</span>
    </button>
    <div className="videoArchiveInfo"><span className="videoArchiveTag">{String(index+1).padStart(2,'0')} / {video.label}</span>
     <h2>{video.title}</h2><p>{video.note}</p>
     <div className="videoArchiveActions"><button type="button" onClick={event=>openVideo(video.id,event)} aria-controls={selected?'selected-video':undefined} aria-expanded={selected===video.id}>Play here</button><a href={videoUrl(video.id)} aria-label={'Share '+video.title+' portfolio page'}>Share this game ↗︎</a><a href={'https://www.youtube.com/watch?v='+video.id} target="_blank" rel="noopener noreferrer">YouTube ↗︎</a></div>
    </div>
   </article>)}</div>
 </div>;
}
