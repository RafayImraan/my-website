import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/content-store";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getSiteContent();
  const staticRoutes = ["", "/services", "/case-studies", "/blog", "/recruiters", "/privacy-policy", "/terms"];
  const caseRoutes = content.caseStudies.map((item) => `/case-studies/${item.slug}`);
  const blogRoutes = content.blogPosts.map((item) => `/blog/${item.slug}`);

  return [...staticRoutes, ...caseRoutes, ...blogRoutes].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date()
  }));
}
