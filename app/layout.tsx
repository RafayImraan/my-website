import type { Metadata } from "next";
import { Syne, DM_Sans, DM_Mono } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aburafayyy.vercel.app"),
  title: "Abdul Rafay Imran | Software Engineer",
  description:
    "I build systems that scale, protocols that trustlessly transact, and AI that explains itself. Software engineer across backend, full-stack, Web3, and AI/ML.",
  openGraph: {
    title: "Abdul Rafay Imran | Software Engineer",
    description:
      "I build systems that scale, protocols that trustlessly transact, and AI that explains itself.",
    url: "https://aburafayyy.vercel.app",
    siteName: "Abdul Rafay Imran",
    type: "website",
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdul Rafay Imran | Software Engineer",
    description:
      "I build systems that scale, protocols that trustlessly transact, and AI that explains itself.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body>
        <CustomCursor />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
