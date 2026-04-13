// Simple localStorage-based user session (no JWT needed for now)
import type { User } from "./api";

const KEY = "ae_user";

export function saveUser(user: User) {
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(user));
}

export function loadUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearUser() {
  if (typeof window !== "undefined") localStorage.removeItem(KEY);
}
