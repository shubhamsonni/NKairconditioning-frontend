"use client";
import { useEffect,useRef,useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Phone } from "lucide-react";
import type { HeroSlide } from "@/data/services";
const shopImage = "/work/shop/shop.webp";
export default function HeroSlider({initialSlides}: {initialSlides: HeroSlide[]}){
 const [slides,setSlides]=useState(initialSlides);
 const pending = useRef<AbortController|null>(null);
 useEffect(()=>()=>pending.current?.abort(),[]);
 async function refreshSlides() {
  pending.current?.abort();
  const controller = new AbortController(); pending.current = controller;
  try {
   const response=await fetch("/api/catalog/hero",{cache:"no-store",signal:controller.signal});
   if(response.ok){const data=await response.json() as {slides:HeroSlide[]};if(!controller.signal.aborted)setSlides(data.slides);}
  }catch { /* Keep the current slideshow if a refresh is unavailable. */ }
 }
 const [index,setIndex]=useState(0); const start=useRef<number|null>(null); const manualPause=useRef(false);
 useEffect(()=>{const timer=setTimeout(()=>{
  const next=(index+1)%slides.length;
  if(next===0)void refreshSlides();
  setIndex(next);
 },manualPause.current?5700:4700);manualPause.current=false;return()=>clearTimeout(timer)},[index,slides.length]);
 const go=(v:number)=>{manualPause.current=true;setIndex((v+slides.length)%slides.length)};
 return <section className="hero" onTouchStart={e=>start.current=e.touches[0].clientX} onTouchEnd={e=>{if(start.current===null)return;const d=e.changedTouches[0].clientX-start.current;if(Math.abs(d)>45)go(index+(d<0?1:-1));start.current=null}}>
  {slides.map((slide,i)=><div key={i} className={i===index?"hero-slide active":"hero-slide"} aria-hidden={i!==index}>
   {(i===0 || i===index) && <Image src={slide.image} alt={i===0?"N K Airconditioning shop in Sector 86, Gurugram":slide.title} fill sizes="100vw" priority={i===0} quality={80}/>}
   <div className="hero-shade" style={{background: `linear-gradient(90deg, rgba(6,29,45,${slide.image === shopImage ? '.68' : '.94'}) 0%, rgba(6,29,45,${slide.image === shopImage ? '.38' : '.66'}) 48%, rgba(6,29,45,${slide.image === shopImage ? '.08' : '.15'}) 100%)`}}/>
   <div className="container hero-content"><span className="eyebrow">{slide.eyebrow}</span>{i===0?<h1>AC Repair &amp; Installation in Gurugram</h1>:<h2 className="hero-title">{slide.title}</h2>}<p>{slide.text}</p><div className="hero-actions"><Link className="btn" href="/book" tabIndex={i===index?0:-1}>Book a technician <ArrowRight size={18}/></Link><a className="btn btn-ghost" href="tel:+919466980984" tabIndex={i===index?0:-1}><Phone size={18}/> Call now</a></div></div>
  </div>)}

  <button className="slider-arrow prev" onClick={()=>go(index-1)} aria-label="Previous slide"><ChevronLeft/></button><button className="slider-arrow next" onClick={()=>go(index+1)} aria-label="Next slide"><ChevronRight/></button>
  <div className="dots">{slides.map((_,i)=><button key={i} onClick={()=>go(i)} className={i===index?"active":""} aria-label={`Go to slide ${i+1}`}/>)}</div>
 </section>
}
