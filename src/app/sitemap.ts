export const dynamic = "force-dynamic";
import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { getServices } from "@/lib/catalog";
import { serviceAreas } from "@/data/serviceAreas";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> { const services=await getServices(); return ["","/about","/services","/rental","/contact","/book"].map(p=>({url:absoluteUrl(p)})).concat(services.map(s=>({url:absoluteUrl(`/services/${s.slug}`)})),serviceAreas.map(a=>({url:absoluteUrl(`/locations/${a.slug}`)}))); }
