import crypto from "node:crypto";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN ?? "change-me-admin-token";

export function isAdminAuthorized(request: Request): boolean {
  const token = request.headers.get("x-admin-token") ?? "";
  const expected = ADMIN_TOKEN;
  if (!token || !expected) return false;
  const tokenBuf = Buffer.from(token);
  const expectedBuf = Buffer.from(expected);
  if (tokenBuf.length !== expectedBuf.length) return false;
  return crypto.timingSafeEqual(tokenBuf, expectedBuf);
}
