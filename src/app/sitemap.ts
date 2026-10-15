export const dynamic = "force-dynamic";
import type { MetadataRoute } from "next";
import { getServices } from "@/lib/catalog";
import { serviceAreas } from "@/data/serviceAreas";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> { const services=await getServices(); const base="https://nkairconditioning.com"; return ["","/about","/services","/rental","/contact","/book"].map(p=>({url:base+p,lastModified:new Date()})).concat(services.map(s=>({url:`${base}/services/${s.slug}`,lastModified:new Date()})),serviceAreas.map(a=>({url:`${base}/locations/${a.slug}`,lastModified:new Date()}))); }
