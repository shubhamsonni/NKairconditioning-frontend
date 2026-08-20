import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Check, Headphones, MapPin, PackageCheck, Phone, RefreshCcw, ShieldCheck, Snowflake, Truck, Wrench } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";

export const metadata:Metadata={title:"Rental AC Service",description:"Window and split air conditioners available on rent for homes, offices, shops and events in Gurugram, with installation and maintenance support."};

const benefits=[
  {icon:ShieldCheck,title:"Quality-checked ACs",text:"Every unit is inspected, cleaned and tested before it reaches your space."},
  {icon:MapPin,title:"Free relocation support",text:"Moving within our service area? We can help relocate your rented AC."},
  {icon:Wrench,title:"Maintenance included",text:"Routine service and repair support are handled by our technical team."},
  {icon:RefreshCcw,title:"Flexible rental period",text:"Choose a rental duration that suits you and extend it when required."},
  {icon:Truck,title:"Delivery & installation",text:"We deliver, install and test the unit so it is ready to cool your room."},
  {icon:Headphones,title:"Responsive assistance",text:"Call us whenever you need help with your rented air conditioner."},
];

export default function Rental(){return <><SiteHeader/><main>
  <section className="rental-main-hero"><div className="container rental-main-grid">
    <div className="rental-copy"><span className="eyebrow">AC on rent in Gurugram</span><h1>Comfort now.<br/><em>Commitment later.</em></h1><p>Rent clean, reliable Window or Split AC units for your home, office, shop or event—with delivery, installation and service support.</p><div className="hero-actions"><Link className="btn" href="/book">Check availability <ArrowRight size={18}/></Link><a className="btn btn-ghost" href="tel:+919466980984"><Phone size={18}/> Call for pricing</a></div><div className="rental-proof"><span><Check/> Window & Split AC</span><span><Check/> Flexible duration</span><span><Check/> Service included</span></div></div>
    <div className="rental-product"><div className="rental-badge"><Snowflake/><span><b>Ready to rent</b><small>Window & Split AC</small></span></div><Image src="https://images.unsplash.com/photo-1631545806609-8e6fbd21e455?auto=format&fit=crop&w=1400&q=85" alt="Split air conditioner available on rent" fill priority sizes="(max-width:900px) 100vw, 50vw"/><div className="rental-float"><span>Rental support</span><b>Delivery • Installation • Service</b></div></div>
  </div></section>

  <section className="rental-benefits section"><div className="container"><div className="section-head"><div><span className="eyebrow dark">Why rent from us</span><h2>Cooling made simple</h2><p>Everything you need for dependable temporary cooling, without the cost and responsibility of ownership.</p></div><Link href="/book">Get rental pricing <ArrowRight size={18}/></Link></div><div className="rental-benefit-grid">{benefits.map(({icon:Icon,title,text},i)=><article key={title}><span className="benefit-number">0{i+1}</span><div className="benefit-icon"><Icon/></div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

  <section className="rental-process section"><div className="container"><div className="rental-process-head"><span className="eyebrow">From enquiry to cool air</span><h2>Rent an AC in three easy steps</h2></div><div className="rental-steps"><article><span>01</span><CalendarCheck/><h3>Share your requirement</h3><p>Tell us the room size, location, AC preference and required dates.</p></article><i/><article><span>02</span><PackageCheck/><h3>Confirm the right AC</h3><p>We recommend an appropriate unit and provide the rental estimate.</p></article><i/><article><span>03</span><Snowflake/><h3>We install & support</h3><p>Our team delivers, installs, tests and supports the unit during the rental.</p></article></div></div></section>

  <section className="rental-bottom"><div className="container rental-bottom-inner"><div><span className="eyebrow">Need cooling temporarily?</span><h2>Tell us your space and dates.<br/>We’ll handle the rest.</h2></div><div><a href="tel:+919466980984"><small>Talk to our rental team</small><b><Phone size={20}/> +91 94669 80984</b></a><Link className="btn btn-light" href="/book">Request a callback</Link></div></div></section>
  </main><Footer/><WhatsApp/></>}
