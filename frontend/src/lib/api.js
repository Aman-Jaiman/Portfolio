import axios from "axios";

const base =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  (import.meta.env.PROD ? "" : "");

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
