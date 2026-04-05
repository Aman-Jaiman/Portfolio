import {
  Braces,
  Binary,
  Globe,
  Wrench,
} from "lucide-react";
import { MotionSection } from "./MotionSection.jsx";

const groups = [
  {
    title: "Languages",
    icon: Braces,
    items: [
      { name: "C++", level: 90 },
      { name: "JavaScript", level: 78 },
      { name: "SQL", level: 72 },
    ],
  },
  {
    title: "Core CS",
    icon: Binary,
    items: [
      { name: "Data Structures", level: 88 },
      { name: "Algorithms", level: 85 },
      { name: "Problem Solving", level: 90 },
    ],
  },
  {
    title: "Web development",
    icon: Globe,
    items: [
      { name: "HTML", level: 88 },
      { name: "CSS", level: 82 },
      { name: "JavaScript", level: 78 },
      { name: "React", level: 75 },
      { name: "Node.js", level: 72 },
      { name: "Express", level: 70 },
      { name: "MongoDB", level: 68 },
    ],
  },
  {
    title: "Tools",
    icon: Wrench,
    items: [
      { name: "Git", level: 85 },
      { name: "GitHub", level: 88 },
      { name: "VS Code", level: 92 },
    ],
  },
];

function Bar({ name, level }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-700 dark:text-slate-300 font-medium">{name}</span>
        <span className="text-slate-500">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-violet-500 transition-all duration-700 ease-out"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <MotionSection id="skills" className="section-pad bg-slate-100/50 dark:bg-slate-900/30">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Skills</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400">Languages, CS fundamentals, web stack, and everyday tools.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {groups.map(({ title, icon: Icon, items }) => (
          <div
            key={title}
            className="glass rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:border-brand-500/20 transition-colors"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-brand-500/15 flex items-center justify-center text-brand-600 dark:text-brand-400">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white">{title}</h3>
            </div>
            {items.map((item) => (
              <Bar key={item.name} {...item} />
            ))}
          </div>
        ))}
      </div>
    </MotionSection>
  );
}
