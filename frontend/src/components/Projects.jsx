import { useEffect, useState } from "react";
import { api } from "../lib/api.js";
import { MotionSection } from "./MotionSection.jsx";
import { ProjectCard } from "./ProjectCard.jsx";
import { Loader2 } from "lucide-react";

const fallback = [
  {
    _id: "1",
    title: "Conference Room Booking System",
    description:
      "Partner login, customer booking, room management, approval workflow, and reports dashboard — full-stack system for scheduling shared spaces.",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    githubUrl: "https://github.com/Aman-Jaiman",
    liveUrl: "",
  },
  {
    _id: "2",
    title: "Lost and Found Web Application",
    description: "Post lost items, claim listings, and RESTful backend APIs for a campus or community lost-and-found portal.",
    techStack: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/Aman-Jaiman",
    liveUrl: "",
  },
  {
    _id: "3",
    title: "Coding Problem Solutions",
    description: "LeetCode-style C++ solutions with focus on time/space complexity and clean, readable implementations.",
    techStack: ["C++", "Algorithms", "Data Structures"],
    githubUrl: "https://github.com/Aman-Jaiman",
    liveUrl: "",
  },
];

export function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usedFallback, setUsedFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get("/projects");
        if (!cancelled) {
          if (Array.isArray(data) && data.length) setProjects(data);
          else {
            setProjects(fallback);
            setUsedFallback(true);
          }
        }
      } catch {
        if (!cancelled) {
          setProjects(fallback);
          setUsedFallback(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <MotionSection id="projects" className="section-pad">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Projects</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Selected work — loaded from the API when MongoDB is connected.
          {usedFallback && (
            <span className="block mt-2 text-amber-600 dark:text-amber-400 text-sm">
              Showing sample data. Run the backend and seed script to use your database.
            </span>
          )}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-brand-500" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p._id || p.title} project={p} index={i} />
          ))}
        </div>
      )}
    </MotionSection>
  );
}
