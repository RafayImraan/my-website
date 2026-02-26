import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";
import { getSiteContent } from "@/lib/content-store";

export const metadata: Metadata = {
  title: "Insights | Abdul Rafay Imran",
  description: "Thought leadership on enterprise web, AI, and analytics execution."
};

export default async function BlogPage() {
  const content = await getSiteContent();
  return (
    <main>
      <SiteNav />
      <section className="section" data-reveal>
        <div className="container">
          <p className="eyebrow">Insights</p>
          <h1>Articles</h1>
          <div className="project-grid">
            {content.blogPosts.map((post) => (
              <article key={post.slug} className="card" data-reveal>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <p className="repo-meta">
                  {post.date} | {post.readMinutes} min read
                </p>
                <Link className="inline-link" href={`/blog/${post.slug}`}>
                  Read article
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
