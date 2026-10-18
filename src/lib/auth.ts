// Simple shared-password gate for the internal dashboard.
//
// The password comes from the DASHBOARD_PASSWORD environment variable.
// If that isn't set, it falls back to the hash below so the site isn't
// left open. The repo is public, so set DASHBOARD_PASSWORD in Vercel and
// treat the fallback as temporary.

export const AUTH_COOKIE = "lead_desk_session";

// SHA-256 of the initial password. Replace by setting DASHBOARD_PASSWORD.
const FALLBACK_PASSWORD_HASH =
  "01303d3beb16b992be93426c567ae5d5adeb1981d9a1063c9194752e9f284b9d";

async function sha256(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function expectedPasswordHash(): Promise<string> {
  const password = process.env.DASHBOARD_PASSWORD;
  return password ? sha256(password) : FALLBACK_PASSWORD_HASH;
}

export async function isCorrectPassword(attempt: string): Promise<boolean> {
  return (await sha256(attempt)) === (await expectedPasswordHash());
}

// The cookie holds a token derived from the password (and an optional
// SESSION_SECRET), so changing the password signs everyone out.
export async function sessionToken(): Promise<string> {
  const secret = process.env.SESSION_SECRET ?? "lead-desk";
  return sha256(`${secret}:${await expectedPasswordHash()}`);
}
