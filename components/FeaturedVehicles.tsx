"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Fuel, Users, Loader2 } from "lucide-react";
import { vehiclesApi, type Vehicle } from "@/lib/api";

function isValidSrc(s: string | null | undefined) {
  return s && (s.startsWith("http") || s.startsWith("data:"));
}

const imgAnims = ["img-zoom-hover", "img-drift", "img-pan-x"];
const wrapExtras = ["img-spotlight-wrap", "img-vignette", "img-spotlight-wrap"];

export default function FeaturedVehicles() {
  const [cars, setCars] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    vehiclesApi.list({ limit: 3 })
      .then(setCars)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center py-16 gap-3" style={{ color: "var(--text-muted)" }}>
      <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
      <span className="text-sm">Loading vehicles...</span>
    </div>
  );

  if (!cars.length) return (
    <div className="text-center py-10 text-sm" style={{ color: "var(--text-muted)" }}>
      No vehicles found. <Link href="/admin" className="text-blue-400 hover:underline">Add some in the admin panel.</Link>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cars.map((car, i) => (
        <Link
          key={car.id}
          href={`/vehicles/${car.id}`}
          className="glass glass-border glass-hover rounded-2xl overflow-hidden group block"
        >
          <div className={`relative h-52 overflow-hidden ${wrapExtras[i % 3]}`}>
            {isValidSrc(car.main_image_url) ? (
              <img
                src={car.main_image_url!}
                alt={car.name}
                className={`absolute inset-0 w-full h-full object-cover ${imgAnims[i % 3]}`}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center" style={{ background: "var(--bg-surface)" }}>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>No image</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {car.fuel_type && (
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold badge-glass shimmer">
                {car.fuel_type}
              </span>
            )}
          </div>

          <div className="p-5 space-y-4">
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

            <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid var(--border-subtle)" }}>
              <span className="text-2xl font-bold text-gradient">
                {car.price ? `$${Number(car.price).toLocaleString()}` : "POA"}
              </span>
              <span className="btn-glass px-4 py-1.5 rounded-lg text-xs font-semibold">View Details</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
