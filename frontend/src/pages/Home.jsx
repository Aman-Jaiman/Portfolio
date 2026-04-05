import { Helmet } from "react-helmet-async";
import { profile } from "../data/profile.js";
import { Navbar } from "../components/Navbar.jsx";
import { Footer } from "../components/Footer.jsx";
import { Hero } from "../components/Hero.jsx";
import { About } from "../components/About.jsx";
import { Skills } from "../components/Skills.jsx";
import { Projects } from "../components/Projects.jsx";
import { Experience } from "../components/Experience.jsx";
import { GitHubStats } from "../components/GitHubStats.jsx";
import { Contact } from "../components/Contact.jsx";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{profile.name} | Developer Portfolio</title>
        <meta name="description" content={profile.summary.slice(0, 160)} />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.origin : ""} />
      </Helmet>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <GitHubStats />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
