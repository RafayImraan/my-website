import type { Metadata } from "next";
import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";
import { getRuntimeContent } from "@/lib/dynamic-profile";

export const metadata: Metadata = {
  title: "Recruiter Overview | Abdul Rafay Imran",
  description: "A concise recruiter snapshot with role fit, proof of work, core stack, and direct contact information."
};

export default async function RecruitersPage() {
  const content = await getRuntimeContent();
  const featuredProjects = content.projects.filter((project) => project.featured).slice(0, 4);

  return (
    <main className="game-shell">
      <SiteNav />

      <section className="hero" data-reveal>
        <div className="hero-grid-overlay" />
        <div className="hero-mesh" />
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">For Recruiters</p>
            <h1>Recruiter Overview</h1>
            <p className="section-copy">
              A compressed view of Abdul Rafay Imran: role fit, core strengths, shipped work, and fast contact routes.
            </p>
          </div>
          <div className="scoreboard-grid">
            <article className="proof-stat cinematic-panel" data-tilt>
              <span>Role Fit</span>
              <strong>Frontend, full-stack, and product-oriented engineering roles</strong>
              <p>Strongest signals sit where UI quality meets implementation discipline.</p>
            </article>
            <article className="proof-stat cinematic-panel" data-tilt>
              <span>GitHub</span>
              <strong>{content.runtime.githubRepos ?? "--"} public repos</strong>
              <p>{content.runtime.totalStars ?? "--"} total stars with active public proof linked from the portfolio.</p>
            </article>
            <article className="proof-stat cinematic-panel" data-tilt>
              <span>Education</span>
              <strong>{content.profile.experience[0]?.role ?? "Software Engineering"}</strong>
              <p>{content.profile.experience[0]?.org ?? content.profile.city}</p>
            </article>
            <article className="proof-stat cinematic-panel" data-tilt>
              <span>Contact</span>
              <strong>Direct email and structured intake form</strong>
              <p>Based in {content.profile.city} and reachable for role discussions.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" data-reveal>
        <div className="container three-col">
          <article className="cinematic-panel" data-reveal data-tilt>
            <h2>Core Stack</h2>
            <p>{content.profile.skills.technologies.join(" | ")}</p>
            <p className="list-title">Databases</p>
            <p>{content.profile.skills.databases.join(" | ")}</p>
            <p className="list-title">Analytics</p>
            <p>{content.profile.skills.dashboards.join(" | ")}</p>
          </article>
          <article className="cinematic-panel" data-reveal data-tilt>
            <h2>Achievements</h2>
            <ul>
              {content.profile.achievements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="list-title">Languages</p>
            <p>{content.profile.languages.join(" | ")}</p>
          </article>
          <article className="cinematic-panel" data-reveal data-tilt>
            <h2>Contact</h2>
            <p className="list-title">Email</p>
            <p>{content.profile.email}</p>
            <p className="list-title">Phone</p>
            <p>{content.profile.phone}</p>
            <p className="list-title">Profiles</p>
            <p>
              <a href={content.profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>{" "}
              |{" "}
              <a href={content.profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </p>
          </article>
        </div>
      </section>

      <section className="section" data-reveal>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Featured Projects</p>
            <h2>Fast Review Set</h2>
          </div>
          <div className="featured-project-grid">
            {featuredProjects.map((project, index) => (
              <article key={project.slug} className="featured-project-card cinematic-panel" data-reveal data-tilt>
                <div className="featured-project-topline">
                  <span className="project-proof-pill">{project.live ? "Live Product" : project.video ? "Video Walkthrough" : "Code Available"}</span>
                  <span className="stack">{project.stack}</span>
                </div>
                <p className="mission-index">{`Featured ${index + 1}`}</p>
                <h3>{project.title}</h3>
                <p className="project-summary">{project.summary[0]}</p>
                <div className="kpi-strip">
                  {project.outcomes.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
