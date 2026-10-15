export type Service = { slug: string; name: string; short: string; description: string; image: string; mediaCount: number; seoTitle: string; seoDescription: string; overview: string; tasks: string[] };
export type HeroSlide = { image: string; eyebrow: string; title: string; text: string };
export type GalleryPage = { items: {src: string; type: "image" | "video"}[]; page: number; pageSize: number; total: number; totalPages: number };
