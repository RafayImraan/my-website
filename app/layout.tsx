import type { Metadata } from "next";
import MotionSystem from "@/components/motion-system";
import RouteTransition from "@/components/route-transition";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Abdul Rafay Imran | Software Engineer",
  description:
    "Portfolio of Abdul Rafay Imran, a Software Engineer focused on full-stack development, machine learning, and analytics.",
  openGraph: {
    title: "Abdul Rafay Imran | Software Engineer",
    description: "Professional portfolio for software engineering, machine learning, and project work.",
    url: siteUrl,
    siteName: "Abdul Rafay Imran Portfolio",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdul Rafay Imran | Software Engineer",
    description: "Professional portfolio built with Next.js."
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <MotionSystem />
        <RouteTransition>{children}</RouteTransition>
      </body>
    </html>
  );
}
