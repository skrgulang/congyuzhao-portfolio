'use client';
import { useEffect, useState } from 'react';

const frames=[
  {src:'/showcase/fish-gameplay.svg',title:'Gameplay development',caption:'A still from the team development recording'},
  {src:'/showcase/fish-characters.svg',title:'Characters & island',caption:'Unity characters and environment work'}
];

export default function ProjectMediaGallery(){
  const [active,setActive]=useState(0);
  const move=delta=>setActive(current=>(current+delta+frames.length)%frames.length);
  useEffect(()=>{
    const onKey=e=>{
      if(e.key==='ArrowRight')move(1);
      if(e.key==='ArrowLeft')move(-1);
    };
    const element=document.getElementById('fish-project-gallery');
    if(!element)return;
    element.addEventListener('keydown',onKey);
    return()=>element.removeEventListener('keydown',onKey);
  },[]);
  return <div className="interactiveGallery" id="fish-project-gallery" role="region" aria-label="Fish and Ships game images" tabIndex={0}>
    <div className="interactiveGalleryStage">
      <img key={frames[active].src} src={frames[active].src} alt={frames[active].title+' — actual work-in-progress footage'} width="900" height="510" loading="lazy"/>
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
    <p className="interactiveGalleryFoot">Frames extracted from the original team presentation · Use arrow keys when the gallery is focused.</p>
  </div>;
}
