import { Code2, Github } from "lucide-react";
import { profile } from "../data/profile.js";
import { MotionSection } from "./MotionSection.jsx";

const STATS_BASE = "https://github-readme-stats.vercel.app/api";
const LANG_BASE = "https://github-readme-stats.vercel.app/api/top-langs";
const CHART_BASE = "https://ghchart.rshah.org";
const LEET_BASE = "https://leetcard.jacoblin.cool";

export function CodingProfiles() {
  const githubUsername = profile.githubUsername || "yourusername";
  const leetcodeUsername = profile.leetcodeUsername || "yourusername";

  const statsUrl = `${STATS_BASE}?username=${encodeURIComponent(githubUsername)}&show_icons=true&hide_border=true&theme=default&bg_color=00000000`;
  const statsDark = `${STATS_BASE}?username=${encodeURIComponent(githubUsername)}&show_icons=true&hide_border=true&theme=tokyonight&bg_color=00000000`;
  const langsUrl = `${LANG_BASE}?username=${encodeURIComponent(githubUsername)}&layout=compact&hide_border=true&theme=default&bg_color=00000000`;
  const langsDark = `${LANG_BASE}?username=${encodeURIComponent(githubUsername)}&layout=compact&hide_border=true&theme=tokyonight&bg_color=00000000`;
  const contribUrl = `${CHART_BASE}/${encodeURIComponent(githubUsername)}`;
  const leetcodeUrl = `${LEET_BASE}/${encodeURIComponent(leetcodeUsername)}?theme=light&font=DM%20Sans&ext=contest`;
  const leetcodeDark = `${LEET_BASE}/${encodeURIComponent(leetcodeUsername)}?theme=dark&font=DM%20Sans&ext=contest`;

  return (
    <MotionSection id="github" className="section-pad">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Coding Profiles</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          GitHub activity plus live LeetCode progress for <code className="text-sm bg-slate-200 dark:bg-slate-800 px-1 rounded">Aman_Jaiman__</code>.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm font-medium">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 hover:underline"
          >
            <Github className="w-4 h-4" />
            GitHub profile
          </a>
          <a
            href={profile.leetcode}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 hover:underline"
          >
            <Code2 className="w-4 h-4" />
            LeetCode profile
          </a>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <div className="glass rounded-2xl p-4 border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">GitHub stats</p>
          <img
            src={statsUrl}
            alt={`GitHub stats for ${githubUsername}`}
            className="w-full max-h-48 object-contain dark:hidden"
            loading="lazy"
          />
          <img src={statsDark} alt="" className="w-full max-h-48 object-contain hidden dark:block" loading="lazy" />
        </div>
        <div className="glass rounded-2xl p-4 border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">Top languages</p>
          <img src={langsUrl} alt={`Top languages for ${githubUsername}`} className="w-full object-contain dark:hidden" loading="lazy" />
          <img src={langsDark} alt="" className="w-full object-contain hidden dark:block" loading="lazy" />
        </div>
        <div className="glass rounded-2xl p-4 border border-slate-200/50 dark:border-slate-700/50 overflow-x-auto">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">Contribution graph</p>
          <img
            src={contribUrl}
            alt={`GitHub contributions for ${githubUsername}`}
            className="min-w-full h-auto rounded-lg opacity-90 dark:opacity-95"
            loading="lazy"
          />
        </div>
        <div className="glass rounded-2xl p-4 border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">LeetCode progress</p>
          <img
            src={leetcodeUrl}
            alt={`LeetCode progress for ${leetcodeUsername}`}
            className="w-full object-contain dark:hidden"
            loading="lazy"
          />
          <img src={leetcodeDark} alt="" className="w-full object-contain hidden dark:block" loading="lazy" />
        </div>
      </div>
    </MotionSection>
  );
}
