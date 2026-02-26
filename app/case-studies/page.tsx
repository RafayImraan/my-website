import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";
import { getSiteContent } from "@/lib/content-store";

export const metadata: Metadata = {
  title: "Case Studies | Abdul Rafay Imran",
  description: "Deep dives into product engineering and AI project execution."
};

export default async function CaseStudiesPage() {
  const content = await getSiteContent();
  return (
    <main>
      <SiteNav />
      <section className="section" data-reveal>
        <div className="container">
          <p className="eyebrow">Business Outcomes</p>
          <h1>Case Studies</h1>
          <div className="project-grid">
            {content.caseStudies.map((study) => (
              <article key={study.slug} className="card" data-reveal>
                <h3>{study.title}</h3>
                <p>{study.challenge}</p>
                <div className="kpi-strip">
                  <span>{study.approach.length} implementation pillars</span>
                  <span>{study.outcome.length} outcome highlights</span>
                </div>
                <p className="list-title">Tech Stack</p>
                <p>{study.tech.join(" | ")}</p>
                <Link className="inline-link" href={`/case-studies/${study.slug}`}>
                  Read details
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
