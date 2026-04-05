import { profile } from "../data/profile.js";
import { MotionSection } from "./MotionSection.jsx";
import { Github } from "lucide-react";

const STATS_BASE = "https://github-readme-stats.vercel.app/api";
const LANG_BASE = "https://github-readme-stats.vercel.app/api/top-langs";
const CHART_BASE = "https://ghchart.rshah.org";

export function GitHubStats() {
  const u = profile.githubUsername || "yourusername";
  const statsUrl = `${STATS_BASE}?username=${encodeURIComponent(u)}&show_icons=true&hide_border=true&theme=default&bg_color=00000000`;
  const statsDark = `${STATS_BASE}?username=${encodeURIComponent(u)}&show_icons=true&hide_border=true&theme=tokyonight&bg_color=00000000`;
  const langsUrl = `${LANG_BASE}?username=${encodeURIComponent(u)}&layout=compact&hide_border=true&theme=default&bg_color=00000000`;
  const langsDark = `${LANG_BASE}?username=${encodeURIComponent(u)}&layout=compact&hide_border=true&theme=tokyonight&bg_color=00000000`;
  const contribUrl = `${CHART_BASE}/${encodeURIComponent(u)}`;

  return (
    <MotionSection id="github" className="section-pad">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">GitHub</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Public activity and language mix. Set <code className="text-sm bg-slate-200 dark:bg-slate-800 px-1 rounded">VITE_GITHUB_USERNAME</code> in{" "}
          <code className="text-sm bg-slate-200 dark:bg-slate-800 px-1 rounded">.env</code>.
        </p>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-brand-600 dark:text-brand-400 font-medium hover:underline"
        >
          <Github className="w-4 h-4" />
          Open profile
        </a>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <div className="glass rounded-2xl p-4 border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">Stats</p>
          <img src={statsUrl} alt={`GitHub stats for ${u}`} className="w-full max-h-48 object-contain dark:hidden" loading="lazy" />
          <img src={statsDark} alt="" className="w-full max-h-48 object-contain hidden dark:block" loading="lazy" />
        </div>
        <div className="glass rounded-2xl p-4 border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">Top languages</p>
          <img src={langsUrl} alt={`Top languages for ${u}`} className="w-full object-contain dark:hidden" loading="lazy" />
          <img src={langsDark} alt="" className="w-full object-contain hidden dark:block" loading="lazy" />
        </div>
      </div>

      <div className="mt-6 glass rounded-2xl p-4 border border-slate-200/50 dark:border-slate-700/50 overflow-x-auto">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">Contribution graph</p>
        <img src={contribUrl} alt={`GitHub contributions for ${u}`} className="min-w-full h-auto rounded-lg opacity-90 dark:opacity-95" loading="lazy" />
      </div>
    </MotionSection>
  );
}
