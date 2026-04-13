"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Fuel, Users, CheckCircle, XCircle, Star, ThumbsUp,
  ArrowLeft, Zap, Settings, Layers, Share2, Heart,
  ChevronRight, Loader2, ShoppingCart, Pencil, Trash2,
  Save, X, Plus, Upload, Camera,
} from "lucide-react";
import {
  vehiclesApi, specsApi, reviewsApi, cartApi, wishlistApi,
  type Vehicle, type VehicleSpec, type Review,
} from "@/lib/api";
import { loadUser } from "@/lib/userStore";

// ── helpers ──────────────────────────────────────────────────────────────────
function isValidSrc(s: string | null | undefined): boolean {
  if (!s) return false;
  return s.startsWith("http") || s.startsWith("data:");
}

function TagList({
  items, onRemove,
}: { items: string[]; onRemove: (i: number) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-1">
      {items.map((t, i) => (
        <span key={i} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs badge-glass">
          {t}
          <button type="button" onClick={() => onRemove(i)} className="hover:text-rose-400 transition-colors ml-0.5">
            <X className="h-2.5 w-2.5" />
          </button>
        </span>
      ))}
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────
export default function VehicleDetailClient({ vehicleId }: { vehicleId: number }) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [vehicle, setVehicle]   = useState<Vehicle | null>(null);
  const [reviews, setReviews]   = useState<Review[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  // edit mode
  const [editing, setEditing]   = useState(false);
  const [saving, setSaving]     = useState(false);
  const [saveMsg, setSaveMsg]   = useState<string | null>(null);

  // edit form state
  const [form, setForm]         = useState<Partial<Vehicle>>({});
  const [specsForm, setSpecsForm] = useState<Partial<VehicleSpec>>({});
  const [featInput, setFeatInput] = useState("");
  const [prosInput, setProsInput] = useState("");
  const [consInput, setConsInput] = useState("");

  // cart / wishlist
  const [inCart, setInCart]         = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [wishLoading, setWishLoading] = useState(false);

  // review form
  const [newReview, setNewReview]   = useState({ rating: 5, review_text: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);

  const user = loadUser();

  // ── load ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    Promise.all([vehiclesApi.get(vehicleId), reviewsApi.list(vehicleId)])
      .then(([v, r]) => {
        setVehicle(v);
        setReviews(r);
        initForm(v);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [vehicleId]);

  function initForm(v: Vehicle) {
    setForm({
      name: v.name,
      fuel_type: v.fuel_type ?? "",
      seats: v.seats,
      price: v.price,
      monthly_estimate: v.monthly_estimate,
      main_image_url: v.main_image_url ?? "",
      overview: v.overview ?? "",
      features: v.features ? [...v.features] : [],
      pros: v.pros ? [...v.pros] : [],
      cons: v.cons ? [...v.cons] : [],
    });
    setSpecsForm(v.specs ? { ...v.specs } : {});
  }

  // ── image upload → base64 ─────────────────────────────────────────────────
  function handleImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((f) => ({ ...f, main_image_url: reader.result as string }));
    };
    reader.readAsDataURL(file);
  }

  // ── save ──────────────────────────────────────────────────────────────────
  async function handleSave() {
    if (!vehicle) return;
    setSaving(true);
    try {
      const updated = await vehiclesApi.patch(vehicle.id, {
        name: form.name,
        fuel_type: form.fuel_type || null,
        seats: form.seats ? Number(form.seats) : null,
        price: form.price ? Number(form.price) : null,
        monthly_estimate: form.monthly_estimate ? Number(form.monthly_estimate) : null,
        main_image_url: form.main_image_url || null,
        overview: form.overview || null,
        features: form.features,
        pros: form.pros,
        cons: form.cons,
      });

      const hasSpecs = Object.values(specsForm).some((v) => v !== null && v !== "" && v !== undefined);
      if (hasSpecs) {
        await specsApi.upsert(vehicle.id, {
          engine: specsForm.engine || null,
          horsepower: specsForm.horsepower ? Number(specsForm.horsepower) : null,
          torque: specsForm.torque ? Number(specsForm.torque) : null,
          acceleration_0_100: specsForm.acceleration_0_100 || null,
          top_speed: specsForm.top_speed ? Number(specsForm.top_speed) : null,
        });
      }

      setVehicle({ ...updated, specs: hasSpecs ? { vehicle_id: vehicle.id, ...specsForm } as VehicleSpec : updated.specs });
      setEditing(false);
      setSaveMsg("Saved successfully!");
      setTimeout(() => setSaveMsg(null), 3000);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  // ── delete ────────────────────────────────────────────────────────────────
  async function handleDelete() {
    if (!vehicle) return;
    if (!confirm(`Delete "${vehicle.name}"? This cannot be undone.`)) return;
    try {
      await vehiclesApi.delete(vehicle.id);
      router.push("/vehicles");
    } catch (e: any) {
      setError(e.message);
    }
  }

  // ── cart / wishlist ───────────────────────────────────────────────────────
  async function handleCart() {
    if (!user) { alert("Please log in first"); return; }
    setCartLoading(true);
    try {
      if (inCart) { await cartApi.remove(user.id, vehicleId); setInCart(false); }
      else { await cartApi.add(user.id, vehicleId); setInCart(true); }
    } catch (e: any) { if (e.message === "Vehicle already in cart") setInCart(true); }
    finally { setCartLoading(false); }
  }

  async function handleWishlist() {
    if (!user) { alert("Please log in first"); return; }
    setWishLoading(true);
    try {
      if (inWishlist) { await wishlistApi.remove(user.id, vehicleId); setInWishlist(false); }
      else { await wishlistApi.add(user.id, vehicleId); setInWishlist(true); }
    } catch (e: any) { if (e.message === "Vehicle already in wishlist") setInWishlist(true); }
    finally { setWishLoading(false); }
  }

  // ── review ────────────────────────────────────────────────────────────────
  async function handleReviewSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) { alert("Please log in first"); return; }
    setSubmitting(true);
    try {
      const r = await reviewsApi.create(vehicleId, { user_id: user.id, ...newReview });
      setReviews((prev) => [r, ...prev]);
      setSubmitted(true);
      setNewReview({ rating: 5, review_text: "" });
    } catch (e: any) { alert(e.message); }
    finally { setSubmitting(false); }
  }

  // ── tag helpers ───────────────────────────────────────────────────────────
  function addTag(field: "features" | "pros" | "cons", val: string, clear: () => void) {
    if (!val.trim()) return;
    setForm((f) => ({ ...f, [field]: [...(f[field] ?? []), val.trim()] }));
    clear();
  }
  function removeTag(field: "features" | "pros" | "cons", idx: number) {
    setForm((f) => ({ ...f, [field]: (f[field] ?? []).filter((_, i) => i !== idx) }));
  }

  // ── render ────────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh] gap-3" style={{ color: "var(--text-muted)" }}>
      <Loader2 className="h-8 w-8 animate-spin text-blue-400" /><span>Loading vehicle...</span>
    </div>
  );

  if (error && !vehicle) return (
    <div className="container py-20 text-center space-y-3">
      <p className="text-rose-400 font-semibold text-xl">Vehicle not found</p>
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>{error}</p>
      <Link href="/vehicles" className="btn-glass inline-block px-6 py-2.5 rounded-xl text-sm font-semibold mt-4">Back to Vehicles</Link>
    </div>
  );

  if (!vehicle) return null;

  const avgRating = reviews.length ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : 0;
  const imgSrc = editing ? (isValidSrc(form.main_image_url as string) ? form.main_image_url as string : null)
                         : (isValidSrc(vehicle.main_image_url) ? vehicle.main_image_url! : null);

  return (
    <div className="min-h-screen">
      {/* Toast */}
      {saveMsg && (
        <div className="fixed top-24 right-6 z-50 glass glass-border rounded-xl px-5 py-3 flex items-center gap-2 text-emerald-400 text-sm shadow-xl">
          <CheckCircle className="h-4 w-4" />{saveMsg}
        </div>
      )}
      {error && (
        <div className="fixed top-24 right-6 z-50 glass glass-border rounded-xl px-5 py-3 flex items-center gap-2 text-rose-400 text-sm shadow-xl">
          {error}
          <button onClick={() => setError(null)}><X className="h-4 w-4" /></button>
        </div>
      )}

      {/* Breadcrumb + admin actions */}
      <div className="container pt-8 pb-4 flex items-center justify-between">
        <Link href="/vehicles" className="inline-flex items-center gap-2 text-sm hover:text-blue-400 transition-colors" style={{ color: "var(--text-secondary)" }}>
          <ArrowLeft className="h-4 w-4" /> Back to Vehicles
        </Link>
        <div className="flex items-center gap-2">
          {editing ? (
            <>
              <button onClick={handleSave} disabled={saving}
                className="btn-primary-glow flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold">
                {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                Save
              </button>
              <button onClick={() => { setEditing(false); initForm(vehicle); }}
                className="btn-glass flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold">
                <X className="h-3.5 w-3.5" /> Cancel
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setEditing(true)}
                className="btn-glass flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold">
                <Pencil className="h-3.5 w-3.5" /> Edit
              </button>
              <button onClick={handleDelete}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20">
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Hero: image + info ── */}
      <section className="container pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Image panel */}
          <div className="space-y-3">
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden glass-border img-spotlight-wrap group">
              {imgSrc ? (
                <img src={imgSrc} alt={vehicle.name} className="absolute inset-0 w-full h-full object-cover img-zoom-hover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3" style={{ background: "var(--bg-surface)" }}>
                  <Camera className="h-12 w-12 opacity-20" style={{ color: "var(--text-muted)" }} />
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>No image</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {vehicle.fuel_type && !editing && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold badge-glass shimmer">{vehicle.fuel_type}</span>
              )}

              {/* Upload overlay when editing */}
              {editing && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/50 backdrop-blur-sm">
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageFile} />
                  <button onClick={() => fileRef.current?.click()}
                    className="btn-primary-glow flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold">
                    <Upload className="h-4 w-4" /> Upload Image
                  </button>
                  <p className="text-xs text-white/60">or paste a URL below</p>
                  <input
                    type="text"
                    placeholder="https://... or data:image/..."
                    value={form.main_image_url as string ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, main_image_url: e.target.value }))}
                    className="input-glass w-3/4 h-9 rounded-xl px-3 text-xs"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Info / edit panel */}
          <div className="glass glass-border rounded-2xl p-7 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              {editing ? (
                <input
                  value={form.name as string ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="input-glass w-full h-12 rounded-xl px-4 text-2xl font-extrabold"
                  placeholder="Vehicle name"
                />
              ) : (
                <h1 className="text-3xl font-extrabold" style={{ color: "var(--text-primary)" }}>{vehicle.name}</h1>
              )}

              {/* Rating */}
              {reviews.length > 0 && (
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((s) => <Star key={s} className={`h-4 w-4 ${s <= Math.round(avgRating) ? "fill-yellow-400 text-yellow-400" : "text-slate-600"}`} />)}
                  </div>
                  <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{avgRating.toFixed(1)}</span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>({reviews.length} reviews)</span>
                </div>
              )}

              {/* Quick specs grid */}
              {editing ? (
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Fuel Type", key: "fuel_type", type: "text", placeholder: "Petrol / Electric" },
                    { label: "Seats", key: "seats", type: "number", placeholder: "5" },
                    { label: "Price ($)", key: "price", type: "number", placeholder: "38000" },
                    { label: "Monthly ($)", key: "monthly_estimate", type: "number", placeholder: "585" },
                  ].map(({ label, key, type, placeholder }) => (
                    <div key={key} className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>{label}</label>
                      <input type={type} placeholder={placeholder}
                        value={(form as any)[key] ?? ""}
                        onChange={(e) => setForm((f) => ({ ...f, [key]: type === "number" ? (e.target.value ? Number(e.target.value) : null) : e.target.value }))}
                        className="input-glass w-full h-9 rounded-xl px-3 text-sm" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {vehicle.fuel_type && (
                    <div className="skeu-stat rounded-xl p-3 flex items-center gap-2">
                      <Fuel className="h-4 w-4 text-blue-400 relative z-10" />
                      <div className="relative z-10">
                        <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Fuel</p>
                        <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{vehicle.fuel_type}</p>
                      </div>
                    </div>
                  )}
                  {vehicle.seats && (
                    <div className="skeu-stat rounded-xl p-3 flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-400 relative z-10" />
                      <div className="relative z-10">
                        <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Seats</p>
                        <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{vehicle.seats}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Price */}
              <div className="skeu-inset rounded-xl px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>Starting Price</p>
                  <p className="text-4xl font-extrabold text-gradient">
                    {vehicle.price ? `$${Number(vehicle.price).toLocaleString()}` : "POA"}
                  </p>
                </div>
                {vehicle.monthly_estimate && (
                  <div className="text-right">
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Est. Monthly</p>
                    <p className="text-lg font-bold" style={{ color: "var(--text-secondary)" }}>
                      ${Number(vehicle.monthly_estimate).toLocaleString()}/mo
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            {!editing && (
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Link href="/contact" className="btn-primary-glow flex-1 py-3 rounded-xl font-semibold text-sm text-center">Buy Now</Link>
                  <Link href="/contact" className="btn-glass flex-1 py-3 rounded-xl font-semibold text-sm text-center">Test Drive</Link>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleCart} disabled={cartLoading}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all glass-border ${inCart ? "bg-blue-500/20 text-blue-400" : "glass"}`}
                    style={{ color: inCart ? undefined : "var(--text-secondary)" }}>
                    {cartLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className={`h-4 w-4 ${inCart ? "fill-blue-400" : ""}`} />}
                    {inCart ? "In Cart" : "Add to Cart"}
                  </button>
                  <button onClick={handleWishlist} disabled={wishLoading}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all glass-border ${inWishlist ? "bg-rose-500/20 text-rose-400" : "glass"}`}
                    style={{ color: inWishlist ? undefined : "var(--text-secondary)" }}>
                    {wishLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Heart className={`h-4 w-4 ${inWishlist ? "fill-rose-400" : ""}`} />}
                    {inWishlist ? "Saved" : "Wishlist"}
                  </button>
                  <button className="px-4 py-2.5 rounded-xl text-sm glass glass-border" style={{ color: "var(--text-secondary)" }}>
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Overview / Pros / Cons ── */}
      <section className="container py-8">
        <div className="glass glass-border rounded-2xl p-7 space-y-5">
          <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <Layers className="h-5 w-5 text-blue-400" /> Overview
          </h2>

          {editing ? (
            <textarea rows={4} placeholder="Vehicle description..."
              value={form.overview as string ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, overview: e.target.value }))}
              className="input-glass w-full rounded-xl px-3 py-2.5 text-sm resize-none" />
          ) : (
            vehicle.overview && <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>{vehicle.overview}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Pros */}
            <div className="skeu-inset rounded-xl p-4 space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">Pros</p>
              {editing ? (
                <>
                  <div className="flex gap-2">
                    <input placeholder="Add pro..." value={prosInput}
                      onChange={(e) => setProsInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag("pros", prosInput, () => setProsInput("")); } }}
                      className="input-glass flex-1 h-8 rounded-lg px-3 text-xs" />
                    <button onClick={() => addTag("pros", prosInput, () => setProsInput(""))}
                      className="btn-glass px-2 py-1 rounded-lg text-xs"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                  <TagList items={form.pros ?? []} onRemove={(i) => removeTag("pros", i)} />
                </>
              ) : (
                (vehicle.pros ?? []).map((p) => (
                  <div key={p} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />{p}
                  </div>
                ))
              )}
            </div>

            {/* Cons */}
            <div className="skeu-inset rounded-xl p-4 space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-rose-400">Cons</p>
              {editing ? (
                <>
                  <div className="flex gap-2">
                    <input placeholder="Add con..." value={consInput}
                      onChange={(e) => setConsInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag("cons", consInput, () => setConsInput("")); } }}
                      className="input-glass flex-1 h-8 rounded-lg px-3 text-xs" />
                    <button onClick={() => addTag("cons", consInput, () => setConsInput(""))}
                      className="btn-glass px-2 py-1 rounded-lg text-xs"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                  <TagList items={form.cons ?? []} onRemove={(i) => removeTag("cons", i)} />
                </>
              ) : (
                (vehicle.cons ?? []).map((c) => (
                  <div key={c} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <XCircle className="h-4 w-4 text-rose-400 shrink-0" />{c}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Specs ── */}
      <section className="container py-8">
        <div className="glass glass-border rounded-2xl p-7 space-y-5">
          <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <Settings className="h-5 w-5 text-blue-400" /> Technical Specifications
          </h2>
          {editing ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { label: "Engine", key: "engine", type: "text", placeholder: "4.4L Twin-Turbo V8" },
                { label: "Horsepower (hp)", key: "horsepower", type: "number", placeholder: "627" },
                { label: "Torque (Nm)", key: "torque", type: "number", placeholder: "750" },
                { label: "0–100 km/h", key: "acceleration_0_100", type: "text", placeholder: "3.3s" },
                { label: "Top Speed (km/h)", key: "top_speed", type: "number", placeholder: "305" },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key} className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>{label}</label>
                  <input type={type} placeholder={placeholder}
                    value={(specsForm as any)[key] ?? ""}
                    onChange={(e) => setSpecsForm((s) => ({ ...s, [key]: type === "number" ? (e.target.value ? Number(e.target.value) : null) : e.target.value }))}
                    className="input-glass w-full h-9 rounded-xl px-3 text-sm" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                { label: "Engine", value: vehicle.specs?.engine },
                { label: "Horsepower", value: vehicle.specs?.horsepower ? `${vehicle.specs.horsepower} hp` : null },
                { label: "Torque", value: vehicle.specs?.torque ? `${vehicle.specs.torque} Nm` : null },
                { label: "0–100 km/h", value: vehicle.specs?.acceleration_0_100 },
                { label: "Top Speed", value: vehicle.specs?.top_speed ? `${vehicle.specs.top_speed} km/h` : null },
              ].filter((s) => s.value).map(({ label, value }) => (
                <div key={label} className="skeu-stat rounded-xl p-4 space-y-1">
                  <p className="text-[10px] uppercase tracking-widest relative z-10" style={{ color: "var(--text-muted)" }}>{label}</p>
                  <p className="text-sm font-bold relative z-10" style={{ color: "var(--text-primary)" }}>{value}</p>
                </div>
              ))}
              {!vehicle.specs && <p className="text-sm col-span-5" style={{ color: "var(--text-muted)" }}>No specs yet. Click Edit to add them.</p>}
            </div>
          )}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="container py-8">
        <div className="glass glass-border rounded-2xl p-7 space-y-5">
          <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <Zap className="h-5 w-5 text-blue-400" /> Key Features
          </h2>
          {editing ? (
            <>
              <div className="flex gap-2">
                <input placeholder="Add feature..." value={featInput}
                  onChange={(e) => setFeatInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag("features", featInput, () => setFeatInput("")); } }}
                  className="input-glass flex-1 h-9 rounded-xl px-3 text-sm" />
                <button onClick={() => addTag("features", featInput, () => setFeatInput(""))}
                  className="btn-glass px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1">
                  <Plus className="h-3.5 w-3.5" /> Add
                </button>
              </div>
              <TagList items={form.features ?? []} onRemove={(i) => removeTag("features", i)} />
            </>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {(vehicle.features ?? []).map((f) => (
                <div key={f} className="skeu-card glass-border rounded-xl px-4 py-3 flex items-center gap-3">
                  <div className="skeu-icon-wrap w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                    <CheckCircle className="h-4 w-4 text-blue-400 relative z-10" />
                  </div>
                  <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{f}</span>
                </div>
              ))}
              {!vehicle.features?.length && <p className="text-sm" style={{ color: "var(--text-muted)" }}>No features yet. Click Edit to add them.</p>}
            </div>
          )}
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="container py-8 space-y-5">
        <div className="glass glass-border rounded-2xl p-7">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Customer Reviews</h2>
              <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>{reviews.length} review{reviews.length !== 1 ? "s" : ""}</p>
            </div>
            {reviews.length > 0 && (
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-5xl font-extrabold text-gradient">{avgRating.toFixed(1)}</p>
                  <div className="flex gap-0.5 justify-center mt-1">
                    {[1,2,3,4,5].map((s) => <Star key={s} className={`h-4 w-4 ${s <= Math.round(avgRating) ? "fill-yellow-400 text-yellow-400" : "text-slate-600"}`} />)}
                  </div>
                </div>
                <div className="space-y-1.5 min-w-[130px]">
                  {[5,4,3,2,1].map((star) => {
                    const count = reviews.filter((r) => r.rating === star).length;
                    const pct = reviews.length ? (count / reviews.length) * 100 : 0;
                    return (
                      <div key={star} className="flex items-center gap-2 text-xs">
                        <span className="w-3 text-right" style={{ color: "var(--text-muted)" }}>{star}</span>
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 shrink-0" />
                        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
                          <div className="h-full rounded-full bg-yellow-400" style={{ width: `${pct}%` }} />
                        </div>
                        <span style={{ color: "var(--text-muted)" }}>{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {reviews.map((review) => (
          <div key={review.id} className="glass glass-border rounded-2xl p-6 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{review.username}</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{new Date(review.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
              </div>
              <div className="flex gap-0.5 shrink-0">
                {[1,2,3,4,5].map((s) => <Star key={s} className={`h-3.5 w-3.5 ${s <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-600"}`} />)}
              </div>
            </div>
            {review.review_text && <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{review.review_text}</p>}
            <div className="flex items-center gap-2 pt-1" style={{ borderTop: "1px solid var(--border-subtle)" }}>
              <ThumbsUp className="h-3.5 w-3.5" style={{ color: "var(--text-muted)" }} />
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>Helpful: {review.helpful_count}</span>
            </div>
          </div>
        ))}

        {/* Write review */}
        <div className="glass glass-border rounded-2xl p-7 space-y-5">
          <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>Write a Review</h3>
          {!user ? (
            <div className="skeu-inset rounded-xl p-4 text-center space-y-2">
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Log in to write a review.</p>
              <Link href="/profile" className="btn-primary-glow inline-block px-6 py-2 rounded-xl text-sm font-semibold">Login</Link>
            </div>
          ) : submitted ? (
            <div className="skeu-inset rounded-xl p-6 text-center space-y-2">
              <CheckCircle className="h-10 w-10 text-emerald-400 mx-auto" />
              <p className="font-semibold" style={{ color: "var(--text-primary)" }}>Review submitted!</p>
              <button onClick={() => setSubmitted(false)} className="btn-glass px-4 py-2 rounded-xl text-xs font-semibold">Write another</button>
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>Rating</label>
                <div className="flex gap-1 h-10 items-center">
                  {[1,2,3,4,5].map((s) => (
                    <button key={s} type="button" onClick={() => setNewReview({ ...newReview, rating: s })} className="transition-transform hover:scale-125">
                      <Star className={`h-6 w-6 transition-colors ${s <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-600"}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>Your Review</label>
                <textarea required rows={4} value={newReview.review_text}
                  onChange={(e) => setNewReview({ ...newReview, review_text: e.target.value })}
                  className="input-glass w-full rounded-xl px-3 py-2.5 text-sm resize-none"
                  placeholder="Share your experience..." />
              </div>
              <button type="submit" disabled={submitting} className="btn-primary-glow px-8 py-3 rounded-xl font-semibold text-sm flex items-center gap-2">
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Submit Review
              </button>
            </form>
          )}
        </div>
      </section>
      <div className="h-16" />
    </div>
  );
}
