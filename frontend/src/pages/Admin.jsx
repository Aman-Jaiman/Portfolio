import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { api, setAdminToken } from "../lib/api.js";
import { Navbar } from "../components/Navbar.jsx";
import { Trash2, Pencil, Plus, ArrowLeft, KeyRound } from "lucide-react";

const emptyProject = {
  title: "",
  description: "",
  techStack: "",
  githubUrl: "",
  liveUrl: "",
  order: 0,
};

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem("admin_token") || "");
  const [authed, setAuthed] = useState(!!localStorage.getItem("admin_token"));
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState(emptyProject);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("projects");

  useEffect(() => {
    const t = localStorage.getItem("admin_token");
    if (t) setAdminToken(t);
  }, []);

  function saveToken() {
    localStorage.setItem("admin_token", token);
    setAdminToken(token);
    setAuthed(true);
    load();
  }

  function logout() {
    localStorage.removeItem("admin_token");
    setAdminToken(null);
    setToken("");
    setAuthed(false);
    setProjects([]);
    setMessages([]);
  }

  async function load() {
    setError("");
    setAdminToken(localStorage.getItem("admin_token") || "");
    try {
      const { data } = await api.get("/projects/all");
      setProjects(data);
    } catch (e) {
      setError(e.response?.data?.error || "Failed to load projects. Check ADMIN_TOKEN.");
      setAuthed(false);
    }
    try {
      const { data } = await api.get("/messages");
      setMessages(data);
    } catch {
      /* optional */
    }
  }

  useEffect(() => {
    if (authed) load();
  }, [authed]);

  async function submitProject(e) {
    e.preventDefault();
    const payload = {
      ...form,
      techStack: form.techStack.split(",").map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, payload);
      } else {
        await api.post("/projects", payload);
      }
      setForm(emptyProject);
      setEditingId(null);
      load();
    } catch (err) {
      setError(err.response?.data?.error || "Save failed");
    }
  }

  function startEdit(p) {
    setEditingId(p._id);
    setForm({
      title: p.title,
      description: p.description,
      techStack: (p.techStack || []).join(", "),
      githubUrl: p.githubUrl || "",
      liveUrl: p.liveUrl || "",
      order: p.order ?? 0,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function remove(id) {
    if (!confirm("Delete this project?")) return;
    try {
      await api.delete(`/projects/${id}`);
      load();
    } catch (err) {
      setError(err.response?.data?.error || "Delete failed");
    }
  }

  return (
    <>
      <Helmet>
        <title>Admin | Portfolio</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <Navbar />
      <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-brand-600 dark:text-brand-400 mb-6 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to site
        </Link>

        <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">Admin</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm">Manage projects and view messages. Requires backend ADMIN_TOKEN.</p>

        {!authed ? (
          <div className="mt-8 glass rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 max-w-md">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium mb-4">
              <KeyRound className="w-5 h-5" />
              Enter admin token
            </div>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Bearer token from .env"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 px-4 py-3 text-slate-900 dark:text-white mb-3"
            />
            <button
              type="button"
              onClick={saveToken}
              className="px-6 py-2.5 rounded-xl bg-brand-600 text-white font-medium hover:bg-brand-700"
            >
              Continue
            </button>
          </div>
        ) : (
          <>
            <div className="flex gap-2 mt-6 mb-4">
              <button
                type="button"
                onClick={() => setTab("projects")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === "projects" ? "bg-brand-500/20 text-brand-700 dark:text-brand-300" : "text-slate-600"}`}
              >
                Projects
              </button>
              <button
                type="button"
                onClick={() => setTab("messages")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === "messages" ? "bg-brand-500/20 text-brand-700 dark:text-brand-300" : "text-slate-600"}`}
              >
                Messages ({messages.length})
              </button>
              <button type="button" onClick={logout} className="ml-auto text-sm text-red-600 dark:text-red-400">
                Log out
              </button>
            </div>

            {error && <p className="text-red-600 dark:text-red-400 text-sm mb-4">{error}</p>}

            {tab === "projects" && (
              <>
                <form onSubmit={submitProject} className="glass rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 space-y-3 mb-8">
                  <h2 className="font-display font-semibold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                    {editingId ? <Pencil className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    {editingId ? "Edit project" : "Add project"}
                  </h2>
                  <input
                    required
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 px-4 py-2 text-slate-900 dark:text-white"
                  />
                  <textarea
                    required
                    placeholder="Description"
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 px-4 py-2 text-slate-900 dark:text-white"
                  />
                  <input
                    placeholder="Tech stack (comma separated)"
                    value={form.techStack}
                    onChange={(e) => setForm((f) => ({ ...f, techStack: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 px-4 py-2 text-slate-900 dark:text-white"
                  />
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      placeholder="GitHub URL"
                      value={form.githubUrl}
                      onChange={(e) => setForm((f) => ({ ...f, githubUrl: e.target.value }))}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 px-4 py-2 text-slate-900 dark:text-white"
                    />
                    <input
                      placeholder="Live demo URL"
                      value={form.liveUrl}
                      onChange={(e) => setForm((f) => ({ ...f, liveUrl: e.target.value }))}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 px-4 py-2 text-slate-900 dark:text-white"
                    />
                  </div>
                  <input
                    type="number"
                    placeholder="Order"
                    value={form.order}
                    onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
                    className="w-full sm:w-32 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 px-4 py-2 text-slate-900 dark:text-white"
                  />
                  <div className="flex gap-2">
                    <button type="submit" className="px-6 py-2 rounded-xl bg-brand-600 text-white font-medium">
                      {editingId ? "Update" : "Create"}
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null);
                          setForm(emptyProject);
                        }}
                        className="px-6 py-2 rounded-xl glass"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>

                <ul className="space-y-3">
                  {projects.map((p) => (
                    <li key={p._id} className="glass rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/50 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{p.title}</p>
                        <p className="text-xs text-slate-500 truncate max-w-md">{p.description}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button type="button" onClick={() => startEdit(p)} className="p-2 rounded-lg glass" aria-label="Edit">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button type="button" onClick={() => remove(p._id)} className="p-2 rounded-lg text-red-600 glass" aria-label="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {tab === "messages" && (
              <ul className="space-y-3">
                {messages.length === 0 && <p className="text-slate-500 text-sm">No messages yet.</p>}
                {messages.map((m) => (
                  <li key={m._id} className="glass rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/50">
                    <p className="font-medium text-slate-900 dark:text-white">{m.name}</p>
                    <p className="text-sm text-brand-600 dark:text-brand-400">{m.email}</p>
                    <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm whitespace-pre-wrap">{m.message}</p>
                    <p className="text-xs text-slate-400 mt-2">{new Date(m.createdAt).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </>
  );
}
