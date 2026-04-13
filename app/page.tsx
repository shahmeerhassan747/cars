import Link from "next/link";
import { Shield, Award, Wrench, HeadphonesIcon, ChevronRight, Star, Fuel, Users } from "lucide-react";
import HeroText from "@/components/HeroText";
import FeaturedVehicles from "@/components/FeaturedVehicles";

const stats = [
  { value: "500+", label: "Cars in Stock" },
  { value: "12K+", label: "Happy Customers" },
  { value: "25+", label: "Years Experience" },
  { value: "50+", label: "Brand Partners" },
];

const features = [
  { icon: Shield, title: "Certified Quality", desc: "Every vehicle passes our 150-point inspection before hitting the showroom floor." },
  { icon: Award, title: "Award Winning", desc: "Recognized as the #1 car dealership in the region for 5 consecutive years." },
  { icon: Wrench, title: "Expert Service", desc: "Our certified technicians keep your vehicle in peak condition year-round." },
  { icon: HeadphonesIcon, title: "24/7 Support", desc: "Our team is always available to assist you before and after your purchase." },
];

const testimonials = [
  { name: "James Carter", role: "Business Executive", rating: 5, text: "AutoElite made buying my dream car effortless. The team was professional and the process was seamless." },
  { name: "Sarah Mitchell", role: "Entrepreneur", rating: 5, text: "Incredible selection and transparent pricing. I drove away in my new SUV the same day. Highly recommend!" },
  { name: "David Nguyen", role: "Engineer", rating: 5, text: "The test drive experience was phenomenal. Staff really knows their cars inside and out." },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(135deg,rgba(5,10,20,0.55) 0%,rgba(5,10,20,0.25) 60%,rgba(10,22,40,0.45) 100%)" }} />
        <div className="orb w-96 h-96 z-0" style={{ background: "var(--orb-1)", top: "10%", left: "5%" }} />
        <div className="orb w-72 h-72 z-0" style={{ background: "var(--orb-2)", bottom: "15%", right: "8%", animationDelay: "3s" }} />
        {/* Brand intro */}
        <div className="brand-intro absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none select-none">
          <div className="brand-intro-logo">
            <img src="/logo.png" alt="" className="w-24 h-24 object-contain mx-auto mb-4 drop-shadow-2xl" />
          </div>
          <div className="brand-intro-text text-center">
            <span className="block text-5xl md:text-7xl font-extrabold tracking-[0.15em] text-white drop-shadow-2xl">
              AUTO<span style={{ background: "linear-gradient(135deg,#60a5fa,#a78bfa,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>ELITE</span>
            </span>
            <span className="block text-xs tracking-[0.5em] uppercase text-blue-300 mt-2 opacity-80">Premium Motors</span>
          </div>
        </div>
        <div className="container relative z-10 py-24">
          <HeroText />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 z-10" style={{ background: "linear-gradient(to top,var(--bg-base),transparent)" }} />
      </section>

      {/* Stats */}
      <section className="py-12 relative z-10">
        <div className="container">
          <div className="glass glass-border rounded-2xl px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="skeu-stat rounded-xl p-5 text-center space-y-1">
                <p className="text-4xl font-extrabold text-gradient">{s.value}</p>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicles — live from API */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-14">
            <div className="section-label shimmer mb-4">Featured Vehicles</div>
            <h2 className="text-4xl font-bold" style={{ color: "var(--text-primary)" }}>Our Top Picks</h2>
            <p className="mt-3 max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>Handpicked vehicles that combine performance, luxury, and value.</p>
          </div>
          <FeaturedVehicles />
          <div className="text-center mt-10">
            <Link href="/vehicles" className="btn-glass inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold">
              View All Vehicles <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 relative">
        <div className="orb w-80 h-80 top-0 right-0" style={{ background: "var(--orb-2)" }} />
        <div className="container relative z-10">
          <div className="text-center mb-14">
            <div className="section-label mb-4">Why AutoElite</div>
            <h2 className="text-4xl font-bold" style={{ color: "var(--text-primary)" }}>The AutoElite Difference</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass glass-border glass-hover rounded-2xl p-6 text-center space-y-4">
                <div className="skeu-icon-wrap mx-auto w-14 h-14 rounded-2xl flex items-center justify-center">
                  <Icon className="h-6 w-6 text-blue-400 relative z-10" />
                </div>
                <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-14">
            <div className="section-label mb-4">Testimonials</div>
            <h2 className="text-4xl font-bold" style={{ color: "var(--text-primary)" }}>What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="skeu-card glass-border rounded-2xl p-6 space-y-4">
                <div className="skeu-inset inline-flex gap-1 px-3 py-1.5 rounded-lg">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="italic leading-relaxed text-sm" style={{ color: "var(--text-secondary)" }}>"{t.text}"</p>
                <div className="pt-2" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                  <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="orb w-96 h-96 -top-20 left-1/2 -translate-x-1/2" style={{ background: "var(--orb-1)" }} />
        <div className="container relative z-10">
          <div className="glass-strong glass-border rounded-3xl px-8 py-16 text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl font-bold" style={{ color: "var(--text-primary)" }}>Ready to Find Your Perfect Car?</h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>Visit our showroom or book a test drive today.</p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link href="/vehicles" className="btn-primary-glow px-8 py-3 rounded-xl font-semibold text-sm">Explore Inventory</Link>
              <Link href="/contact" className="btn-glass px-8 py-3 rounded-xl font-semibold text-sm">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
