"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, ShoppingCart, ChevronRight, Loader2 } from "lucide-react";
import { cartApi, type CartItem } from "@/lib/api";
import { loadUser } from "@/lib/userStore";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removing, setRemoving] = useState<number | null>(null);

  const user = loadUser();

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    cartApi.list(user.id)
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function remove(vehicleId: number) {
    if (!user) return;
    setRemoving(vehicleId);
    try {
      await cartApi.remove(user.id, vehicleId);
      setItems((prev) => prev.filter((i) => i.vehicle_id !== vehicleId));
    } catch (e: any) {
      alert(e.message);
    } finally {
      setRemoving(null);
    }
  }

  const total = items.reduce((s, i) => s + Number(i.vehicle.price ?? 0), 0);

  return (
    <div>
      <section className="relative py-20 overflow-hidden text-center">
        <div className="orb w-80 h-80 top-0 left-1/2 -translate-x-1/2" style={{ background: "var(--orb-1)" }} />
        <div className="container relative z-10 space-y-4">
          <div className="section-label shimmer mx-auto w-fit">
            <ShoppingCart className="h-3.5 w-3.5" /> Your Cart
          </div>
          <h1 className="text-5xl font-extrabold" style={{ color: "var(--text-primary)" }}>Shopping Cart</h1>
          {!loading && <p style={{ color: "var(--text-secondary)" }}>{items.length} vehicle{items.length !== 1 ? "s" : ""}</p>}
        </div>
      </section>

      <section className="container pb-20">
        {!user && (
          <div className="glass glass-border rounded-2xl p-16 text-center space-y-4">
            <ShoppingCart className="h-16 w-16 mx-auto text-blue-400 opacity-40" />
            <p className="text-xl font-semibold" style={{ color: "var(--text-primary)" }}>Please log in to view your cart</p>
            <Link href="/profile" className="btn-primary-glow inline-block px-8 py-3 rounded-xl font-semibold text-sm">Register / Login</Link>
          </div>
        )}

        {user && loading && (
          <div className="flex items-center justify-center py-32 gap-3" style={{ color: "var(--text-muted)" }}>
            <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
            <span>Loading cart...</span>
          </div>
        )}

        {user && !loading && error && (
          <div className="glass glass-border rounded-2xl p-10 text-center">
            <p className="text-rose-400">{error}</p>
          </div>
        )}

        {user && !loading && !error && items.length === 0 && (
          <div className="glass glass-border rounded-2xl p-16 text-center space-y-4">
            <ShoppingCart className="h-16 w-16 mx-auto text-blue-400 opacity-40" />
            <p className="text-xl font-semibold" style={{ color: "var(--text-primary)" }}>Your cart is empty</p>
            <Link href="/vehicles" className="btn-primary-glow inline-block px-8 py-3 rounded-xl font-semibold text-sm">Browse Vehicles</Link>
          </div>
        )}

        {user && !loading && !error && items.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.vehicle_id} className="glass glass-border rounded-2xl p-5 flex gap-5 items-center">
                  <div className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0">
                    {item.vehicle.main_image_url ? (
                      <img src={item.vehicle.main_image_url} alt={item.vehicle.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" style={{ background: "var(--bg-surface)" }}>
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>No image</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <Link href={`/vehicles/${item.vehicle_id}`} className="font-bold hover:text-blue-400 transition-colors truncate block" style={{ color: "var(--text-primary)" }}>
                      {item.vehicle.name}
                    </Link>
                    {item.vehicle.fuel_type && <p className="text-xs" style={{ color: "var(--text-muted)" }}>{item.vehicle.fuel_type}</p>}
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Added {new Date(item.added_at).toLocaleDateString()}</p>
                  </div>
                  <p className="text-lg font-bold text-gradient shrink-0">
                    {item.vehicle.price ? `$${Number(item.vehicle.price).toLocaleString()}` : "POA"}
                  </p>
                  <button onClick={() => remove(item.vehicle_id)} disabled={removing === item.vehicle_id}
                    className="shrink-0 p-2 rounded-lg transition-all hover:bg-rose-500/10 hover:text-rose-400" style={{ color: "var(--text-muted)" }}>
                    {removing === item.vehicle_id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="glass glass-border rounded-2xl p-6 space-y-5 h-fit">
              <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between" style={{ color: "var(--text-secondary)" }}>
                  <span>{items.length} vehicle{items.length !== 1 ? "s" : ""}</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <div className="skeu-divider" />
                <div className="flex justify-between font-bold text-lg">
                  <span style={{ color: "var(--text-primary)" }}>Total</span>
                  <span className="text-gradient">${total.toLocaleString()}</span>
                </div>
              </div>
              <Link href="/contact" className="btn-primary-glow flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm">
                Proceed to Checkout <ChevronRight className="h-4 w-4" />
              </Link>
              <Link href="/vehicles" className="btn-glass flex items-center justify-center w-full py-2.5 rounded-xl text-sm font-medium">
                Continue Shopping
              </Link>
              {total > 0 && (
                <div className="skeu-inset rounded-xl p-3 text-center space-y-0.5">
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>Est. Monthly (60mo)</p>
                  <p className="text-xl font-bold text-gradient">${Math.round(total / 60).toLocaleString()}/mo</p>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
