import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { profile } from "../data/profile.js";
import { ThemeToggle } from "./ThemeToggle.jsx";
import { useActiveSection } from "../hooks/useActiveSection.js";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#github", label: "Coding" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const location = useLocation();
  const onHome = location.pathname === "/";

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 lg:px-8 pt-4">
      <nav className="max-w-6xl mx-auto flex items-center justify-between gap-4 glass rounded-2xl px-4 py-3">
        <Link to="/" className="font-display font-semibold text-lg text-brand-600 dark:text-brand-400">
          {profile.name.split(" ")[0]}
          <span className="text-slate-800 dark:text-slate-200">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {onHome &&
            links.map(({ href, label }) => {
              const id = href.replace("#", "");
              const isActive = active === id;
              return (
                <a
                  key={href}
                  href={href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-brand-500/15 text-brand-700 dark:text-brand-300"
                      : "text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400"
                  }`}
                >
                  {label}
                </a>
              );
            })}
          <Link
            to="/admin"
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-500 dark:text-slate-500 hover:text-brand-600"
          >
            Admin
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="md:hidden p-2 rounded-xl glass"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {open && onHome && (
        <div className="md:hidden mt-2 max-w-6xl mx-auto glass rounded-2xl p-4 flex flex-col gap-1">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="py-2 px-3 rounded-lg text-slate-700 dark:text-slate-200"
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <Link to="/admin" className="py-2 px-3 rounded-lg text-slate-500" onClick={() => setOpen(false)}>
            Admin
          </Link>
        </div>
      )}
    </header>
  );
}
