import LuxuryPortfolioClient from "@/components/luxury-portfolio-client";
import { getRuntimeContent } from "@/lib/dynamic-profile";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const data = await getRuntimeContent();
  return <LuxuryPortfolioClient data={data} />;
}
