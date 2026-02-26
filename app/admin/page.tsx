import type { Metadata } from "next";
import AdminDashboard from "@/components/admin-dashboard";
import SiteFooter from "@/components/site-footer";
import SiteNav from "@/components/site-nav";

export const metadata: Metadata = {
  title: "Admin | Abdul Rafay Imran Portfolio"
};

export default function AdminPage() {
  return (
    <main>
      <SiteNav />
      <AdminDashboard />
      <SiteFooter />
    </main>
  );
}
