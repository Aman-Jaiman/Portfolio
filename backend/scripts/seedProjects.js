import "dotenv/config";
import mongoose from "mongoose";
import Project from "../models/Project.js";

const projects = [
  {
    title: "Conference Room Booking System",
    description:
      "Full-stack booking platform with partner login, customer reservations, room management, admin approval workflow, and a reports dashboard for utilization insights.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    githubUrl: "https://github.com/Aman-Jaiman",
    liveUrl: "",
    order: 0,
  },
  {
    title: "Lost and Found Web Application",
    description:
      "Community portal to post lost items, browse listings, and claim items with secure backend APIs and role-aware flows.",
    techStack: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
    githubUrl: "https://github.com/Aman-Jaiman",
    liveUrl: "",
    order: 1,
  },
  {
    title: "Coding Problem Solutions",
    description:
      "LeetCode-style algorithm implementations in C++ covering arrays, graphs, DP, and trees — focused on clarity and complexity analysis.",
    techStack: ["C++", "Algorithms", "Data Structures"],
    githubUrl: "https://github.com/Aman-Jaiman",
    liveUrl: "",
    order: 2,
  },
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Set MONGODB_URI in backend/.env");
    process.exit(1);
  }
  await mongoose.connect(uri);
  await Project.deleteMany({});
  await Project.insertMany(projects);
  console.log("Seeded", projects.length, "projects");
  await mongoose.disconnect();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
