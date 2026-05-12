import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";
import { getSiteContent } from "@/lib/content-store";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const content = await getSiteContent();
  return content.caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = await getSiteContent();
  const study = content.caseStudies.find((item) => item.slug === slug);
  if (!study) return { title: "Case Study Not Found" };
  return { title: `${study.title} | Case Study`, description: study.challenge };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const content = await getSiteContent();
  const study = content.caseStudies.find((item) => item.slug === slug);
  const project = content.projects.find((item) => item.slug === slug);
  if (!study) notFound();

  const kpis = [
    { label: "Approach Steps", value: study.approach.length },
    { label: "Key Outcomes", value: study.outcome.length },
    { label: "Technologies", value: study.tech.length }
  ];

  return (
    <main>
      <SiteNav />
      <section className="section" data-reveal>
        <div className="container narrow">
          <p className="eyebrow">Case Study</p>
          <h1>{study.title}</h1>
          <div className="kpi-grid">
            {kpis.map((kpi) => (
              <article key={kpi.label} className="card kpi-card" data-reveal>
                <p className="metric-value">{kpi.value}</p>
                <p className="metric-label">{kpi.label}</p>
              </article>
            ))}
          </div>

          <article className="card" data-reveal>
            <p className="list-title">Challenge</p>
            <p>{study.challenge}</p>
          </article>

          <article className="card" data-reveal>
            <p className="list-title">Implementation Approach</p>
            <ol className="timeline-list">
              {study.approach.map((item, index) => (
                <li key={item}>
                  <span className="timeline-count">{index + 1}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ol>
          </article>

          <article className="card" data-reveal>
            <p className="list-title">Outcome Highlights</p>
            <ul>
              {study.outcome.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="list-title">Technology</p>
            <p>{study.tech.join(" | ")}</p>
            {(project?.github || project?.live || project?.video) && (
              <>
                <p className="list-title">Project Links</p>
                <div className="project-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer">
                      Live Demo
                    </a>
                  )}
                  {project.video && (
                    <a href={project.video} target="_blank" rel="noreferrer">
                      Video Walkthrough
                    </a>
                  )}
                </div>
              </>
            )}
          </article>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
