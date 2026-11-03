'use client';
import { useEffect, useRef, useState } from 'react';

const frames=[
  {src:'/showcase/fish-gameplay.svg',title:'Gameplay development',caption:'A still from the team development recording'},
  {src:'/showcase/fish-characters.svg',title:'Characters & island',caption:'Unity characters and environment work'}
];

export default function ProjectMediaGallery(){
  const [active,setActive]=useState(0);
  const [expanded,setExpanded]=useState(false);
  const closeRef=useRef(null);
  const openRef=useRef(null);
  const move=delta=>setActive(current=>(current+delta+frames.length)%frames.length);
  useEffect(()=>{
    if(!expanded)return;
    const previous=document.activeElement;
    const oldOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    closeRef.current?.focus();
    const onKey=e=>{
      if(e.key==='Escape')setExpanded(false);
      else if(e.key==='ArrowRight')move(1);
      else if(e.key==='ArrowLeft')move(-1);
    };
    document.addEventListener('keydown',onKey);
    return()=>{document.removeEventListener('keydown',onKey);document.body.style.overflow=oldOverflow;requestAnimationFrame(()=>{if(previous?.isConnected)previous.focus();else openRef.current?.focus()});};
  },[expanded]);
  return <div className="interactiveGallery" id="fish-project-gallery" role="region" aria-label="Fish and Ships game images" tabIndex={0} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();move(1)}else if(e.key==='ArrowLeft'){e.preventDefault();move(-1)}}}>
    <div className="interactiveGalleryStage">
      <button ref={openRef} className="galleryExpand" type="button" onClick={()=>setExpanded(true)} aria-label={'View '+frames[active].title+' enlarged'}>
        <img key={frames[active].src} src={frames[active].src} alt={frames[active].title+' — actual work-in-progress footage'} width="900" height="510" loading="lazy"/>
        <span className="galleryExpandHint">View larger ↗</span>
      </button>
      <div className="interactiveGalleryOverlay"><span>{String(active+1).padStart(2,'0')} / {String(frames.length).padStart(2,'0')}</span><strong>{frames[active].title}</strong></div>
      <div className="interactiveGalleryControls">
        <button type="button" onClick={()=>move(-1)} aria-label="Previous screenshot">←</button>
        <button type="button" onClick={()=>move(1)} aria-label="Next screenshot">→</button>
      </div>
    </div>
    <div className="interactiveGalleryBottom">
      <p aria-live="polite">{frames[active].caption}</p>
      <div className="interactiveGalleryThumbs">{frames.map((item,i)=><button key={item.src} type="button" onClick={()=>setActive(i)} className={i===active?'active':''} aria-label={'View '+item.title} aria-pressed={i===active}><img src={item.src} width="95" height="55" alt=""/></button>)}</div>
    </div>
    <p className="interactiveGalleryFoot">Original development video stills · Choose a thumbnail or use arrow keys.</p>
    {expanded&&<div className="galleryLightbox" role="dialog" aria-modal="true" aria-label="Expanded Fish and Ships screenshot" onMouseDown={e=>{if(e.target===e.currentTarget)setExpanded(false)}} onKeyDown={e=>e.stopPropagation()}>
      <div className="galleryLightboxContent">
        <div className="galleryLightboxTop"><span>{frames[active].title} · {active+1}/{frames.length}</span><button ref={closeRef} type="button" onClick={()=>setExpanded(false)} aria-label="Close enlarged view">✕ Close</button></div>
        <img src={frames[active].src} alt={frames[active].title+' — actual game development still'} width="1200" height="680"/>
        <div className="galleryLightboxBottom"><button type="button" onClick={()=>move(-1)} aria-label="Previous enlarged image">← Previous</button><span>{frames[active].caption}</span><button type="button" onClick={()=>move(1)} aria-label="Next enlarged image">Next →</button></div>
      </div>
    </div>}
  </div>;
}
