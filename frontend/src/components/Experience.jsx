import { Trophy, Code, Puzzle, Users } from "lucide-react";
import { MotionSection } from "./MotionSection.jsx";

const items = [
  {
    icon: Puzzle,
    title: "Coding practice",
    desc: "Regular problem solving on competitive and interview-style platforms to sharpen DSA and implementation speed.",
  },
  {
    icon: Trophy,
    title: "Algorithms",
    desc: "Focused practice on graphs, dynamic programming, trees, and arrays with emphasis on proofs and complexity.",
  },
  {
    icon: Code,
    title: "Web projects",
    desc: "End-to-end applications including authentication, CRUD, and dashboards mirroring production patterns.",
  },
  {
    icon: Users,
    title: "Hackathons & competitions",
    desc: "Participation in college hackathons and coding contests — teamwork, rapid prototyping, and pitching ideas.",
  },
];

export function Experience() {
  return (
    <MotionSection id="experience" className="section-pad bg-slate-100/50 dark:bg-slate-900/30">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Experience & achievements</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400">How I spend my time growing as an engineer.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
        {items.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex gap-4 glass rounded-2xl p-5 border border-slate-200/50 dark:border-slate-700/50"
          >
            <div className="shrink-0 w-11 h-11 rounded-xl bg-violet-500/15 flex items-center justify-center text-violet-600 dark:text-violet-400">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-slate-900 dark:text-white">{title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </MotionSection>
  );
}
