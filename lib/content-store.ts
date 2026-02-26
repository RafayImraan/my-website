import { promises as fs } from "node:fs";
import path from "node:path";
import type { LeadRecord, SiteContent } from "@/lib/types";

const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_FILE = path.join(DATA_DIR, "site-content.json");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

async function readJson<T>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw) as T;
}

async function writeJson<T>(filePath: string, data: T): Promise<void> {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}

export async function getSiteContent(): Promise<SiteContent> {
  return readJson<SiteContent>(CONTENT_FILE);
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  await writeJson(CONTENT_FILE, content);
}

export async function getLeads(): Promise<LeadRecord[]> {
  try {
    return await readJson<LeadRecord[]>(LEADS_FILE);
  } catch {
    return [];
  }
}

export async function addLead(lead: LeadRecord): Promise<void> {
  const leads = await getLeads();
  leads.unshift(lead);
  await writeJson(LEADS_FILE, leads);
}
