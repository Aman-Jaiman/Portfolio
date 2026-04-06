/** Update these with your real links before deploying */
const withBase = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export const profile = {
  name: "Aman Kumar Sharma",
  location: "Dausa, Rajasthan, India",
  college: "Swami Keshvanand Institute of Technology (SKIT), Jaipur",
  branch: "Computer Science Engineering",
  email: "amanjaiman0010@gmail.com",
  linkedin: "https://www.linkedin.com/in/aman-sharma-67b517376/",
  github: "https://github.com/Aman-Jaiman",
  githubUsername: import.meta.env.VITE_GITHUB_USERNAME || "Aman-Jaiman",
  instagram: "https://www.instagram.com/aman_jaiman__",
  leetcode: "https://leetcode.com/u/Aman_Jaiman__/",
  leetcodeUsername: "Aman_Jaiman__",
  resumePath: withBase("resume.pdf"),
  profileImage: `${withBase("images/profile-photo.jpg")}?v=20260406`,
  profileImageFallback: withBase("favicon.svg"),
  typingPhrases: ["C++ Developer", "Problem Solver", "Web Developer", "Computer Science Student"],
  summary:
    "A passionate Computer Science student skilled in C++ and Data Structures & Algorithms with strong mathematical thinking. Currently learning full-stack web development and building real-world projects like booking systems and full-stack applications. Interested in backend development, algorithms, and scalable systems. Also known as Aman Jaiman.",
};
