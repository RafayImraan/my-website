const LOCAL_URL_PATTERN = /^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?$/i;

function trimTrailingSlash(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function normalizeUrl(value: string | undefined): string | null {
  if (!value) return null;
  const normalized = trimTrailingSlash(value.trim());
  if (!normalized) return null;
  try {
    return trimTrailingSlash(new URL(normalized).toString());
  } catch {
    return null;
  }
}

function getVercelUrl(): string | null {
  const production = normalizeUrl(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined
  );
  if (production) return production;
  return normalizeUrl(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);
}

export function getSiteUrl(): string {
  const configured = normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL);
  const vercelUrl = getVercelUrl();

  if (!configured) return vercelUrl ?? "http://localhost:3000";
  if (process.env.VERCEL && LOCAL_URL_PATTERN.test(configured) && vercelUrl) return vercelUrl;
  return configured;
}
