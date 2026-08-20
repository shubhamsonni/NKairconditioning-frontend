import Link from "next/link";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import ReviewExperience from "./ReviewExperience";
export default function Footer(){return <><ReviewExperience/><footer className="footer"><div className="container footer-grid">
  <div><div className="footer-brand">N K AIRCONDITIONING</div><p>Professional air conditioning repair, installation, gas filling and maintenance for homes and businesses across Gurugram.</p></div>
  <div><h3>Quick links</h3><Link href="/about">About us</Link><Link href="/services">All services</Link><Link href="/rental">Rental AC service</Link><Link href="/locations/manesar">AC service Manesar</Link><Link href="/locations/bilaspur">AC service Bilaspur</Link><Link href="/locations/badshahpur">AC service Badshahpur</Link></div>
  <div><h3>Contact</h3><a href="tel:+919466980984"><Phone size={16}/> +91 94669 80984</a><a href="mailto:nkairconditioning94@gmail.com"><Mail size={16}/> nkairconditioning94@gmail.com</a><span><MapPin size={16}/> Shop 02, Sector 86, Gurugram</span><span><Clock3 size={16}/> Open daily, 24/7 calls</span></div>
  </div><div className="container copyright">© {new Date().getFullYear()} N K Airconditioning. All rights reserved.</div></footer></>}
