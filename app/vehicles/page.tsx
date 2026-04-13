"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Fuel, Users, CheckCircle, Loader2 } from "lucide-react";
import { vehiclesApi, type Vehicle } from "@/lib/api";

const categories = ["All", "Petrol", "Hybrid", "Electric", "Diesel"];
const imgAnims = ["img-zoom-hover", "img-drift", "img-pan-x", "img-breath", "img-float", "img-glitch img-zoom-hover"];
const wrapExtras = ["img-spotlight-wrap", "img-vignette", "img-spotlight-wrap", "img-tilt-wrap", "img-vignette", "img-spotlight-wrap"];

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    vehiclesApi.list({ limit: 50 })
      .then(setVehicles)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeFilter === "All"
    ? vehicles
    : vehicles.filter((v) => v.fuel_type === activeFilter);

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden text-center">
        <div className="orb w-96 h-96 top-0 left-1/2 -translate-x-1/2" style={{ background: "var(--orb-1)" }} />
        <div className="container relative z-10 space-y-5">
          <div className="section-label shimmer mx-auto w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Our Inventory
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold" style={{ color: "var(--text-primary)" }}>Explore Our Vehicles</h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            From sleek sedans to powerful SUVs — find the car that matches your lifestyle.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="py-3 border-b"
        style={{ background: "var(--bg-nav)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderColor: "var(--border-subtle)" }}>
        <div className="container flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeFilter === cat ? "btn-primary-glow text-white" : "glass btn-glass"}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="py-16">
        <div className="container">
          {loading && (
            <div className="flex items-center justify-center py-32 gap-3" style={{ color: "var(--text-muted)" }}>
              <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
              <span>Loading vehicles...</span>
            </div>
          )}
          {error && (
            <div className="glass glass-border rounded-2xl p-10 text-center space-y-3">
              <p className="text-rose-400 font-semibold">Failed to load vehicles</p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>{error}</p>
            </div>
          )}
          {!loading && !error && filtered.length === 0 && (
            <div className="glass glass-border rounded-2xl p-10 text-center">
              <p style={{ color: "var(--text-muted)" }}>No vehicles found for this filter.</p>
            </div>
          )}
          {!loading && !error && filtered.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((car, i) => (
                <div key={car.id} className="glass glass-border glass-hover rounded-2xl overflow-hidden group flex flex-col">

                  {/* Image + info → detail page */}
                  <Link href={`/vehicles/${car.id}`} className="block flex-1">
                    <div className={`relative h-56 overflow-hidden ${wrapExtras[i % 6]}`}>
                      {(car.main_image_url?.startsWith("http") || car.main_image_url?.startsWith("data:")) ? (
                        <img src={car.main_image_url} alt={car.name}
                          className={`absolute inset-0 w-full h-full object-cover ${imgAnims[i % 6]}`} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ background: "var(--bg-surface)" }}>
                          <span className="text-xs" style={{ color: "var(--text-muted)" }}>No image</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      {car.fuel_type && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold badge-glass shimmer">
                          {car.fuel_type}
                        </span>
                      )}
                    </div>

                    <div className="px-5 pt-5 pb-3 space-y-3">
                      <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{car.name}</h3>
                      <div className="flex gap-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                        {car.fuel_type && (
                          <span className="flex items-center gap-1.5">
                            <Fuel className="h-3.5 w-3.5 text-blue-400" />{car.fuel_type}
                          </span>
                        )}
                        {car.seats && (
                          <span className="flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5 text-blue-400" />{car.seats} seats
                          </span>
                        )}
                      </div>
                      {car.features && car.features.length > 0 && (
                        <div className="skeu-inset rounded-xl p-3 space-y-1.5">
                          {car.features.slice(0, 3).map((f) => (
                            <div key={f} className="flex items-center gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                              <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />{f}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Price + buttons — outside the Link so they go to /contact */}
                  <div className="px-5 pb-5 flex items-center justify-between pt-3"
                    style={{ borderTop: "1px solid var(--border-subtle)" }}>
                    <span className="text-2xl font-bold text-gradient">
                      {car.price ? `$${Number(car.price).toLocaleString()}` : "POA"}
                    </span>
                    <div className="flex gap-2">
                      <Link href="/contact" className="btn-glass px-3 py-1.5 rounded-lg text-xs font-semibold">
                        Test Drive
                      </Link>
                      <Link href="/contact" className="btn-primary-glow px-3 py-1.5 rounded-lg text-xs font-semibold">
                        Buy Now
                      </Link>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
