"use client";
import { useEffect,useRef,useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { heroSlides } from "@/data/services";
export default function HeroSlider(){
 const [index,setIndex]=useState(0); const start=useRef<number|null>(null); const manualPause=useRef(false);
 useEffect(()=>{const timer=setTimeout(()=>setIndex(v=>(v+1)%heroSlides.length),manualPause.current?2500:1500);manualPause.current=false;return()=>clearTimeout(timer)},[index]);
 const go=(v:number)=>{manualPause.current=true;setIndex((v+heroSlides.length)%heroSlides.length)};
 return <section className="hero" onTouchStart={e=>start.current=e.touches[0].clientX} onTouchEnd={e=>{if(start.current===null)return;const d=e.changedTouches[0].clientX-start.current;if(Math.abs(d)>45)go(index+(d<0?1:-1));start.current=null}}>
  {heroSlides.map((slide,i)=><div key={slide.title} className={i===index?"hero-slide active":"hero-slide"} style={{backgroundImage:`linear-gradient(90deg, rgba(6,29,45,.94) 0%, rgba(6,29,45,.66) 48%, rgba(6,29,45,.15) 100%), url('${slide.image}')`}}><div className="container hero-content"><span className="eyebrow">{slide.eyebrow}</span><h1>{slide.title}</h1><p>{slide.text}</p><div className="hero-actions"><Link className="btn" href="/book">Book a technician <ArrowRight size={18}/></Link><a className="btn btn-ghost" href="tel:+919466980984"><Phone size={18}/> Call now</a></div></div></div>)}
  <button className="slider-arrow prev" onClick={()=>go(index-1)} aria-label="Previous slide"><ChevronLeft/></button><button className="slider-arrow next" onClick={()=>go(index+1)} aria-label="Next slide"><ChevronRight/></button>
  <div className="dots">{heroSlides.map((_,i)=><button key={i} onClick={()=>setIndex(i)} className={i===index?"active":""} aria-label={`Go to slide ${i+1}`}/>)}</div>
 </section>
}
