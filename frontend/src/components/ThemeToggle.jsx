import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeContext.jsx";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      className="p-2 rounded-xl glass hover:scale-105 transition-transform text-slate-700 dark:text-slate-200"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
