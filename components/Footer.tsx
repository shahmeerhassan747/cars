"use client";

import Link from "next/link";
import { Car, MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube, ArrowUpRight, Sparkles } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const services = ["New Cars", "Used Cars", "Car Financing", "Trade-In", "Test Drive", "After Sales"];

const socials = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: "var(--footer-bg)", color: "var(--text-secondary)" }}>

      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-700/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-0 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl" />

      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

      {/* Main content */}
      <div className="container relative z-10 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">

        {/* Brand col */}
        <div className="md:col-span-4 space-y-6">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 group-hover:bg-blue-600/40 transition-all duration-300">
              <Car className="h-5 w-5 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            </div>
            <span className="text-xl font-bold text-white tracking-wide">Auto<span className="text-blue-400">Elite</span></span>
          </Link>

          <p className="text-sm leading-relaxed text-slate-500 max-w-xs">
            Your premier destination for luxury and performance vehicles. Experience the road like never before.
          </p>

          {/* Tagline pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-xs text-blue-400">
            <Sparkles className="h-3 w-3 animate-pulse" />
            Premium Certified Dealership
          </div>

          {/* Social icons */}
          <div className="flex gap-3 pt-1">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="group relative flex items-center justify-center w-9 h-9 rounded-lg border border-slate-700/60 bg-slate-800/40 hover:border-blue-500/60 hover:bg-blue-600/20 transition-all duration-300 overflow-hidden"
              >
                <span className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-all duration-300" />
                <Icon className="h-4 w-4 text-slate-400 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2 space-y-5">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-300">Quick Links</h4>
          <ul className="space-y-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition-colors duration-200"
                >
                  <span className="w-0 group-hover:w-3 h-px bg-blue-400 transition-all duration-300 rounded-full" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="md:col-span-2 space-y-5">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-300">Services</h4>
          <ul className="space-y-3">
            {services.map((s) => (
              <li key={s}>
                <span className="group flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition-colors duration-200 cursor-pointer">
                  <span className="w-0 group-hover:w-3 h-px bg-blue-400 transition-all duration-300 rounded-full" />
                  {s}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="md:col-span-4 space-y-5">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-300">Contact Us</h4>
          <ul className="space-y-4">
            {[
              {
                icon: MapPin,
                content: "123 AutoElite Blvd, Motor City, CA 90210",
                href: "#",
              },
              {
                icon: Phone,
                content: "+1 (234) 567-890",
                href: "tel:+1234567890",
              },
              {
                icon: Mail,
                content: "info@autoelite.com",
                href: "mailto:info@autoelite.com",
              },
            ].map(({ icon: Icon, content, href }) => (
              <li key={content}>
                <a
                  href={href}
                  className="group flex items-start gap-3 text-sm text-slate-500 hover:text-white transition-colors duration-200"
                >
                  <span className="mt-0.5 flex items-center justify-center w-7 h-7 rounded-md border border-slate-700/60 bg-slate-800/40 group-hover:border-blue-500/50 group-hover:bg-blue-600/10 transition-all duration-300 shrink-0">
                    <Icon className="h-3.5 w-3.5 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  </span>
                  {content}
                </a>
              </li>
            ))}
          </ul>

          {/* Newsletter mini */}
          <div className="mt-6 p-4 rounded-xl border border-slate-700/40 bg-slate-800/20 space-y-3">
            <p className="text-xs font-medium text-slate-300">Get exclusive deals in your inbox</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 h-8 rounded-md bg-slate-800/60 border border-slate-700/60 px-3 text-xs text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/60 transition-colors"
              />
              <button className="group flex items-center justify-center w-8 h-8 rounded-md bg-blue-600 hover:bg-blue-500 transition-colors duration-200 shrink-0">
                <ArrowUpRight className="h-4 w-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />

      {/* Bottom bar */}
      <div className="container relative z-10 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-xs text-slate-600">© 2026 <span className="text-slate-400">AutoElite</span>. All rights reserved.</p>
        <div className="flex items-center gap-1 text-xs text-slate-600">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          All systems operational
        </div>
        <div className="flex gap-5 text-xs text-slate-600">
          <Link href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-slate-300 transition-colors">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
}
