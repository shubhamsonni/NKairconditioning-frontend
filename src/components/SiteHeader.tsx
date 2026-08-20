"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MapPin, Menu, Phone, Star, X } from "lucide-react";

export default function SiteHeader(){
  const [open,setOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{
    const update=()=>setScrolled(window.scrollY>20);
    update();
    window.addEventListener("scroll",update,{passive:true});
    return()=>window.removeEventListener("scroll",update);
  },[]);
  const links=[["/","Home"],["/about","About"],["/services","Services"],["/rental","Rental AC"],["/contact","Contact"]];
  return <>
    <div className="topbar"><div className="container topbar-inner"><span><MapPin size={15}/> Service across Gurugram & nearby areas</span><button className="top-review" onClick={()=>window.dispatchEvent(new Event("open-review"))}><Star size={14} fill="currentColor"/> 4.9 Reviews</button><a href="tel:+919466980984"><Phone size={15}/> +91 94669 80984</a><span className="top-note">24/7 emergency support</span></div></div>
    <header className={`header${scrolled?" scrolled":""}`}><div className="container nav-wrap">
      <Link className="brand" href="/" aria-label="N K Airconditioning home"><span className="brand-mark">NK</span><span>N K <b>AIRCONDITIONING</b><small>COOLING & FABRICATION</small></span></Link>
      <nav className={open?"nav open":"nav"}>{links.map(([href,label])=><Link key={href} href={href} onClick={()=>setOpen(false)}>{label}</Link>)}<a className="btn nav-quote" href="https://wa.me/919466980984?text=Hello%20N%20K%20Airconditioning%2C%20I%20want%20to%20book%20AC%20service.%0A%0AName%3A%20%0ACurrent%20location%3A%20%0APhone%20number%3A%20%0AProblem%3A%20" target="_blank" rel="noreferrer">Book Now</a></nav>
      <a className="header-call" href="tel:+919466980984"><Phone size={18}/><span><small>Call now</small>94669 80984</span></a>
      <button className="menu-btn" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button>
    </div></header>
  </>;
}
