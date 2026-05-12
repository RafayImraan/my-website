import LuxuryPortfolioClient from "@/components/luxury-portfolio-client";
import { getRuntimeContent } from "@/lib/dynamic-profile";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const data = await getRuntimeContent();
  return (
    <>
      <noscript>
        <main style={{ padding: "2rem", color: "#fff", background: "#070b16", fontFamily: "system-ui, sans-serif" }}>
          <h1>Abdul Rafay Imran</h1>
          <p>Software Engineer focused on full-stack development, machine learning, and analytics.</p>
          <p>
            <a href="/Abdul-Rafay-Imran-CV.pdf">Download CV</a> | <a href="/recruiters">Recruiter Overview</a>
          </p>
        </main>
      </noscript>
      <LuxuryPortfolioClient data={data} />
    </>
  );
}
