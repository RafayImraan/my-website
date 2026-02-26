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
  return content.blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = await getSiteContent();
  const post = content.blogPosts.find((item) => item.slug === slug);
  if (!post) return { title: "Article Not Found" };
  return { title: `${post.title} | Insights`, description: post.excerpt };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const content = await getSiteContent();
  const post = content.blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <main>
      <SiteNav />
      <section className="section" data-reveal>
        <div className="container narrow">
          <p className="eyebrow">Insight Article</p>
          <h1>{post.title}</h1>
          <p className="repo-meta">
            Published: {post.date} | {post.readMinutes} min read
          </p>
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="list-title">Tags</p>
          <p>{post.tags.join(" | ")}</p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
