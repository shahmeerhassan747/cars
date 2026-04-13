"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Trash2, ShoppingCart, Fuel, Users, Loader2 } from "lucide-react";
import { wishlistApi, cartApi, type WishlistItem } from "@/lib/api";
import { loadUser } from "@/lib/userStore";

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removing, setRemoving] = useState<number | null>(null);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);

  const user = loadUser();

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    wishlistApi.list(user.id)
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function remove(vehicleId: number) {
    if (!user) return;
    setRemoving(vehicleId);
    try {
      await wishlistApi.remove(user.id, vehicleId);
      setItems((prev) => prev.filter((i) => i.vehicle_id !== vehicleId));
    } catch (e: any) { alert(e.message); }
    finally { setRemoving(null); }
  }

  async function moveToCart(vehicleId: number) {
    if (!user) return;
    setAddingToCart(vehicleId);
    try {
      await cartApi.add(user.id, vehicleId);
      await wishlistApi.remove(user.id, vehicleId);
      setItems((prev) => prev.filter((i) => i.vehicle_id !== vehicleId));
    } catch (e: any) {
      if (e.message !== "Vehicle already in cart") alert(e.message);
    } finally { setAddingToCart(null); }
  }

  return (
    <div>
      <section className="relative py-20 overflow-hidden text-center">
        <div className="orb w-80 h-80 top-0 left-1/2 -translate-x-1/2" style={{ background: "var(--orb-2)" }} />
        <div className="container relative z-10 space-y-4">
          <div className="section-label shimmer mx-auto w-fit">
            <Heart className="h-3.5 w-3.5" /> Saved Vehicles
          </div>
          <h1 className="text-5xl font-extrabold" style={{ color: "var(--text-primary)" }}>My Wishlist</h1>
          {!loading && user && <p style={{ color: "var(--text-secondary)" }}>{items.length} saved vehicle{items.length !== 1 ? "s" : ""}</p>}
        </div>
      </section>

      <section className="container pb-20">
        {!user && (
          <div className="glass glass-border rounded-2xl p-16 text-center space-y-4">
            <Heart className="h-16 w-16 mx-auto text-rose-400 opacity-40" />
            <p className="text-xl font-semibold" style={{ color: "var(--text-primary)" }}>Please log in to view your wishlist</p>
            <Link href="/profile" className="btn-primary-glow inline-block px-8 py-3 rounded-xl font-semibold text-sm">Register / Login</Link>
          </div>
        )}

        {user && loading && (
          <div className="flex items-center justify-center py-32 gap-3" style={{ color: "var(--text-muted)" }}>
            <Loader2 className="h-6 w-6 animate-spin text-blue-400" /><span>Loading wishlist...</span>
          </div>
        )}

        {user && !loading && error && (
          <div className="glass glass-border rounded-2xl p-10 text-center">
            <p className="text-rose-400">{error}</p>
          </div>
        )}

        {user && !loading && !error && items.length === 0 && (
          <div className="glass glass-border rounded-2xl p-16 text-center space-y-4">
            <Heart className="h-16 w-16 mx-auto text-rose-400 opacity-40" />
            <p className="text-xl font-semibold" style={{ color: "var(--text-primary)" }}>Your wishlist is empty</p>
            <Link href="/vehicles" className="btn-primary-glow inline-block px-8 py-3 rounded-xl font-semibold text-sm">Browse Vehicles</Link>
          </div>
        )}

        {user && !loading && !error && items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.vehicle_id} className="glass glass-border glass-hover rounded-2xl overflow-hidden group">
                <div className="relative h-48 overflow-hidden img-spotlight-wrap">
                  {item.vehicle.main_image_url?.startsWith("http") ? (
                    <img src={item.vehicle.main_image_url} alt={item.vehicle.name} className="absolute inset-0 w-full h-full object-cover img-zoom-hover" />
                  ) : (
                    <div className="w-full h-full" style={{ background: "var(--bg-surface)" }} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <button onClick={() => remove(item.vehicle_id)} disabled={removing === item.vehicle_id}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-rose-500/20 border border-rose-400/30 text-rose-400 hover:bg-rose-500/40 transition-all">
                    {removing === item.vehicle_id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Heart className="h-4 w-4 fill-rose-400" />}
                  </button>
                </div>
                <div className="p-5 space-y-4">
                  <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{item.vehicle.name}</h3>
                  <div className="flex gap-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                    {item.vehicle.fuel_type && <span className="flex items-center gap-1.5"><Fuel className="h-3.5 w-3.5 text-blue-400" />{item.vehicle.fuel_type}</span>}
                    {item.vehicle.seats && <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-blue-400" />{item.vehicle.seats} seats</span>}
                  </div>
                  <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                    <span className="text-2xl font-bold text-gradient">
                      {item.vehicle.price ? `$${Number(item.vehicle.price).toLocaleString()}` : "POA"}
                    </span>
                    <div className="flex gap-2">
                      <button onClick={() => remove(item.vehicle_id)} disabled={removing === item.vehicle_id}
                        className="p-2 rounded-lg hover:bg-rose-500/10 hover:text-rose-400 transition-all" style={{ color: "var(--text-muted)" }}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <Link href={`/vehicles/${item.vehicle_id}`} className="btn-glass px-3 py-1.5 rounded-lg text-xs font-semibold">View</Link>
                      <button onClick={() => moveToCart(item.vehicle_id)} disabled={addingToCart === item.vehicle_id}
                        className="btn-primary-glow px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1">
                        {addingToCart === item.vehicle_id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ShoppingCart className="h-3.5 w-3.5" />}
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
