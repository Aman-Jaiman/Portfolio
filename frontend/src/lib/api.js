import axios from "axios";

function normalizeApiUrl(value) {
  if (!value) return "";

  const cleaned = value
    .trim()
    .replace(/^VITE_API_URL=/i, "")
    .replace(/\/$/, "");

  return cleaned;
}

const base = normalizeApiUrl(import.meta.env.VITE_API_URL) || (import.meta.env.PROD ? "" : "");

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
