import { useState } from "react";
import { MapPin, Mail, Github, Linkedin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { profile } from "../data/profile.js";
import { MotionSection } from "./MotionSection.jsx";
import { api } from "../lib/api.js";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await api.post("/messages", form);
      setStatus("ok");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("err");
    } finally {
      setLoading(false);
    }
  }

  return (
    <MotionSection id="contact" className="section-pad bg-slate-100/50 dark:bg-slate-900/30">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Contact</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400">Send a message — stored in MongoDB when the API is running.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50">
            <h3 className="font-display font-semibold text-slate-900 dark:text-white mb-4">Connect</h3>
            <ul className="space-y-4 text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 text-brand-500 mt-0.5" />
                <span>{profile.location}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0 text-brand-500" />
                <a href={`mailto:${profile.email}`} className="hover:text-brand-600 dark:hover:text-brand-400">
                  {profile.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Github className="w-5 h-5 shrink-0 text-brand-500" />
                <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-brand-600 dark:hover:text-brand-400 break-all">
                  GitHub
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Linkedin className="w-5 h-5 shrink-0 text-brand-500" />
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-brand-600 dark:hover:text-brand-400 break-all">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="lg:col-span-3 glass rounded-2xl p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50 space-y-4"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Name
            </label>
            <input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-shadow resize-y min-h-[120px]"
            />
          </div>

          {status === "ok" && (
            <p className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm">
              <CheckCircle className="w-4 h-4" />
              Message sent. Thank you!
            </p>
          )}
          {status === "err" && (
            <p className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              Could not send. Is the backend running with MongoDB?
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-medium shadow-lg shadow-brand-500/25 transition-all"
          >
            {loading ? "Sending…" : (
              <>
                <Send className="w-4 h-4" />
                Send message
              </>
            )}
          </button>
        </form>
      </div>
    </MotionSection>
  );
}
