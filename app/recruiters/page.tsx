import type { Metadata } from "next";
import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";
import { getRuntimeContent } from "@/lib/dynamic-profile";

export const metadata: Metadata = {
  title: "Recruiter Brief | Abdul Rafay Imran",
  description: "A concise hiring snapshot with skills, achievements, and project strengths."
};

export default async function RecruitersPage() {
  const content = await getRuntimeContent();
  return (
    <main>
      <SiteNav />
      <section className="section" data-reveal>
        <div className="container">
          <p className="eyebrow">Recruiter-Focused Brief</p>
          <h1>Hiring Snapshot</h1>
          <div className="three-col">
            <article className="card" data-reveal>
              <h2>Core Stack</h2>
              <p>{content.profile.skills.technologies.join(" | ")}</p>
              <p className="list-title">Databases</p>
              <p>{content.profile.skills.databases.join(" | ")}</p>
            </article>
            <article className="card" data-reveal>
              <h2>Achievements</h2>
              <ul>
                {content.profile.achievements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="list-title">Languages</p>
              <p>{content.profile.languages.join(" | ")}</p>
            </article>
            <article className="card" data-reveal>
              <h2>Live Proof</h2>
              <p>Followers: {content.runtime.githubFollowers ?? "--"}</p>
              <p>Repos: {content.runtime.githubRepos ?? "--"}</p>
              <p>Total Stars: {content.runtime.totalStars ?? "--"}</p>
              <p className="list-title">Contact</p>
              <p>{content.profile.email}</p>
              <p>{content.profile.phone}</p>
            </article>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
