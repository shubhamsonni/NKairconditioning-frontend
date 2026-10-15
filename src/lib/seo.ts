import type { Metadata } from "next";

export const siteUrl = (process.env.SITE_URL ?? "https://nkairconditioning.com").replace(/\/$/, "");
export const businessId = `${siteUrl}/#business`;
export const absoluteUrl = (path: string) => new URL(path, `${siteUrl}/`).toString();

export function pageMetadata(title: string, description: string, path: string, image = "/og.png"): Metadata {
  return {
    title, description, alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: "N K Airconditioning", locale: "en_IN", type: "website", images: [{url: image, alt: title}] },
    twitter: {card: "summary_large_image", title, description, images: [image]},
  };
}

export function breadcrumbData(items: {name: string; path: string}[]) {
  return {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({"@type": "ListItem", position: index + 1, name: item.name, item: absoluteUrl(item.path)})),
  };
}

export function serviceData(name: string, description: string, path: string, image?: string) {
  return {
    "@context": "https://schema.org", "@type": "Service", "@id": `${absoluteUrl(path)}#service`,
    name, description, url: absoluteUrl(path), ...(image ? {image: absoluteUrl(image)} : {}),
    provider: {"@id": businessId}, areaServed: {"@type": "City", name: "Gurugram"},
  };
}
