"use client";
import {FormEvent,useEffect,useState} from "react";
import type { Service } from "@/data/services";

type FormStatus={type:"idle"|"loading"|"success"|"error";message:string};
const API_URL=(process.env.NEXT_PUBLIC_API_URL??"http://localhost:5000").replace(/\/$/,"");

export default function BookingForm(){
 const [services,setServices]=useState<Service[]>([]);
 const [categoryError,setCategoryError]=useState(false);
 useEffect(()=>{const controller=new AbortController();fetch("/api/catalog/services",{signal:controller.signal}).then(response=>{if(!response.ok)throw new Error();return response.json()}).then(data=>setServices(data.services)).catch(()=>{if(!controller.signal.aborted)setCategoryError(true)});return()=>controller.abort()},[]);

 const [status,setStatus]=useState<FormStatus>({type:"idle",message:""});
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();const formElement=e.currentTarget;setStatus({type:"loading",message:"Sending your request…"});
  const data=Object.fromEntries(new FormData(formElement).entries());
  try{
   const response=await fetch(`${API_URL}/api/bookings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
   const payload=await response.json().catch(()=>null) as {message?:string}|null;
   if(!response.ok)throw new Error(payload?.message||`Request failed with status ${response.status}.`);
   setStatus({type:"success",message:payload?.message||"Thank you! We’ll call you shortly."});formElement.reset();
  }catch(error){
   const message=error instanceof TypeError?`Cannot reach the booking API at ${API_URL}. Make sure the backend is running and NEXT_PUBLIC_API_URL is correct.`:error instanceof Error?error.message:"The booking request failed.";
   setStatus({type:"error",message});
  }
 }
 return <form className="booking-form" onSubmit={submit}><div className="field-row"><label>Name<input name="name" required placeholder="Your full name"/></label><label>Phone<input name="phone" required type="tel" inputMode="tel" minLength={10} placeholder="10-digit mobile number"/></label></div><div className="field-row"><label>Email (optional)<input name="email" type="email" placeholder="you@example.com"/></label><label>Service<select name="service" required defaultValue=""><option value="" disabled>{categoryError?"Categories unavailable — please call us":services.length?"Select a service":"Loading services…"}</option>{services.map(s=><option key={s.slug}>{s.name}</option>)}<option>AC on rent</option></select></label></div><div className="field-row"><label>Preferred date<input name="preferredDate" type="date"/></label><label>Location<input name="location" placeholder="Area / Sector"/></label></div><label>Tell us what you need<textarea name="message" rows={4} placeholder="AC type, issue, quantity or any other details"/></label><button className="btn" type="submit" disabled={status.type==="loading"}>{status.type==="loading"?"Sending…":"Request a callback"}</button>{status.message&&<p className={`form-status ${status.type}`} role="status">{status.message}</p>}</form>
}
