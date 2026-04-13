// ─── Base ────────────────────────────────────────────────────────────────────
export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail ?? "Request failed");
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

// ─── Types ───────────────────────────────────────────────────────────────────
export interface VehicleSpec {
  vehicle_id: number;
  engine: string | null;
  horsepower: number | null;
  torque: number | null;
  acceleration_0_100: string | null;
  top_speed: number | null;
}

export interface Vehicle {
  id: number;
  name: string;
  fuel_type: string | null;
  seats: number | null;
  price: string | null;          // Decimal comes back as string from FastAPI
  monthly_estimate: string | null;
  main_image_url: string | null;
  overview: string | null;
  features: string[] | null;
  pros: string[] | null;
  cons: string[] | null;
  specs?: VehicleSpec | null;
}

export interface VehicleInput {
  name: string;
  fuel_type?: string | null;
  seats?: number | null;
  price?: number | null;
  monthly_estimate?: number | null;
  main_image_url?: string | null;
  overview?: string | null;
  features?: string[] | null;
  pros?: string[] | null;
  cons?: string[] | null;
}

export interface Review {
  id: number;
  vehicle_id: number;
  user_id: number;
  username: string;
  rating: number;
  review_text: string | null;
  helpful_count: number;
  created_at: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

export interface CartItem {
  user_id: number;
  vehicle_id: number;
  added_at: string;
  vehicle: Vehicle;
}

export interface WishlistItem {
  user_id: number;
  vehicle_id: number;
  saved_at: string;
  vehicle: Vehicle;
}

// ─── Vehicles ────────────────────────────────────────────────────────────────
export const vehiclesApi = {
  /** GET /api/vehicles/ — list with optional filters */
  list: (params?: {
    fuel_type?: string; min_price?: number; max_price?: number;
    seats?: number; page?: number; limit?: number;
  }) => {
    const q = new URLSearchParams();
    if (params?.fuel_type)    q.set("fuel_type",  params.fuel_type);
    if (params?.min_price != null) q.set("min_price", String(params.min_price));
    if (params?.max_price != null) q.set("max_price", String(params.max_price));
    if (params?.seats != null)     q.set("seats",     String(params.seats));
    if (params?.page  != null)     q.set("page",      String(params.page));
    if (params?.limit != null)     q.set("limit",     String(params.limit));
    return request<Vehicle[]>(`/api/vehicles/?${q}`);
  },

  /** GET /api/vehicles/{id} — single vehicle with specs */
  get: (id: number) => request<Vehicle>(`/api/vehicles/${id}`),

  /** POST /api/vehicles/ — create new vehicle */
  create: (body: VehicleInput) =>
    request<Vehicle>("/api/vehicles/", { method: "POST", body: JSON.stringify(body) }),

  /** PATCH /api/vehicles/{id} — partial update (only sent fields change) */
  patch: (id: number, body: Partial<VehicleInput>) =>
    request<Vehicle>(`/api/vehicles/${id}`, { method: "PATCH", body: JSON.stringify(body) }),

  /** PUT /api/vehicles/{id} — full replace */
  put: (id: number, body: VehicleInput) =>
    request<Vehicle>(`/api/vehicles/${id}`, { method: "PUT", body: JSON.stringify(body) }),

  /** DELETE /api/vehicles/{id} */
  delete: (id: number) =>
    request<void>(`/api/vehicles/${id}`, { method: "DELETE" }),
};

// ─── Specs ───────────────────────────────────────────────────────────────────
export const specsApi = {
  /** GET /api/vehicles/{id}/specs */
  get: (vehicleId: number) =>
    request<VehicleSpec>(`/api/vehicles/${vehicleId}/specs`),

  /** PUT /api/vehicles/{id}/specs — upsert (create or update) */
  upsert: (vehicleId: number, body: Omit<VehicleSpec, "vehicle_id">) =>
    request<VehicleSpec>(`/api/vehicles/${vehicleId}/specs`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
};

// ─── Reviews ─────────────────────────────────────────────────────────────────
export const reviewsApi = {
  /** GET /api/vehicles/{id}/reviews */
  list: (vehicleId: number) =>
    request<Review[]>(`/api/vehicles/${vehicleId}/reviews`),

  /** POST /api/vehicles/{id}/reviews */
  create: (vehicleId: number, body: { user_id: number; rating: number; review_text: string }) =>
    request<Review>(`/api/vehicles/${vehicleId}/reviews`, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  /** DELETE /api/reviews/{id} */
  delete: (reviewId: number) =>
    request<void>(`/api/reviews/${reviewId}`, { method: "DELETE" }),
};

// ─── Users ───────────────────────────────────────────────────────────────────
export const usersApi = {
  /** POST /api/users/register */
  register: (body: { username: string; email: string; password: string }) =>
    request<User>("/api/users/register", { method: "POST", body: JSON.stringify(body) }),

  /** GET /api/users/{id} */
  get: (userId: number) =>
    request<User>(`/api/users/${userId}`),
};

// ─── Cart ─────────────────────────────────────────────────────────────────────
export const cartApi = {
  /** GET /api/users/{userId}/cart */
  list: (userId: number) =>
    request<CartItem[]>(`/api/users/${userId}/cart`),

  /** POST /api/users/{userId}/cart/{vehicleId} */
  add: (userId: number, vehicleId: number) =>
    request<{ message: string }>(`/api/users/${userId}/cart/${vehicleId}`, { method: "POST" }),

  /** DELETE /api/users/{userId}/cart/{vehicleId} */
  remove: (userId: number, vehicleId: number) =>
    request<void>(`/api/users/${userId}/cart/${vehicleId}`, { method: "DELETE" }),
};

// ─── Wishlist ─────────────────────────────────────────────────────────────────
export const wishlistApi = {
  /** GET /api/users/{userId}/wishlists */
  list: (userId: number) =>
    request<WishlistItem[]>(`/api/users/${userId}/wishlists`),

  /** POST /api/users/{userId}/wishlist/{vehicleId} */
  add: (userId: number, vehicleId: number) =>
    request<{ message: string }>(`/api/users/${userId}/wishlist/${vehicleId}`, { method: "POST" }),

  /** DELETE /api/users/{userId}/wishlist/{vehicleId} */
  remove: (userId: number, vehicleId: number) =>
    request<void>(`/api/users/${userId}/wishlist/${vehicleId}`, { method: "DELETE" }),
};
