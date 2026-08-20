import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { serviceAreas } from "@/data/serviceAreas";
export default function sitemap(): MetadataRoute.Sitemap { const base="https://nkairconditioning.com"; return ["","/about","/services","/rental","/contact","/book"].map(p=>({url:base+p,lastModified:new Date()})).concat(services.map(s=>({url:`${base}/services/${s.slug}`,lastModified:new Date()})),serviceAreas.map(a=>({url:`${base}/locations/${a.slug}`,lastModified:new Date()}))); }
