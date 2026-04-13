"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, Phone, X, Gauge, Tag, Info, Mail, Home, ChevronRight, ShoppingCart, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  {
    href: "/",
    label: "Home",
    icon: Home,
    desc: "Back to start",
    preview: {
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=80",
      title: "Welcome to AutoElite",
      summary: "Discover our premium car showroom — luxury vehicles, transparent pricing, and an unmatched buying experience.",
      links: [
        { label: "Featured Vehicles", href: "/vehicles" },
        { label: "Book Test Drive", href: "/contact" },
        { label: "View Pricing", href: "/pricing" },
      ],
    },
  },
  {
    href: "/vehicles",
    label: "Vehicles",
    icon: Car,
    desc: "Browse our fleet",
    preview: {
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80",
      title: "Our Vehicle Inventory",
      summary: "500+ premium cars in stock — from performance sedans to luxury SUVs and electric vehicles.",
      links: [
        { label: "Sedans & Sports", href: "/vehicles" },
        { label: "SUVs & Crossovers", href: "/vehicles" },
        { label: "Electric Vehicles", href: "/vehicles" },
      ],
    },
  },
  {
    href: "/pricing",
    label: "Pricing",
    icon: Tag,
    desc: "Plans & financing",
    preview: {
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80",
      title: "Transparent Pricing",
      summary: "No hidden fees. Choose from Standard, Premium, or Elite plans with flexible financing options.",
      links: [
        { label: "Standard Plan — $299/mo", href: "/pricing" },
        { label: "Premium Plan — $599/mo", href: "/pricing" },
        { label: "Elite Plan — $999/mo", href: "/pricing" },
      ],
    },
  },
  {
    href: "/about",
    label: "About Us",
    icon: Info,
    desc: "Our story & team",
    preview: {
      image: "https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=400&q=80",
      title: "25 Years of Excellence",
      summary: "Founded in 2001, AutoElite has grown to become the region's most trusted premium car dealership.",
      links: [
        { label: "Our Story", href: "/about" },
        { label: "Meet the Team", href: "/about" },
        { label: "Awards & Recognition", href: "/about" },
      ],
    },
  },
  {
    href: "/contact",
    label: "Contact",
    icon: Mail,
    desc: "Get in touch",
    preview: {
      image: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=400&q=80",
      title: "We're Here to Help",
      summary: "Visit our showroom, book a test drive, or speak to a finance expert — we're available 7 days a week.",
      links: [
        { label: "Book a Test Drive", href: "/contact" },
        { label: "Call +1 (234) 567-890", href: "tel:+1234567890" },
        { label: "Find Our Showroom", href: "/contact" },
      ],
    },
  },
];

export default function Navbar() {
  const [open, setOpen]           = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [hidden, setHidden]        = useState(false);
  const [hovered, setHovered]      = useState<string | null>(null);
  const [dropdownX, setDropdownX]  = useState(0);
  const navRef     = useRef<HTMLDivElement>(null);
  const lastY      = useRef(0);
  const pathname   = usePathname();

  /* scroll detection — hide on down, show on up */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (y < 60) { setHidden(false); lastY.current = y; return; }
      if (y > lastY.current + 6)  setHidden(true);   // scrolling down
      if (y < lastY.current - 6)  setHidden(false);  // scrolling up
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close mobile on route change */
  useEffect(() => { setOpen(false); }, [pathname]);

  function handleMouseLeave() {
    setHovered(null);
  }

  function handleNavMouseEnter(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    setDropdownX(rect.left + rect.width / 2);
    setHovered(href);
  }

  return (
    <>
      {/* ── DESKTOP NAVBAR ── */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "py-2" : "py-4",
          hidden ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
        )}
      >
        <div className="container">
          <div
            className={cn(
              "relative flex items-center justify-between px-4 transition-all duration-500",
              scrolled
                ? "rounded-2xl h-14 px-5"
                : "rounded-3xl h-16 px-6"
            )}
            style={{
              background: scrolled
                ? "var(--bg-nav)"
                : "rgba(0,0,0,0.35)",
              backdropFilter: scrolled ? "blur(28px) saturate(200%)" : "blur(8px)",
              WebkitBackdropFilter: scrolled ? "blur(28px) saturate(200%)" : "blur(8px)",
              border: scrolled ? "1px solid var(--border-subtle)" : "1px solid rgba(255,255,255,0.08)",
              boxShadow: scrolled
                ? "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 var(--skeu-shine)"
                : "none",
            }}
          >
            {/* Animated top-edge glow line */}
            <div
              className="absolute top-0 left-8 right-8 h-px rounded-full pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.6), rgba(139,92,246,0.4), transparent)",
                opacity: scrolled ? 1 : 0.5,
                transition: "opacity 0.4s",
              }}
            />

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              {/* Logo image with spinning ring overlay */}
              <div className="relative w-11 h-11 shrink-0">
                {/* spinning dashed ring */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ animation: "spinRing 8s linear infinite" }}
                  viewBox="0 0 44 44"
                >
                  <circle cx="22" cy="22" r="20" fill="none" stroke="url(#ringGrad2)" strokeWidth="1.2" strokeDasharray="5 4" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="ringGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* logo image inside */}
                <div
                  className="absolute inset-1.5 rounded-full overflow-hidden"
                  style={{
                    boxShadow: "var(--skeu-raised), 0 0 12px rgba(59,130,246,0.25)",
                    border: "1px solid var(--skeu-border)",
                  }}
                >
                  <img
                    src="/logo.png"
                    alt="AutoElite Logo"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                {/* pulse dot */}
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-blue-500 animate-pulse z-10" />
              </div>

              <div className="flex flex-col leading-none">
                <span className="text-base font-extrabold tracking-wider" style={{ color: scrolled ? "var(--text-primary)" : "#fff", textShadow: scrolled ? "none" : "0 1px 8px rgba(0,0,0,0.6)" }}>
                  AUTO<span className="text-gradient">ELITE</span>
                </span>
                <span className="text-[9px] tracking-[0.25em] uppercase" style={{ color: scrolled ? "var(--text-muted)" : "rgba(255,255,255,0.6)" }}>
                  Premium Motors
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav
              ref={navRef}
              className="hidden md:flex items-center gap-1 relative"
              onMouseLeave={handleMouseLeave}
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={(e) => handleNavMouseEnter(e, link.href)}
                    className="relative px-4 py-2 text-sm font-semibold transition-colors duration-150"
                    style={{
                      color: isActive ? "#fff" : scrolled ? "var(--text-primary)" : "#fff",
                      textShadow: scrolled ? "none" : "0 1px 8px rgba(0,0,0,0.8)",
                    }}
                  >
                    {link.label}
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300"
                      style={{
                        width: isActive ? "60%" : "0%",
                        background: "linear-gradient(90deg, #60a5fa, #a78bfa)",
                      }}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* ── Right side ── */}
            <div className="hidden md:flex items-center gap-1.5 shrink-0">

              {/* Phone */}
              <a href="tel:+1234567890"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200"
                style={{ background: "rgba(59,130,246,0.12)", color: "#93c5fd", border: "1px solid rgba(59,130,246,0.25)", textShadow: "none" }}
              >
                <Phone className="h-3.5 w-3.5" />
                <span className="hidden lg:block">+1 (234) 567-890</span>
              </a>

              <ThemeToggle />

              {/* Wishlist */}
              <Link href="/wishlist" aria-label="Wishlist"
                className="relative flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 hover:opacity-80"
                style={{ background: "rgba(244,63,94,0.15)", border: "1px solid rgba(244,63,94,0.3)", color: "#fb7185" }}
              >
                <Heart className="h-4 w-4 fill-current" />
                <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">3</span>
              </Link>

              {/* Cart */}
              <Link href="/cart" aria-label="Cart"
                className="relative flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 hover:opacity-80"
                style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)", color: "#60a5fa" }}
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-blue-500 text-white text-[9px] font-bold flex items-center justify-center">2</span>
              </Link>

              {/* Profile */}
              <Link href="/profile" aria-label="Profile"
                className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 hover:opacity-80"
                style={{ background: "rgba(148,163,184,0.12)", border: "1px solid rgba(148,163,184,0.25)", color: "#94a3b8" }}
              >
                <User className="h-4 w-4" />
              </Link>

              {/* CTA */}
              <Link href="/contact"
                className="btn-primary-glow flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold ml-1"
              >
                <Gauge className="h-3.5 w-3.5" />
                Test Drive
              </Link>
            </div>

            {/* ── Mobile right ── */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                className="relative w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-xl transition-all"
                style={{
                  background: "var(--skeu-metal)",
                  boxShadow: open ? "var(--skeu-pressed)" : "var(--skeu-raised)",
                  border: "1px solid var(--skeu-border)",
                }}
              >
                <span
                  className="block h-px w-4 rounded-full transition-all duration-300 origin-center"
                  style={{
                    background: "var(--text-secondary)",
                    transform: open ? "translateY(3px) rotate(45deg)" : "none",
                  }}
                />
                <span
                  className="block h-px rounded-full transition-all duration-300"
                  style={{
                    background: "var(--text-secondary)",
                    width: open ? "0" : "1rem",
                    opacity: open ? 0 : 1,
                  }}
                />
                <span
                  className="block h-px w-4 rounded-full transition-all duration-300 origin-center"
                  style={{
                    background: "var(--text-secondary)",
                    transform: open ? "translateY(-3px) rotate(-45deg)" : "none",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── HOVER DROPDOWN (desktop) ── */}
      {hovered && (() => {
        const link = navLinks.find((l) => l.href === hovered);
        if (!link) return null;
        const p = link.preview;
        const left = Math.max(180, Math.min(dropdownX, (typeof window !== "undefined" ? window.innerWidth : 1200) - 180));
        return (
          <div
            className="fixed z-40 hidden md:block"
            style={{ top: scrolled ? "70px" : "82px", left, transform: "translateX(-50%)" }}
            onMouseEnter={() => setHovered(hovered)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="flex justify-center mb-1">
              <div className="w-3 h-3 rotate-45 rounded-sm"
                style={{ background: "var(--bg-surface-2)", border: "1px solid var(--border-subtle)", borderBottom: "none", borderRight: "none" }} />
            </div>
            <div className="glass-strong glass-border rounded-2xl overflow-hidden animate-dropdownIn"
              style={{ width: 320, boxShadow: "0 20px 60px rgba(0,0,0,0.45)" }}>
              <div className="relative h-36 overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover img-zoom-hover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <div className="skeu-icon-wrap w-7 h-7 rounded-lg flex items-center justify-center">
                    <link.icon className="h-3.5 w-3.5 text-blue-400 relative z-10" />
                  </div>
                  <span className="text-white font-bold text-sm">{p.title}</span>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{p.summary}</p>
                <div className="skeu-divider" />
                <ul className="space-y-1">
                  {p.links.map((ql) => (
                    <li key={ql.label}>
                      <Link href={ql.href} onClick={() => setHovered(null)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all hover:bg-blue-500/10 group/ql"
                        style={{ color: "var(--text-secondary)" }}>
                        <span className="group-hover/ql:text-blue-400 transition-colors">{ql.label}</span>
                        <ChevronRight className="h-3 w-3 opacity-0 group-hover/ql:opacity-100 text-blue-400 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={link.href} onClick={() => setHovered(null)}
                  className="btn-primary-glow flex items-center justify-center gap-1.5 w-full py-2 rounded-xl text-xs font-bold">
                  Go to {link.label}
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── MOBILE FULLSCREEN MENU ── */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-400",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{
          background: "var(--bg-nav-mobile)",
          backdropFilter: "blur(32px) saturate(200%)",
          WebkitBackdropFilter: "blur(32px) saturate(200%)",
        }}
      >
        {/* close button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-5 right-5 w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "var(--skeu-metal)", boxShadow: "var(--skeu-raised)", border: "1px solid var(--skeu-border)" }}
        >
          <X className="h-4 w-4" style={{ color: "var(--text-secondary)" }} />
        </button>

        {/* Logo in mobile menu */}
        <div className="px-8 pt-20 pb-8 flex items-center gap-3" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
          <div className="relative w-12 h-12 shrink-0">
            <div className="absolute inset-0 rounded-full overflow-hidden" style={{ boxShadow: "var(--skeu-raised)", border: "1px solid var(--skeu-border)" }}>
              <img src="/logo.png" alt="AutoElite Logo" className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-extrabold tracking-wider" style={{ color: "var(--text-primary)" }}>
              AUTO<span className="text-gradient">ELITE</span>
            </span>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Premium Motors</p>
          </div>
        </div>

        {/* Links */}
        <nav className="px-6 pt-6 space-y-2">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200",
                  isActive ? "glass-border" : "hover:bg-white/5"
                )}
                style={{
                  background: isActive ? "rgba(59,130,246,0.08)" : "transparent",
                  animationDelay: `${i * 60}ms`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{
                      background: isActive ? "rgba(59,130,246,0.15)" : "var(--skeu-metal)",
                      boxShadow: "var(--skeu-raised)",
                      border: "1px solid var(--skeu-border)",
                    }}
                  >
                    <link.icon className={cn("h-3.5 w-3.5", isActive ? "text-blue-400" : "text-[var(--text-muted)]")} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: isActive ? "var(--text-accent)" : "var(--text-primary)" }}>
                      {link.label}
                    </p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{link.desc}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
              </Link>
            );
          })}
        </nav>

        {/* Bottom CTA */}
        <div className="absolute bottom-10 left-6 right-6">
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="btn-primary-glow flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-bold text-sm"
          >
            <Gauge className="h-4 w-4" />
            Book a Test Drive
            <ChevronRight className="h-4 w-4 opacity-70" />
          </Link>
        </div>
      </div>

      {/* Spacer so content doesn't hide under fixed navbar */}
      <div className="h-24" />

      <style jsx global>{`
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.15s ease-out forwards;
        }
      `}</style>
    </>
  );
}
