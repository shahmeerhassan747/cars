"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Plus, Pencil, Trash2, Save, X, ChevronDown, ChevronUp,
  Loader2, CheckCircle, Upload, Image as ImageIcon, AlertTriangle,
} from "lucide-react";
import { vehiclesApi, specsApi, type Vehicle, type VehicleInput, type VehicleSpec } from "@/lib/api";

// ── helpers ──────────────────────────────────────────────────────────────────
const EMPTY_FORM: VehicleInput = {
  name: "", fuel_type: "", seats: null, price: null, monthly_estimate: null,
  main_image_url: "", overview: "", features: [], pros: [], cons: [],
};
const EMPTY_SPECS = { engine: "", horsepower: null as number | null, torque: null as number | null, acceleration_0_100: "", top_speed: null as number | null };

function fileToBase64(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result as string);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}

// ── component ─────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [vehicles, setVehicles]       = useState<Vehicle[]>([]);
  const [loading, setLoading]         = useState(true);
  const [saving, setSaving]           = useState(false);
  const [deletingId, setDeletingId]   = useState<number | null>(null);
  const [toast, setToast]             = useState<{ msg: string; type: "ok" | "err" } | null>(null);
  const [expandedId, setExpandedId]   = useState<number | null>(null);

  // form
  const [showForm, setShowForm]       = useState(false);
  const [editId, setEditId]           = useState<number | null>(null);
  const [form, setForm]               = useState<VehicleInput>(EMPTY_FORM);
  const [specs, setSpecs]             = useState(EMPTY_SPECS);
  const [tagInputs, setTagInputs]     = useState({ features: "", pros: "", cons: "" });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageMode, setImageMode]     = useState<"url" | "upload">("url");
  const [uploadLoading, setUploadLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try { setVehicles(await vehiclesApi.list({ limit: 100 })); }
    catch (e: any) { notify(e.message, "err"); }
    finally { setLoading(false); }
  }

  function notify(msg: string, type: "ok" | "err" = "ok") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  // ── open form ──────────────────────────────────────────────────────────────
  function openCreate() {
    setEditId(null);
    setForm(EMPTY_FORM);
    setSpecs(EMPTY_SPECS);
    setTagInputs({ features: "", pros: "", cons: "" });
    setImagePreview(null);
    setImageMode("url");
    setShowForm(true);
    setTimeout(() => document.getElementById("admin-form")?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  function openEdit(v: Vehicle) {
    setEditId(v.id);
    setForm({
      name: v.name,
      fuel_type: v.fuel_type ?? "",
      seats: v.seats,
      price: v.price ? Number(v.price) : null,
      monthly_estimate: v.monthly_estimate ? Number(v.monthly_estimate) : null,
      main_image_url: v.main_image_url ?? "",
      overview: v.overview ?? "",
      features: v.features ?? [],
      pros: v.pros ?? [],
      cons: v.cons ?? [],
    });
    setSpecs(v.specs ? {
      engine: v.specs.engine ?? "",
      horsepower: v.specs.horsepower,
      torque: v.specs.torque,
      acceleration_0_100: v.specs.acceleration_0_100 ?? "",
      top_speed: v.specs.top_speed,
    } : EMPTY_SPECS);
    setTagInputs({ features: "", pros: "", cons: "" });
    setImagePreview(v.main_image_url ?? null);
    setImageMode(v.main_image_url?.startsWith("data:") ? "upload" : "url");
    setShowForm(true);
    setTimeout(() => document.getElementById("admin-form")?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  // ── image upload ───────────────────────────────────────────────────────────
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { notify("Image must be under 5 MB", "err"); return; }
    setUploadLoading(true);
    try {
      const b64 = await fileToBase64(file);
      setForm((f) => ({ ...f, main_image_url: b64 }));
      setImagePreview(b64);
    } catch { notify("Failed to read image", "err"); }
    finally { setUploadLoading(false); }
  }

  // ── tag helpers ────────────────────────────────────────────────────────────
  function addTag(field: "features" | "pros" | "cons") {
    const val = tagInputs[field].trim();
    if (!val) return;
    setForm((f) => ({ ...f, [field]: [...(f[field] ?? []), val] }));
    setTagInputs((t) => ({ ...t, [field]: "" }));
  }
  function removeTag(field: "features" | "pros" | "cons", idx: number) {
    setForm((f) => ({ ...f, [field]: (f[field] ?? []).filter((_, i) => i !== idx) }));
  }

  // ── save ───────────────────────────────────────────────────────────────────
  async function handleSave() {
    if (!form.name.trim()) { notify("Name is required", "err"); return; }
    setSaving(true);
    try {
      let saved: Vehicle;
      if (editId) {
        saved = await vehiclesApi.patch(editId, form);
      } else {
        saved = await vehiclesApi.create(form);
      }
      const hasSpecs = Object.values(specs).some((v) => v !== null && v !== "");
      if (hasSpecs) await specsApi.upsert(saved.id, specs);
      notify(editId ? "Vehicle updated!" : "Vehicle created!");
      setShowForm(false);
      await load();
    } catch (e: any) {
      notify(e.message, "err");
    } finally {
      setSaving(false);
    }
  }

  // ── delete ─────────────────────────────────────────────────────────────────
  async function handleDelete(id: number, name: string) {
    if (!confirm(`Delete "${name}"?\nThis cannot be undone.`)) return;
    setDeletingId(id);
    try {
      await vehiclesApi.delete(id);
      notify("Vehicle deleted.");
      setVehicles((prev) => prev.filter((v) => v.id !== id));
      if (editId === id) setShowForm(false);
    } catch (e: any) {
      notify(e.message, "err");
    } finally {
      setDeletingId(null);
    }
  }

  // ── field helper ───────────────────────────────────────────────────────────
  function field(label: string, key: keyof VehicleInput, type = "text", placeholder = "") {
    return (
      <div className="space-y-1.5">
        <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          value={(form as any)[key] ?? ""}
          onChange={(e) => setForm({ ...form, [key]: type === "number" ? (e.target.value ? Number(e.target.value) : null) : e.target.value })}
          className="input-glass w-full h-10 rounded-xl px-3 text-sm"
        />
      </div>
    );
  }

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-24 right-6 z-50 glass glass-border rounded-xl px-5 py-3 flex items-center gap-2 text-sm shadow-xl transition-all ${toast.type === "ok" ? "text-emerald-400" : "text-rose-400"}`}>
          {toast.type === "ok" ? <CheckCircle className="h-4 w-4 shrink-0" /> : <AlertTriangle className="h-4 w-4 shrink-0" />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <section className="relative py-14 overflow-hidden">
        <div className="orb w-80 h-80 top-0 right-0" style={{ background: "var(--orb-1)" }} />
        <div className="container relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="section-label mb-3">Admin Panel</div>
            <h1 className="text-4xl font-extrabold" style={{ color: "var(--text-primary)" }}>Vehicle Management</h1>
            <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>{vehicles.length} vehicles · <Link href="/" className="text-blue-400 hover:underline">← Back to site</Link></p>
          </div>
          <button onClick={openCreate} className="btn-primary-glow flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm w-fit">
            <Plus className="h-4 w-4" /> Add Vehicle
          </button>
        </div>
      </section>

      <div className="container pb-24 space-y-6">

        {/* ── FORM ── */}
        {showForm && (
          <div id="admin-form" className="glass-strong glass-border rounded-2xl p-7 space-y-7">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                {editId ? `Editing Vehicle #${editId}` : "New Vehicle"}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-white/5" style={{ color: "var(--text-muted)" }}>
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Image upload */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>Vehicle Image</label>
                <div className="flex gap-1">
                  {(["url", "upload"] as const).map((m) => (
                    <button key={m} onClick={() => setImageMode(m)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${imageMode === m ? "btn-primary-glow" : "btn-glass"}`}>
                      {m === "url" ? "URL" : "Upload"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 items-start">
                {/* Preview */}
                <div className="w-32 h-24 rounded-xl overflow-hidden shrink-0 skeu-inset flex items-center justify-center">
                  {imagePreview?.startsWith("http") || imagePreview?.startsWith("data:") ? (
                    <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="h-8 w-8 opacity-30" style={{ color: "var(--text-muted)" }} />
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  {imageMode === "url" ? (
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/..."
                      value={form.main_image_url ?? ""}
                      onChange={(e) => {
                        setForm({ ...form, main_image_url: e.target.value });
                        setImagePreview(e.target.value);
                      }}
                      className="input-glass w-full h-10 rounded-xl px-3 text-sm"
                    />
                  ) : (
                    <>
                      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                      <button onClick={() => fileRef.current?.click()} disabled={uploadLoading}
                        className="btn-glass flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium w-full justify-center">
                        {uploadLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                        {uploadLoading ? "Processing..." : "Choose Image (max 5 MB)"}
                      </button>
                      {form.main_image_url?.startsWith("data:") && (
                        <p className="text-xs text-emerald-400 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" /> Image loaded as base64
                        </p>
                      )}
                    </>
                  )}
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {imageMode === "upload" ? "Image will be stored as base64 in the database." : "Paste a direct image URL."}
                  </p>
                </div>
              </div>
            </div>

            {/* Basic fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {field("Name *", "name", "text", "BMW M5 Competition")}
              {field("Fuel Type", "fuel_type", "text", "Petrol / Hybrid / Electric")}
              {field("Seats", "seats", "number", "5")}
              {field("Price ($)", "price", "number", "105000")}
              {field("Monthly Estimate ($)", "monthly_estimate", "number", "1750")}
            </div>

            {/* Overview */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>Overview</label>
              <textarea rows={3} placeholder="Full vehicle description..."
                value={form.overview ?? ""}
                onChange={(e) => setForm({ ...form, overview: e.target.value })}
                className="input-glass w-full rounded-xl px-3 py-2.5 text-sm resize-none" />
            </div>

            {/* Array tag fields */}
            {(["features", "pros", "cons"] as const).map((field_) => (
              <div key={field_} className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
                  {field_ === "features" ? "Features" : field_ === "pros" ? "Pros" : "Cons"}
                </label>
                <div className="flex gap-2">
                  <input
                    placeholder={`Type and press Enter or click +`}
                    value={tagInputs[field_]}
                    onChange={(e) => setTagInputs((t) => ({ ...t, [field_]: e.target.value }))}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(field_); } }}
                    className="input-glass flex-1 h-9 rounded-xl px-3 text-sm"
                  />
                  <button onClick={() => addTag(field_)} className="btn-glass px-3 py-1.5 rounded-xl text-xs font-semibold">
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 min-h-[28px]">
                  {(form[field_] ?? []).map((tag, i) => (
                    <span key={i} className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border ${
                      field_ === "pros" ? "bg-emerald-500/10 border-emerald-400/20 text-emerald-400" :
                      field_ === "cons" ? "bg-rose-500/10 border-rose-400/20 text-rose-400" :
                      "badge-glass"
                    }`}>
                      {tag}
                      <button onClick={() => removeTag(field_, i)} className="hover:opacity-60 transition-opacity">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Specs */}
            <div className="skeu-inset rounded-xl p-5 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>Technical Specs (optional)</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {([
                  { label: "Engine", key: "engine", type: "text", ph: "4.4L Twin-Turbo V8" },
                  { label: "HP", key: "horsepower", type: "number", ph: "627" },
                  { label: "Torque (Nm)", key: "torque", type: "number", ph: "750" },
                  { label: "0–100 km/h", key: "acceleration_0_100", type: "text", ph: "3.3s" },
                  { label: "Top Speed (km/h)", key: "top_speed", type: "number", ph: "305" },
                ] as const).map(({ label, key, type, ph }) => (
                  <div key={key} className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>{label}</label>
                    <input type={type} placeholder={ph}
                      value={(specs as any)[key] ?? ""}
                      onChange={(e) => setSpecs({ ...specs, [key]: type === "number" ? (e.target.value ? Number(e.target.value) : null) : e.target.value })}
                      className="input-glass w-full h-9 rounded-xl px-3 text-xs" />
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button onClick={handleSave} disabled={saving}
                className="btn-primary-glow flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm disabled:opacity-50">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {editId ? "Save Changes" : "Create Vehicle"}
              </button>
              <button onClick={() => setShowForm(false)} className="btn-glass px-6 py-3 rounded-xl font-semibold text-sm">
                Cancel
              </button>
              {editId && (
                <button onClick={() => handleDelete(editId, form.name ?? "")} disabled={deletingId === editId}
                  className="ml-auto flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-500/10 transition-all border border-rose-500/20">
                  {deletingId === editId ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  Delete Vehicle
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── VEHICLE LIST ── */}
        {loading ? (
          <div className="flex items-center justify-center py-24 gap-3" style={{ color: "var(--text-muted)" }}>
            <Loader2 className="h-6 w-6 animate-spin text-blue-400" /><span>Loading vehicles...</span>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="glass glass-border rounded-2xl p-16 text-center space-y-4">
            <p className="text-xl font-semibold" style={{ color: "var(--text-primary)" }}>No vehicles yet</p>
            <button onClick={openCreate} className="btn-primary-glow inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm">
              <Plus className="h-4 w-4" /> Add your first vehicle
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {vehicles.map((v) => (
              <div key={v.id} className="glass glass-border rounded-2xl overflow-hidden">
                {/* Row */}
                <div className="p-4 flex items-center gap-4">
                  {/* Thumbnail */}
                  <div className="w-16 h-12 rounded-xl overflow-hidden shrink-0 skeu-inset flex items-center justify-center">
                    {(v.main_image_url?.startsWith("http") || v.main_image_url?.startsWith("data:")) ? (
                      <img src={v.main_image_url} alt={v.name} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="h-5 w-5 opacity-30" style={{ color: "var(--text-muted)" }} />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono px-2 py-0.5 rounded-md shrink-0" style={{ background: "var(--bg-surface)", color: "var(--text-muted)" }}>#{v.id}</span>
                      <p className="font-bold truncate" style={{ color: "var(--text-primary)" }}>{v.name}</p>
                    </div>
                    <div className="flex gap-3 mt-0.5 text-xs flex-wrap" style={{ color: "var(--text-muted)" }}>
                      {v.fuel_type && <span>{v.fuel_type}</span>}
                      {v.seats && <span>{v.seats} seats</span>}
                      {v.price && <span className="text-gradient font-semibold">${Number(v.price).toLocaleString()}</span>}
                      {v.features?.length ? <span>{v.features.length} features</span> : null}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => setExpandedId(expandedId === v.id ? null : v.id)}
                      className="p-2 rounded-lg hover:bg-white/5 transition-all" style={{ color: "var(--text-muted)" }}
                      title="Expand details">
                      {expandedId === v.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                    <button onClick={() => openEdit(v)}
                      className="p-2 rounded-lg hover:bg-blue-500/10 hover:text-blue-400 transition-all" style={{ color: "var(--text-muted)" }}
                      title="Edit">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(v.id, v.name)} disabled={deletingId === v.id}
                      className="p-2 rounded-lg hover:bg-rose-500/10 hover:text-rose-400 transition-all" style={{ color: "var(--text-muted)" }}
                      title="Delete">
                      {deletingId === v.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded */}
                {expandedId === v.id && (
                  <div className="px-5 pb-5 pt-3 space-y-4 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                    {v.overview && (
                      <div>
                        <p className="text-xs uppercase tracking-wide mb-1" style={{ color: "var(--text-muted)" }}>Overview</p>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{v.overview}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {(["features", "pros", "cons"] as const).map((f) => v[f]?.length ? (
                        <div key={f}>
                          <p className={`text-xs uppercase tracking-wide mb-2 ${f === "pros" ? "text-emerald-400" : f === "cons" ? "text-rose-400" : ""}`} style={f === "features" ? { color: "var(--text-muted)" } : {}}>
                            {f}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {v[f]!.map((tag) => (
                              <span key={tag} className={`px-2 py-0.5 rounded-full text-xs border ${
                                f === "pros" ? "bg-emerald-500/10 border-emerald-400/20 text-emerald-400" :
                                f === "cons" ? "bg-rose-500/10 border-rose-400/20 text-rose-400" :
                                "badge-glass"
                              }`}>{tag}</span>
                            ))}
                          </div>
                        </div>
                      ) : null)}
                    </div>
                    {v.specs && (
                      <div>
                        <p className="text-xs uppercase tracking-wide mb-2" style={{ color: "var(--text-muted)" }}>Specs</p>
                        <div className="flex flex-wrap gap-3 text-xs" style={{ color: "var(--text-secondary)" }}>
                          {v.specs.engine && <span>Engine: <strong style={{ color: "var(--text-primary)" }}>{v.specs.engine}</strong></span>}
                          {v.specs.horsepower && <span>HP: <strong style={{ color: "var(--text-primary)" }}>{v.specs.horsepower}</strong></span>}
                          {v.specs.torque && <span>Torque: <strong style={{ color: "var(--text-primary)" }}>{v.specs.torque} Nm</strong></span>}
                          {v.specs.acceleration_0_100 && <span>0–100: <strong style={{ color: "var(--text-primary)" }}>{v.specs.acceleration_0_100}</strong></span>}
                          {v.specs.top_speed && <span>Top Speed: <strong style={{ color: "var(--text-primary)" }}>{v.specs.top_speed} km/h</strong></span>}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
