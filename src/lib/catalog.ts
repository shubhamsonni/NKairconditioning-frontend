import "server-only";
import { cache } from "react";
import type { Service, HeroSlide, GalleryPage } from "@/data/services";
const base = (process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000").replace(/\/$/, "");
async function read<T>(path: string): Promise<T> {
 const response = await fetch(base + "/api/catalog" + path, { next: { revalidate: 60 }, signal: AbortSignal.timeout(10000) });
 if (!response.ok) throw new Error("Unable to load the category API (" + response.status + ").");
 return response.json();
}
export const getServices = cache(async () => (await read<{services: Service[]}>("/services")).services);
export const getService = cache(async (slug: string) => (await getServices()).find(service => service.slug === slug));
export const getGallery = (slug: string) => read<GalleryPage>("/services/" + encodeURIComponent(slug) + "/media?page=1");
export async function getHeroSlides() {
 const response = await fetch(base + "/api/catalog/hero", { cache: "no-store", signal: AbortSignal.timeout(10000) });
 if (!response.ok) throw new Error("Unable to load the slideshow.");
 return (await response.json() as {slides: HeroSlide[]}).slides;
}
