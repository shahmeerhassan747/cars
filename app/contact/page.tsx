import { MapPin, Phone, Mail, Clock, Car, MessageSquare } from "lucide-react";

const contactInfo = [
  { icon: MapPin, title: "Visit Us", lines: ["123 AutoElite Blvd", "Motor City, CA 90210"] },
  { icon: Phone, title: "Call Us", lines: ["+1 (234) 567-890", "+1 (234) 567-891"] },
  { icon: Mail, title: "Email Us", lines: ["info@autoelite.com", "sales@autoelite.com"] },
  { icon: Clock, title: "Working Hours", lines: ["Mon–Fri: 9am – 7pm", "Sat–Sun: 10am – 5pm"] },
];

export default function ContactPage() {
  return (
    <div>
      <section className="relative py-24 overflow-hidden text-center">
        <div className="orb w-96 h-96 top-0 left-1/2 -translate-x-1/2" style={{ background: "var(--orb-1)" }} />
        <div className="container relative z-10 space-y-5">
          <div className="section-label shimmer mx-auto w-fit"><span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />Get In Touch</div>
          <h1 className="text-5xl md:text-6xl font-extrabold" style={{ color: "var(--text-primary)" }}>Contact Us</h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>Have a question or ready to find your next car? Our team is here to help.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactInfo.map(({ icon: Icon, title, lines }) => (
            <div key={title} className="skeu-card glass-border rounded-2xl p-6 text-center space-y-3">
              <div className="skeu-icon-wrap mx-auto w-12 h-12 rounded-2xl flex items-center justify-center">
                <Icon className="h-5 w-5 text-blue-400 relative z-10" />
              </div>
              <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>{title}</h3>
              {lines.map((line) => <p key={line} className="text-sm" style={{ color: "var(--text-secondary)" }}>{line}</p>)}
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="glass glass-border rounded-2xl p-8 space-y-6">
            <div>
              <span className="section-label text-xs">Send a Message</span>
              <h2 className="text-3xl font-bold mt-3" style={{ color: "var(--text-primary)" }}>We'd Love to Hear From You</h2>
            </div>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>First Name</label>
                  <input className="input-glass w-full h-10 rounded-xl px-3 text-sm" placeholder="John" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>Last Name</label>
                  <input className="input-glass w-full h-10 rounded-xl px-3 text-sm" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>Email</label>
                <input type="email" className="input-glass w-full h-10 rounded-xl px-3 text-sm" placeholder="john@example.com" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>Phone</label>
                <input type="tel" className="input-glass w-full h-10 rounded-xl px-3 text-sm" placeholder="+1 (234) 567-890" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>I'm interested in</label>
                <div className="skeu-inset rounded-xl p-3 flex flex-wrap gap-3">
                  {["Buying a Car", "Test Drive", "Financing", "Trade-In", "Service", "Other"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded accent-blue-500" />
                      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>Message</label>
                <textarea className="input-glass w-full rounded-xl px-3 py-2.5 text-sm resize-none" placeholder="Tell us how we can help..." rows={5} />
              </div>
              <button type="submit" className="btn-primary-glow w-full py-3 rounded-xl font-semibold text-sm">Send Message</button>
            </form>
          </div>

          <div className="space-y-5">
            <div>
              <span className="section-label text-xs">Find Us</span>
              <h2 className="text-3xl font-bold mt-3" style={{ color: "var(--text-primary)" }}>Our Location</h2>
            </div>
            <div className="rounded-2xl overflow-hidden glass-border h-64">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0!2d-118.2437!3d34.0522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDAzJzA4LjAiTiAxMTjCsDE0JzM3LjMiVw!5e0!3m2!1sen!2sus!4v1234567890" width="100%" height="100%" style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="AutoElite Location" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="skeu-card glass-border rounded-2xl p-5 space-y-2 cursor-pointer">
                <div className="skeu-icon-wrap w-9 h-9 rounded-xl flex items-center justify-center"><Car className="h-4 w-4 text-blue-400 relative z-10" /></div>
                <h4 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>Book a Test Drive</h4>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Experience any vehicle at your convenience.</p>
              </div>
              <div className="skeu-card glass-border rounded-2xl p-5 space-y-2 cursor-pointer">
                <div className="skeu-icon-wrap w-9 h-9 rounded-xl flex items-center justify-center"><MessageSquare className="h-4 w-4 text-blue-400 relative z-10" /></div>
                <h4 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>Live Chat</h4>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Chat with our experts for instant answers.</p>
              </div>
            </div>
            <div className="glass glass-border rounded-2xl p-5">
              <h4 className="font-semibold text-sm mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}><Clock className="h-4 w-4 text-blue-400" /> Showroom Hours</h4>
              <div className="space-y-2.5 text-sm">
                {[["Monday – Friday", "9:00 AM – 7:00 PM"], ["Saturday", "10:00 AM – 6:00 PM"], ["Sunday", "10:00 AM – 5:00 PM"]].map(([day, hours]) => (
                  <div key={day} className="flex justify-between items-center">
                    <span style={{ color: "var(--text-secondary)" }}>{day}</span>
                    <span className="text-xs px-2.5 py-1 rounded-full badge-glass font-medium">{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
