import type { Metadata } from "next";
import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

export const metadata: Metadata = {
  title: "Privacy Policy | Abdul Rafay Imran"
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <SiteNav />
      <section className="section" data-reveal>
        <div className="container narrow">
          <h1>Privacy Policy</h1>
          <p>
            This website only collects information voluntarily submitted through inquiry forms, including name, email,
            company, and project details.
          </p>
          <p>Lead data is used solely for professional communication and project follow-up.</p>
          <p>
            To request deletion of your submitted data, email <a href="mailto:aburafayyy@gmail.com">aburafayyy@gmail.com</a>.
          </p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
