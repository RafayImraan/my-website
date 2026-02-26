import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/content-store";
import { getSiteUrl } from "@/lib/site-url";

const BASE_URL = getSiteUrl();

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
