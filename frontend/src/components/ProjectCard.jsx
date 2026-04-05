import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

export function ProjectCard({ project, index = 0 }) {
  const { title, description, techStack = [], githubUrl, liveUrl } = project;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      whileHover={{ y: -6 }}
      className="group glass rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-700/50 hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-300"
    >
      <div className="h-1.5 bg-gradient-to-r from-brand-500 via-violet-500 to-fuchsia-500 opacity-80 group-hover:opacity-100 transition-opacity" />
      <div className="p-6">
        <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          {title}
        </h3>
        <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-4">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {techStack.map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {githubUrl ? (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          ) : null}
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              Live demo
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
