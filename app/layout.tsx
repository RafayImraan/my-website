import type { Metadata } from "next";
import MotionSystem from "@/components/motion-system";
import RouteTransition from "@/components/route-transition";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Abdul Rafay Imran | Enterprise Portfolio",
  description:
    "Premium enterprise portfolio of Abdul Rafay Imran - Software Engineer, ML practitioner, and modern product builder.",
  openGraph: {
    title: "Abdul Rafay Imran | Enterprise Portfolio",
    description: "Enterprise-grade portfolio for hiring, partnerships, and project collaborations.",
    url: siteUrl,
    siteName: "Abdul Rafay Imran Portfolio",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdul Rafay Imran | Enterprise Portfolio",
    description: "Luxury enterprise portfolio powered by Next.js."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Abdul Rafay Imran",
    url: siteUrl,
    jobTitle: "Software Engineer",
    email: "aburafayyy@gmail.com",
    sameAs: ["https://github.com/RafayImraan"]
  };

  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <MotionSystem />
        <RouteTransition>{children}</RouteTransition>
      </body>
    </html>
  );
}
