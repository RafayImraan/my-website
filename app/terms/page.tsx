import type { Metadata } from "next";
import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

export const metadata: Metadata = {
  title: "Terms | Abdul Rafay Imran"
};

export default function TermsPage() {
  return (
    <main>
      <SiteNav />
      <section className="section" data-reveal>
        <div className="container narrow">
          <h1>Terms of Use</h1>
          <p>All portfolio content is provided for professional review, hiring evaluation, and business inquiry.</p>
          <p>Project descriptions and outcomes are intellectual property of their respective owners and collaborators.</p>
          <p>Unauthorized reproduction of branding and content is not permitted without written permission.</p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
