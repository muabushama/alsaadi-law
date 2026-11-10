import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

function processEnv(): Record<string, string | undefined> {
  try {
    return ((0, eval)("process.env") as Record<string, string | undefined>) ?? {};
  } catch {
    return (globalThis as { process?: { env?: Record<string, string | undefined> } }).process
      ?.env ?? {};
  }
}

function stripQuotes(value: string) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function parseDotEnv(text: string) {
  const out: Record<string, string> = {};
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq <= 0) continue;
    const key = line.slice(0, eq).trim();
    out[key] = stripQuotes(line.slice(eq + 1).trim());
  }
  return out;
}

let fileEnv: Record<string, string> | null = null;

function envFromFiles() {
  if (fileEnv) return fileEnv;
  fileEnv = {};
  const cwd = process.cwd();
  const roots = [cwd, join(cwd, ".."), join(cwd, "../..")];
  const names = [".env.production.local", ".env.production", ".env.local", ".env"];
  for (const root of roots) {
    for (const name of names) {
      const path = join(root, name);
      try {
        if (existsSync(path)) Object.assign(fileEnv, parseDotEnv(readFileSync(path, "utf8")));
      } catch {
        /* ignore unreadable env files */
      }
    }
  }
  return fileEnv;
}

export function env(name: string) {
  const fromProc = processEnv()[name];
  if (fromProc != null && String(fromProc).trim() !== "") {
    return stripQuotes(String(fromProc).trim());
  }
  const fromFile = envFromFiles()[name];
  return fromFile ? fromFile.trim() : "";
}

export function envStatus() {
  const username = env("ADMIN_USERNAME");
  const password = env("ADMIN_PASSWORD");
  return {
    hasUsername: Boolean(username),
    hasPassword: Boolean(password),
    hasPasswordHash: Boolean(env("ADMIN_PASSWORD_HASH")),
    hasSecret: env("SESSION_SECRET").length >= 24,
    hasDatabase: Boolean(env("DATABASE_URL")),
    usernameLength: username.length,
    passwordLength: password.length,
    usernameIsAdmin: username === "admin",
    passwordIsAdmin4417: password === "admin4417",
    passwordIsMasked: /^\*+$/.test(password),
    usernameCodes: [...username].map((c) => c.charCodeAt(0)),
  };
}
