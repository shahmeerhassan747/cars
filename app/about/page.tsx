import Image from "next/image";
import Link from "next/link";
import { Target, Eye, Heart, Trophy, Users, Car } from "lucide-react";

const team = [
  { name: "Michael Reynolds", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80", bio: "25+ years in the automotive industry." },
  { name: "Sarah Johnson", role: "Head of Sales", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80", bio: "A passionate car enthusiast with a decade of experience." },
  { name: "David Park", role: "Chief Mechanic", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80", bio: "Certified master technician ensuring quality standards." },
  { name: "Emily Chen", role: "Finance Director", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80", bio: "Expert in automotive financing and payment plans." },
];

const values = [
  { icon: Target, title: "Our Mission", desc: "To provide an exceptional car buying experience through transparency, quality, and personalized service." },
  { icon: Eye, title: "Our Vision", desc: "To be the most trusted automotive dealership, setting the standard for excellence." },
  { icon: Heart, title: "Our Values", desc: "Integrity, customer-first mindset, and a passion for automobiles drive everything we do." },
];

const milestones = [
  { year: "2001", event: "AutoElite founded with a small showroom of 20 vehicles" },
  { year: "2008", event: "Expanded to 3 locations across the state" },
  { year: "2015", event: "Reached 5,000 satisfied customers milestone" },
  { year: "2019", event: "Launched online vehicle browsing and financing platform" },
  { year: "2022", event: "Introduced electric vehicle dedicated showroom wing" },
  { year: "2026", event: "Serving 12,000+ customers with 500+ vehicles in stock" },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative py-24 overflow-hidden text-center">
        <div className="orb w-96 h-96 top-0 left-1/2 -translate-x-1/2" style={{ background: "var(--orb-1)" }} />
        <div className="container relative z-10 space-y-5">
          <div className="section-label shimmer mx-auto w-fit"><span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />About AutoElite</div>
          <h1 className="text-5xl md:text-6xl font-extrabold" style={{ color: "var(--text-primary)" }}>Our Story</h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>For over 25 years, AutoElite has been the trusted name in premium automotive retail.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div className="space-y-6">
            <span className="section-label text-xs">Est. 2001</span>
            <h2 className="text-4xl font-bold" style={{ color: "var(--text-primary)" }}>Built on Trust, Driven by Passion</h2>
            <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>AutoElite was born from a simple belief: buying a car should be an exciting, stress-free experience. Our founder Michael Reynolds started with a small lot and a big dream.</p>
            <div className="grid grid-cols-3 gap-4 pt-2">
              {[{ icon: Trophy, value: "5x", label: "Award Winner" }, { icon: Users, value: "12K+", label: "Customers" }, { icon: Car, value: "500+", label: "In Stock" }].map(({ icon: Icon, value, label }) => (
                <div key={label} className="skeu-stat rounded-xl p-4 text-center space-y-1">
                  <Icon className="h-5 w-5 text-blue-400 mx-auto relative z-10" />
                  <p className="text-2xl font-bold text-gradient">{value}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden glass-border img-spotlight-wrap img-tilt-wrap">
            <Image src="https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=800&q=80" alt="AutoElite Showroom" fill className="object-cover img-showroom img-tilt" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top,var(--bg-base) 0%,transparent 50%)" }} />
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="orb w-80 h-80 top-0 right-0" style={{ background: "var(--orb-2)" }} />
        <div className="container relative z-10">
          <div className="text-center mb-14">
            <div className="section-label mx-auto w-fit mb-4">What We Stand For</div>
            <h2 className="text-4xl font-bold" style={{ color: "var(--text-primary)" }}>Mission, Vision & Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass glass-border glass-hover rounded-2xl p-8 text-center space-y-4">
                <div className="skeu-icon-wrap mx-auto w-14 h-14 rounded-2xl flex items-center justify-center">
                  <Icon className="h-7 w-7 text-blue-400 relative z-10" />
                </div>
                <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-3xl">
          <div className="text-center mb-14">
            <div className="section-label mx-auto w-fit mb-4">Our Journey</div>
            <h2 className="text-4xl font-bold" style={{ color: "var(--text-primary)" }}>25 Years of Excellence</h2>
          </div>
          <div className="relative pl-8 space-y-5" style={{ borderLeft: "2px solid var(--border-accent)" }}>
            {milestones.map((m) => (
              <div key={m.year} className="relative skeu-card glass-border rounded-xl p-5 ml-4">
                <div className="absolute -left-[2.4rem] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 shadow-lg" style={{ borderColor: "var(--bg-base)", boxShadow: "0 0 10px rgba(59,130,246,0.5)" }} />
                <p className="text-blue-400 font-bold text-sm">{m.year}</p>
                <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="orb w-72 h-72 bottom-0 left-0" style={{ background: "var(--orb-1)" }} />
        <div className="container relative z-10">
          <div className="text-center mb-14">
            <div className="section-label mx-auto w-fit mb-4">Our Team</div>
            <h2 className="text-4xl font-bold" style={{ color: "var(--text-primary)" }}>Meet the Experts</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={member.name} className="glass glass-border glass-hover rounded-2xl overflow-hidden text-center group">
                <div className={`relative h-56 overflow-hidden ${i % 2 === 0 ? "img-spotlight-wrap" : "img-vignette"}`}>
                  <Image src={member.image} alt={member.name} fill className="object-cover object-top img-desat" />
                  <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.45),transparent)" }} />
                </div>
                <div className="p-5 space-y-1.5" style={{ background: "var(--bg-surface)" }}>
                  <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>{member.name}</h3>
                  <p className="text-blue-400 text-sm font-medium">{member.role}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="orb w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ background: "var(--orb-1)" }} />
        <div className="container relative z-10">
          <div className="glass-strong glass-border rounded-3xl px-8 py-14 text-center max-w-2xl mx-auto space-y-5">
            <h2 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>Come Visit Our Showroom</h2>
            <p style={{ color: "var(--text-secondary)" }}>Experience the AutoElite difference in person.</p>
            <Link href="/contact" className="btn-primary-glow inline-block px-8 py-3 rounded-xl font-semibold text-sm">Get in Touch</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
