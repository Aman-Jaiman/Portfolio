import axios from "axios";

const DEFAULT_PROD_API_URL = "https://portfolio-backend-6015.onrender.com";

function normalizeApiUrl(value) {
  if (!value) return "";

  const cleaned = value
    .trim()
    .replace(/^VITE_API_URL=/i, "")
    .replace(/\/$/, "")
    .replace(/\/api$/i, "")
    .trim();

  return cleaned;
}

const base =
  normalizeApiUrl(import.meta.env.VITE_API_URL) ||
  (import.meta.env.PROD ? DEFAULT_PROD_API_URL : "");

export const api = axios.create({
  baseURL: base ? `${base}/api` : "/api",
  headers: { "Content-Type": "application/json" },
});

export function setAdminToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}
