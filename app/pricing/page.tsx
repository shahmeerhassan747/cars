import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";

const plans = [
  { name: "Standard", price: "$299", period: "/month", description: "Perfect for everyday drivers.", badge: null, highlight: false, cta: "Get Started",
    features: [{ text: "Economy & Compact cars", included: true }, { text: "Basic warranty (1 year)", included: true }, { text: "Roadside assistance", included: true }, { text: "Free first service", included: true }, { text: "Priority test drives", included: false }, { text: "Dedicated account manager", included: false }, { text: "Extended warranty", included: false }] },
  { name: "Premium", price: "$599", period: "/month", description: "For performance and luxury drivers.", badge: "Most Popular", highlight: true, cta: "Get Premium",
    features: [{ text: "All vehicle categories", included: true }, { text: "Extended warranty (3 years)", included: true }, { text: "24/7 roadside assistance", included: true }, { text: "Free first 3 services", included: true }, { text: "Priority test drives", included: true }, { text: "Dedicated account manager", included: true }, { text: "Concierge delivery", included: false }] },
  { name: "Elite", price: "$999", period: "/month", description: "The ultimate ownership experience.", badge: "Best Value", highlight: false, cta: "Go Elite",
    features: [{ text: "All vehicle categories", included: true }, { text: "Lifetime warranty", included: true }, { text: "24/7 VIP roadside assistance", included: true }, { text: "Unlimited free services", included: true }, { text: "Priority test drives", included: true }, { text: "Dedicated account manager", included: true }, { text: "Concierge delivery", included: true }] },
];

const financing = [
  { title: "0% APR Financing", desc: "Zero interest for up to 36 months on select models.", tag: "Limited Time" },
  { title: "Flexible Lease Plans", desc: "Low monthly payments with upgrade options every 2–3 years.", tag: "Popular" },
  { title: "Trade-In Program", desc: "Get top dollar for your current vehicle toward your new purchase.", tag: "Easy Process" },
];

export default function PricingPage() {
  return (
    <div>
      <section className="relative py-24 overflow-hidden text-center">
        <div className="orb w-96 h-96 top-0 left-1/2 -translate-x-1/2" style={{ background: "var(--orb-2)" }} />
        <div className="container relative z-10 space-y-5">
          <div className="section-label shimmer mx-auto w-fit"><span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />Transparent Pricing</div>
          <h1 className="text-5xl md:text-6xl font-extrabold" style={{ color: "var(--text-primary)" }}>Simple, Honest Pricing</h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>No hidden fees. No surprises.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div key={plan.name} className={`relative rounded-2xl overflow-hidden glass-hover transition-all duration-300 ${plan.highlight ? "glass-strong glass-border scale-105" : "glass glass-border"}`}>
              {plan.badge && <div className="absolute top-0 right-0"><span className="block px-3 py-1 text-xs font-semibold rounded-bl-xl shimmer badge-glass">{plan.badge}</span></div>}
              <div className="p-7 space-y-6">
                <div>
                  <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{plan.name}</h3>
                  <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>{plan.description}</p>
                  <div className="skeu-inset rounded-xl px-4 py-3 mt-4 inline-block">
                    <span className="text-5xl font-extrabold text-gradient">{plan.price}</span>
                    <span className="text-sm ml-1" style={{ color: "var(--text-muted)" }}>{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-center gap-2.5 text-sm">
                      {f.included ? <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" /> : <XCircle className="h-4 w-4 shrink-0" style={{ color: "var(--text-muted)" }} />}
                      <span style={{ color: f.included ? "var(--text-secondary)" : "var(--text-muted)" }}>{f.text}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={`block text-center py-3 rounded-xl text-sm font-semibold ${plan.highlight ? "btn-primary-glow" : "btn-glass"}`}>{plan.cta}</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 relative">
        <div className="orb w-72 h-72 bottom-0 right-0" style={{ background: "var(--orb-1)" }} />
        <div className="container relative z-10">
          <div className="text-center mb-14">
            <div className="section-label mx-auto w-fit mb-4">Financing Options</div>
            <h2 className="text-4xl font-bold" style={{ color: "var(--text-primary)" }}>Flexible Ways to Own</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {financing.map((opt) => (
              <div key={opt.title} className="skeu-card glass-border rounded-2xl p-6 space-y-3">
                <span className="section-label text-xs">{opt.tag}</span>
                <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{opt.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{opt.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/contact" className="btn-primary-glow inline-block px-8 py-3 rounded-xl font-semibold text-sm">Talk to a Finance Expert</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
