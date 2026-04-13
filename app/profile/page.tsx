"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, Mail, LogOut, Edit3, CheckCircle, Loader2, ShoppingCart, Heart } from "lucide-react";
import { usersApi, type User as ApiUser } from "@/lib/api";
import { saveUser, loadUser, clearUser } from "@/lib/userStore";

type Tab = "profile" | "register" | "login";

export default function ProfilePage() {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [tab, setTab] = useState<Tab>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Register form
  const [reg, setReg] = useState({ username: "", email: "", password: "" });
  // Login form (by user ID — simple, no JWT)
  const [loginId, setLoginId] = useState("");

  useEffect(() => {
    const stored = loadUser();
    if (stored) { setUser(stored); setTab("profile"); }
  }, []);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const u = await usersApi.register(reg);
      saveUser(u);
      setUser(u);
      setTab("profile");
      setSuccess("Account created successfully!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const u = await usersApi.get(Number(loginId));
      saveUser(u);
      setUser(u);
      setTab("profile");
      setSuccess(`Welcome back, ${u.username}!`);
    } catch (err: any) {
      setError("User not found. Check your User ID.");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    clearUser();
    setUser(null);
    setTab("login");
    setSuccess(null);
  }

  return (
    <div>
      <section className="relative py-20 overflow-hidden text-center">
        <div className="orb w-80 h-80 top-0 left-1/2 -translate-x-1/2" style={{ background: "var(--orb-1)" }} />
        <div className="container relative z-10 space-y-4">
          <div className="section-label shimmer mx-auto w-fit">
            <User className="h-3.5 w-3.5" /> Account
          </div>
          <h1 className="text-5xl font-extrabold" style={{ color: "var(--text-primary)" }}>
            {user ? `Hello, ${user.username}` : "My Account"}
          </h1>
        </div>
      </section>

      <section className="container pb-20 max-w-lg mx-auto space-y-5">
        {success && (
          <div className="glass glass-border rounded-xl px-5 py-3 flex items-center gap-2 text-emerald-400 text-sm">
            <CheckCircle className="h-4 w-4 shrink-0" />{success}
          </div>
        )}

        {/* Logged in */}
        {user && (
          <div className="glass glass-border rounded-2xl p-7 space-y-6">
            <div className="flex items-center gap-4">
              <div className="skeu-icon-wrap w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
                <User className="h-7 w-7 text-blue-400 relative z-10" />
              </div>
              <div>
                <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{user.username}</p>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{user.email}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>User ID: {user.id} · Member since {new Date(user.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long" })}</p>
              </div>
            </div>

            <div className="skeu-divider" />

            <div className="grid grid-cols-2 gap-3">
              <Link href="/cart" className="skeu-card glass-border rounded-xl p-4 flex items-center gap-3 hover:scale-[1.02] transition-transform">
                <div className="skeu-icon-wrap w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
                  <ShoppingCart className="h-4 w-4 text-blue-400 relative z-10" />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>My Cart</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>View saved vehicles</p>
                </div>
              </Link>
              <Link href="/wishlist" className="skeu-card glass-border rounded-xl p-4 flex items-center gap-3 hover:scale-[1.02] transition-transform">
                <div className="skeu-icon-wrap w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
                  <Heart className="h-4 w-4 text-rose-400 relative z-10" />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Wishlist</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>Saved vehicles</p>
                </div>
              </Link>
            </div>

            <div className="skeu-inset rounded-xl p-4 space-y-2 text-sm">
              <div className="flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
                <Mail className="h-4 w-4 text-blue-400 shrink-0" />{user.email}
              </div>
            </div>

            <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-rose-400 hover:text-rose-300 transition-colors">
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
        )}

        {/* Not logged in */}
        {!user && (
          <>
            {/* Tab switcher */}
            <div className="flex gap-2">
              {(["login", "register"] as Tab[]).map((t) => (
                <button key={t} onClick={() => { setTab(t); setError(null); }}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === t ? "btn-primary-glow" : "btn-glass"}`}>
                  {t === "login" ? "Login by ID" : "Register"}
                </button>
              ))}
            </div>

            {error && (
              <div className="glass glass-border rounded-xl px-5 py-3 text-rose-400 text-sm">{error}</div>
            )}

            {/* Register */}
            {tab === "register" && (
              <form onSubmit={handleRegister} className="glass glass-border rounded-2xl p-7 space-y-4">
                <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>Create Account</h2>
                {[
                  { label: "Username", key: "username", type: "text", placeholder: "johndoe" },
                  { label: "Email", key: "email", type: "email", placeholder: "john@example.com" },
                  { label: "Password", key: "password", type: "password", placeholder: "••••••••" },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key} className="space-y-1.5">
                    <label className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{label}</label>
                    <input required type={type} placeholder={placeholder}
                      value={reg[key as keyof typeof reg]}
                      onChange={(e) => setReg({ ...reg, [key]: e.target.value })}
                      className="input-glass w-full h-10 rounded-xl px-3 text-sm" />
                  </div>
                ))}
                <button type="submit" disabled={loading} className="btn-primary-glow w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2">
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  Create Account
                </button>
              </form>
            )}

            {/* Login */}
            {tab === "login" && (
              <form onSubmit={handleLogin} className="glass glass-border rounded-2xl p-7 space-y-4">
                <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>Login</h2>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Enter your User ID (shown after registration). Full JWT auth can be added later.
                </p>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>User ID</label>
                  <input required type="number" placeholder="e.g. 1" value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    className="input-glass w-full h-10 rounded-xl px-3 text-sm" />
                </div>
                <button type="submit" disabled={loading} className="btn-primary-glow w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2">
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  Login
                </button>
                <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
                  Don't have an account?{" "}
                  <button type="button" onClick={() => setTab("register")} className="text-blue-400 hover:underline">Register here</button>
                </p>
              </form>
            )}
          </>
        )}
      </section>
    </div>
  );
}
