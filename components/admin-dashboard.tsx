"use client";

import { useState } from "react";
import type { LeadRecord, SiteContent } from "@/lib/types";

export default function AdminDashboard() {
  const [token, setToken] = useState("");
  const [content, setContent] = useState<string>("");
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [status, setStatus] = useState("");

  async function loadContent() {
    setStatus("Loading content...");
    const response = await fetch("/api/admin/content", { headers: { "x-admin-token": token } });
    const payload = (await response.json()) as { ok: boolean; content?: SiteContent; error?: string };
    if (!payload.ok || !payload.content) {
      setStatus(payload.error ?? "Failed");
      return;
    }
    setContent(JSON.stringify(payload.content, null, 2));
    setStatus("Content loaded.");
  }

  async function saveContent() {
    setStatus("Saving content...");
    try {
      const parsed = JSON.parse(content) as SiteContent;
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify({ content: parsed })
      });
      const payload = (await response.json()) as { ok: boolean; error?: string };
      setStatus(payload.ok ? "Content saved." : payload.error ?? "Save failed.");
    } catch {
      setStatus("Invalid JSON.");
    }
  }

  async function loadLeads() {
    setStatus("Loading leads...");
    const response = await fetch("/api/admin/leads", { headers: { "x-admin-token": token } });
    const payload = (await response.json()) as { ok: boolean; leads?: LeadRecord[]; error?: string };
    if (!payload.ok || !payload.leads) {
      setStatus(payload.error ?? "Failed");
      return;
    }
    setLeads(payload.leads);
    setStatus(`Loaded ${payload.leads.length} leads.`);
  }

  return (
    <section className="section">
      <div className="container">
        <h1>Admin Console</h1>
        <div className="card">
          <p>Enter `ADMIN_TOKEN`</p>
          <input className="lux-input" value={token} onChange={(event) => setToken(event.target.value)} />
          <div className="cta-row">
            <button className="btn btn-outline" type="button" onClick={loadContent}>
              Load CMS
            </button>
            <button className="btn btn-outline" type="button" onClick={saveContent}>
              Save CMS
            </button>
            <button className="btn btn-outline" type="button" onClick={loadLeads}>
              Load Leads
            </button>
          </div>
          <p className="repo-meta">{status}</p>
        </div>

        <div className="two-col">
          <article className="card">
            <h2>CMS JSON Editor</h2>
            <textarea
              className="admin-json"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Load CMS content to edit."
            />
          </article>
          <article className="card">
            <h2>Leads</h2>
            <div className="lead-list">
              {leads.map((lead) => (
                <article key={lead.id} className="lead-item">
                  <p className="list-title">
                    {lead.name} | {lead.interest}
                  </p>
                  <p>{lead.email}</p>
                  <p>{lead.company || "No company provided"}</p>
                  <p>{lead.message}</p>
                  <p className="repo-meta">{lead.createdAt}</p>
                </article>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
