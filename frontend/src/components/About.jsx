import { GraduationCap, Cpu, Lightbulb, Code2 } from "lucide-react";
import { profile } from "../data/profile.js";
import { MotionSection } from "./MotionSection.jsx";

const highlights = [
  {
    icon: GraduationCap,
    title: "Education",
    text: `${profile.college} — ${profile.branch}. Strong foundation in CS fundamentals and software engineering practices.`,
  },
  {
    icon: Cpu,
    title: "Algorithms & backend",
    text: "Deep interest in data structures, algorithms, and building reliable backend systems that scale.",
  },
  {
    icon: Lightbulb,
    title: "Problem solving",
    text: "Enjoy breaking down complex problems with structured thinking and mathematical intuition.",
  },
  {
    icon: Code2,
    title: "Real-world builds",
    text: "Learning full-stack web development through projects like booking systems and API-driven applications.",
  },
];

export function About() {
  return (
    <MotionSection id="about" className="section-pad">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">About me</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400">Background, studies, and what drives my work.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {highlights.map(({ icon: Icon, title, text }, i) => (
          <div
            key={title}
            className="glass rounded-2xl p-6 hover:shadow-brand-500/10 hover:shadow-xl transition-shadow border border-slate-200/50 dark:border-slate-700/50"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-500/15 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4">
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white">{title}</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 glass rounded-2xl p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50">
        <h3 className="font-display font-semibold text-slate-900 dark:text-white mb-2">Personal</h3>
        <p className="text-slate-600 dark:text-slate-400">
          Based in <strong className="text-slate-800 dark:text-slate-200">{profile.location}</strong>.{" "}
          <span className="text-slate-500 dark:text-slate-500">Height: {profile.height} (optional detail for informal profiles).</span>
        </p>
      </div>
    </MotionSection>
  );
}
