import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";

/* ─── Footer Data (PLACEHOLDER: Replace with real DigitalGhuru data) ─── */
const locations = [
  {
    name: "Chennai Campus",
    address: "123 Anna Salai, Teynampet, Chennai, Tamil Nadu 600018",
    phone: "+91 98765 43210",
  },
  /* PLACEHOLDER: Add more campus locations as needed */
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Institute", href: "/about-us" },
  { label: "Our Courses", href: "/courses/digital-marketing-chennai" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
  { label: "Cancellation & Refund Policy", href: "/refund-policy" },
];

const courseLinks = [
  { label: "Digital Marketing Course — Chennai", href: "/courses/digital-marketing-chennai" },
  { label: "Online Digital Marketing Course", href: "/courses/online-digital-marketing" },
  { label: "Advanced Digital Marketing Program", href: "/courses/advanced-program" },
  { label: "Short-term Courses", href: "/courses/short-term" },
];

/* PLACEHOLDER: Replace with real DigitalGhuru social media URLs */
const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/digitalghuru", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/digitalghuru", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/digitalghuru", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/digitalghuru", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com/@digitalghuru", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-white">
      {/* ── Main Grid ── */}
      <div className="section-container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* ── Column 1: Locations ── */}
          <div>
            <h4 className="font-heading text-lg font-bold text-white mb-6">
              Our Campus
            </h4>
            <div className="space-y-6">
              {locations.map((loc) => (
                <div key={loc.name} className="space-y-2">
                  <h5 className="font-heading font-semibold text-white text-sm">
                    {loc.name}
                  </h5>
                  <div className="flex items-start gap-2 text-white/70 text-sm">
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{loc.address}</span>
                  </div>
                  <a
                    href={`tel:${loc.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 text-white/70 text-sm hover:text-brand-gold transition-colors duration-200"
                  >
                    <Phone className="h-4 w-4 shrink-0" />
                    <span>{loc.phone}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* ── Column 2: Quick Links ── */}
          <div>
            <h4 className="font-heading text-lg font-bold text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-brand-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Course Links ── */}
          <div>
            <h4 className="font-heading text-lg font-bold text-white mb-6">
              Our Courses
            </h4>
            <ul className="space-y-3">
              {courseLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-brand-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 4: About + Social ── */}
          <div>
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0 mb-4">
              <img
                src="/logo-final dG.webp"
                alt="DigitalGhuru Logo"
                className="h-16 w-auto object-contain"
              />
            </Link>

            {/* PLACEHOLDER: Replace with real DigitalGhuru description */}
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              DigitalGhuru is a premier digital marketing institute offering
              industry-leading courses with hands-on training, expert mentors,
              and dedicated placement support for every student.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:bg-brand-blue hover:text-white transition-all duration-200"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/10">
        <div className="section-container py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} DigitalGhuru. All rights reserved.
          </p>
          {/* PLACEHOLDER: Optional credit line */}
          <p className="text-sm text-white/40">
            Crafted with passion for digital excellence
          </p>
        </div>
      </div>
    </footer>
  );
}
