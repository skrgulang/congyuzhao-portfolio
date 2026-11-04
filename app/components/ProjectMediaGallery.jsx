'use client';
import { useEffect, useId, useRef, useState } from 'react';

const frames=[
  {src:'/showcase/fish-inventory-hq.jpg',title:'Inventory and item management',caption:'Original 1080p presentation frame — inventory UI and item actions'},
  {src:'/showcase/fish-gameplay-hq.jpg',title:'Characters and gameplay',caption:'Original 1080p presentation frame — playable character interactions'},
  {src:'/showcase/fish-island-hq.jpg',title:'Island and terrain',caption:'Original 1080p presentation frame — island environment work'}
];

export default function ProjectMediaGallery(){
  const [active,setActive]=useState(0);
  const [expanded,setExpanded]=useState(false);
  const closeRef=useRef(null);
  const openRef=useRef(null);
  const dialogRef=useRef(null);
  const swipeStart=useRef(null);
  const lastSwipeAt=useRef(0);
  const titleId=useId();
  const move=delta=>setActive(current=>(current+delta+frames.length)%frames.length);
  const onTouchStart=e=>{
    const touch=e.changedTouches[0];
    swipeStart.current={x:touch.clientX,y:touch.clientY};
  };
  const onTouchEnd=e=>{
    const start=swipeStart.current;
    swipeStart.current=null;
    if(!start)return;
    const touch=e.changedTouches[0];
    const dx=touch.clientX-start.x;
    const dy=touch.clientY-start.y;
    if(Math.abs(dx)>=55 && Math.abs(dx)>Math.abs(dy)*1.5){
      lastSwipeAt.current=Date.now();
      move(dx<0?1:-1);
    }
  };
  useEffect(()=>{
    const preload=frames.filter((_,i)=>i!==active).map(item=>{
      const image=new Image();
      image.src=item.src;
      return image;
    });
    return()=>{preload.length=0};
  },[active]);
  useEffect(()=>{
    if(!expanded)return;
    const previous=document.activeElement;
    const oldOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    closeRef.current?.focus();
    const onKey=e=>{
      if(e.key==='Escape'){e.preventDefault();setExpanded(false);}
      else if(e.key==='Tab'){
        const controls=Array.from(dialogRef.current?.querySelectorAll('button:not([disabled])')||[]);
        if(!controls.length)return;
        const first=controls[0],last=controls[controls.length-1];
        const focused=document.activeElement;
        if(!dialogRef.current?.contains(focused)){e.preventDefault();first.focus();}
        else if(e.shiftKey&&focused===first){e.preventDefault();last.focus();}
        else if(!e.shiftKey&&focused===last){e.preventDefault();first.focus();}
      }
      else if(e.key==='ArrowRight'){e.preventDefault();move(1);}
      else if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}
    };
    document.addEventListener('keydown',onKey);
    return()=>{document.removeEventListener('keydown',onKey);document.body.style.overflow=oldOverflow;requestAnimationFrame(()=>{if(previous?.isConnected)previous.focus();else openRef.current?.focus()});};
  },[expanded]);
  return <div className="interactiveGallery" id="fish-project-gallery" role="region" aria-label="Fish and Ships game images" tabIndex={0} onKeyDown={e=>{if(expanded)return;if(e.key==='ArrowRight'){e.preventDefault();move(1)}else if(e.key==='ArrowLeft'){e.preventDefault();move(-1)}}}>
    <div className="interactiveGalleryStage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <button ref={openRef} className="galleryExpand" type="button" onClick={()=>{if(Date.now()-lastSwipeAt.current>450)setExpanded(true)}} aria-label={'View '+frames[active].title+' enlarged'}>
        <img key={frames[active].src} src={frames[active].src} alt={frames[active].title+' — actual work-in-progress footage'} width="1194" height="672" loading="lazy"/>
        <span className="galleryExpandHint">View larger ↗</span>
      </button>
      <div className="interactiveGalleryOverlay"><span aria-live="polite" aria-atomic="true">{String(active+1).padStart(2,'0')} / {String(frames.length).padStart(2,'0')}</span><strong>{frames[active].title}</strong></div>
      <div className="interactiveGalleryControls">
        <button type="button" onClick={()=>move(-1)} aria-label="Previous screenshot">←</button>
        <button type="button" onClick={()=>move(1)} aria-label="Next screenshot">→</button>
      </div>
    </div>
    <div className="interactiveGalleryBottom">
      <p aria-live="polite">{frames[active].caption}</p>
      <div className="interactiveGalleryThumbs">{frames.map((item,i)=><button key={item.src} type="button" onClick={()=>setActive(i)} className={i===active?'active':''} aria-label={'View '+item.title} aria-pressed={i===active}><img src={item.src} width="95" height="55" alt=""/></button>)}</div>
    </div>
    <p className="interactiveGalleryFoot">Original frames from the 1920 × 1080 development recording. Swipe on touch screens, select a thumbnail, or use the arrow keys.</p>
    {expanded&&<div className="galleryLightbox" role="dialog" aria-modal="true" aria-labelledby={titleId} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onMouseDown={e=>{if(e.target===e.currentTarget)setExpanded(false)}}>
      <div className="galleryLightboxContent" ref={dialogRef}>
        <div className="galleryLightboxTop"><span id={titleId}>{frames[active].title} · {active+1}/{frames.length}</span><button ref={closeRef} type="button" onClick={()=>setExpanded(false)} aria-label="Close enlarged view">✕ Close</button></div>
        <img src={frames[active].src} alt={frames[active].title+' — actual game development still'} width="1194" height="672"/>
        <div className="galleryLightboxBottom"><button type="button" onClick={()=>move(-1)} aria-label="Previous enlarged image">← Previous</button><span>{frames[active].caption}</span><button type="button" onClick={()=>move(1)} aria-label="Next enlarged image">Next →</button></div>
      </div>
    </div>}
  </div>;
}
