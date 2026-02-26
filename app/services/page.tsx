import type { Metadata } from "next";
import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";
import { getSiteContent } from "@/lib/content-store";

export const metadata: Metadata = {
  title: "Services | Abdul Rafay Imran",
  description: "Enterprise web engineering, AI/ML solutions, and analytics services."
};

export default async function ServicesPage() {
  const content = await getSiteContent();
  return (
    <main>
      <SiteNav />
      <section className="section" data-reveal>
        <div className="container">
          <p className="eyebrow">Service Lines</p>
          <h1>Premium Services</h1>
          <div className="project-grid">
            {content.services.map((service) => (
              <article key={service.slug} className="card" data-reveal>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
