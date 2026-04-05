import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/profile.js";

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React & Tailwind.
        </p>
        <div className="flex items-center gap-4">
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors" aria-label="GitHub">
            <Github className="w-5 h-5" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors" aria-label="Email">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
