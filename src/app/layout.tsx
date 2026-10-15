import StructuredData from "@/components/StructuredData";
import { siteUrl, businessId, absoluteUrl } from "@/lib/seo";
import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "N K Airconditioning | AC Repair in Gurugram", template: "%s | N K Airconditioning" },
  description: "Trusted AC repair, installation, gas filling, rental and commercial cooling services in Gurugram. Call N K Airconditioning for fast service.",
  keywords: ["AC repair Gurugram","AC service Gurgaon","AC installation","AC gas filling","VRV AC repair","AC rental"],
  openGraph: { title: "N K Airconditioning", description: "Professional AC repair and installation in Gurugram.", type: "website", locale: "en_IN", images: [{ url: "/og.png", width: 1200, height: 630, alt: "N K Airconditioning AC repair and installation" }] },
  twitter: { card: "summary_large_image", title: "N K Airconditioning", description: "Professional AC repair and installation in Gurugram.", images: ["/og.png"] },
  robots: { index: true, follow: true, googleBot: {index:true,follow:true,"max-image-preview":"large","max-snippet":-1,"max-video-preview":-1} },
  verification: process.env.GOOGLE_SITE_VERIFICATION ? {google:process.env.GOOGLE_SITE_VERIFICATION} : undefined,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const localBusiness={"@context":"https://schema.org","@type":"HVACBusiness","@id":businessId,"name":"N K Airconditioning","telephone":"+91-94669-80984","email":"nkairconditioning94@gmail.com","image":absoluteUrl("/work/shop/shop.webp"),"address":{"@type":"PostalAddress","streetAddress":"Shop 02, Sector 86","addressLocality":"Gurugram","addressRegion":"Haryana","addressCountry":"IN"},"areaServed":["Gurugram","Manesar","Bilaspur","Tauru","Jamalpur","Wazirpur","Hayatpur","Badshahpur"],"url":siteUrl};
  const website={"@context":"https://schema.org","@type":"WebSite","@id":siteUrl+"/#website",url:siteUrl,name:"N K Airconditioning",inLanguage:"en-IN",publisher:{"@id":businessId}};
  return <html lang="en-IN"><body><StructuredData data={[localBusiness,website]}/>{children}</body></html>;

}
