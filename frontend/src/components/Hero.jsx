import { useMemo } from "react";
import { motion } from "framer-motion";
import { Download, MessageCircle, MapPin } from "lucide-react";
import { profile } from "../data/profile.js";
import { useTypewriter } from "../hooks/useTypewriter.js";

export function Hero() {
  const phrases = useMemo(() => profile.typingPhrases, []);
  const typed = useTypewriter(phrases, 75, 2200);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-light dark:bg-grid-dark bg-[length:48px_48px] pointer-events-none opacity-60 dark:opacity-40" />
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-brand-500/20 dark:bg-brand-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10 w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-brand-600 dark:text-brand-400 font-medium mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {profile.location}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-brand-600 to-violet-600 dark:from-brand-400 dark:to-violet-400 bg-clip-text text-transparent">
              {profile.name}
            </span>
          </h1>
          <p className="mt-4 text-xl sm:text-2xl text-slate-600 dark:text-slate-300 min-h-[2rem]">
            <span className="font-semibold text-slate-800 dark:text-slate-100">{typed}</span>
            <span className="animate-blink ml-0.5 inline-block w-0.5 h-6 bg-brand-500 align-middle" />
          </p>
          <p className="mt-6 text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">{profile.summary}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={profile.resumePath}
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-medium shadow-lg shadow-brand-500/25 transition-all hover:scale-[1.02]"
            >
              <Download className="w-5 h-5" />
              Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass font-medium text-slate-800 dark:text-slate-100 hover:border-brand-500/30 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Contact
            </a>
          </div>
        </motion.div>

        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-violet-600 rounded-3xl blur-2xl opacity-30 scale-105" />
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl glass flex items-center justify-center border-2 border-white/40 dark:border-slate-600/50">
              <div className="text-center p-6">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-brand-400 to-violet-500 flex items-center justify-center text-white font-display text-4xl font-bold shadow-inner">
                  AJ
                </div>
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Profile photo — replace with your image</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
