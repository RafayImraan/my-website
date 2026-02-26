import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { kv } from "@vercel/kv";
import type { LeadRecord, SiteContent } from "@/lib/types";

const SOURCE_DATA_DIR = path.join(process.cwd(), "data");
const MUTABLE_DATA_DIR = process.env.VERCEL ? path.join(os.tmpdir(), "rafay-portfolio-data") : SOURCE_DATA_DIR;
const CONTENT_FILE = path.join(MUTABLE_DATA_DIR, "site-content.json");
const LEADS_FILE = path.join(MUTABLE_DATA_DIR, "leads.json");
const SOURCE_CONTENT_FILE = path.join(SOURCE_DATA_DIR, "site-content.json");

const KV_SITE_CONTENT_KEY = "portfolio:site-content";
const KV_LEADS_KEY = "portfolio:leads";
const KV_IS_CONFIGURED = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

async function readJson<T>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw) as T;
}

async function writeJson<T>(filePath: string, data: T): Promise<void> {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}

function parseLead(entry: unknown): LeadRecord | null {
  if (!entry) return null;
  if (typeof entry === "string") {
    try {
      return JSON.parse(entry) as LeadRecord;
    } catch {
      return null;
    }
  }
  if (typeof entry === "object") {
    return entry as LeadRecord;
  }
  return null;
}

async function getFileContentWithSeedFallback(): Promise<SiteContent> {
  try {
    return await readJson<SiteContent>(CONTENT_FILE);
  } catch {
    const seed = await readJson<SiteContent>(SOURCE_CONTENT_FILE);
    if (CONTENT_FILE !== SOURCE_CONTENT_FILE) {
      await writeJson(CONTENT_FILE, seed).catch(() => undefined);
    }
    return seed;
  }
}

export async function getSiteContent(): Promise<SiteContent> {
  if (KV_IS_CONFIGURED) {
    const stored = await kv.get<SiteContent>(KV_SITE_CONTENT_KEY);
    if (stored) return stored;
    const seed = await getFileContentWithSeedFallback();
    await kv.set(KV_SITE_CONTENT_KEY, seed);
    return seed;
  }
  return getFileContentWithSeedFallback();
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  if (KV_IS_CONFIGURED) {
    await kv.set(KV_SITE_CONTENT_KEY, content);
    return;
  }
  await writeJson(CONTENT_FILE, content);
}

export async function getLeads(): Promise<LeadRecord[]> {
  if (KV_IS_CONFIGURED) {
    const raw = await kv.lrange<unknown[]>(KV_LEADS_KEY, 0, 499);
    return raw.map(parseLead).filter((lead): lead is LeadRecord => Boolean(lead));
  }

  try {
    return await readJson<LeadRecord[]>(LEADS_FILE);
  } catch {
    return [];
  }
}

export async function addLead(lead: LeadRecord): Promise<void> {
  if (KV_IS_CONFIGURED) {
    await kv.lpush(KV_LEADS_KEY, JSON.stringify(lead));
    await kv.ltrim(KV_LEADS_KEY, 0, 999);
    return;
  }

  const leads = await getLeads();
  leads.unshift(lead);
  await writeJson(LEADS_FILE, leads);
}
