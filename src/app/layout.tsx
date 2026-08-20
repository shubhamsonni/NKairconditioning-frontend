import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nkairconditioning.com"),
  title: { default: "N K Airconditioning | AC Repair in Gurugram", template: "%s | N K Airconditioning" },
  description: "Trusted AC repair, installation, gas filling, rental and commercial cooling services in Gurugram. Call N K Airconditioning for fast service.",
  keywords: ["AC repair Gurugram","AC service Gurgaon","AC installation","AC gas filling","VRV AC repair","AC rental"],
  alternates: { canonical: "/" },
  openGraph: { title: "N K Airconditioning", description: "Professional AC repair and installation in Gurugram.", type: "website", locale: "en_IN", images: [{ url: "/og.png", width: 1200, height: 630, alt: "N K Airconditioning AC repair and installation" }] },
  twitter: { card: "summary_large_image", title: "N K Airconditioning", description: "Professional AC repair and installation in Gurugram.", images: ["/og.png"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const localBusiness={"@context":"https://schema.org","@type":"HVACBusiness","name":"N K Airconditioning","telephone":"+91-94669-80984","email":"nkairconditioning94@gmail.com","address":{"@type":"PostalAddress","streetAddress":"Shop 02, Sector 86","addressLocality":"Gurugram","addressRegion":"Haryana","addressCountry":"IN"},"areaServed":["Bilaspur","Tauru","Jamalpur","Manesar","Wazirpur","Hayatpur","Gurgaon Sectors 81-89","Gurgaon Sectors 96-118","Badshahpur"],"priceRange":"₹₹","url":"https://nkairconditioning.com"};
  return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(localBusiness)}}/>{children}</body></html>;
}
