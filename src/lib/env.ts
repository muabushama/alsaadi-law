/** Runtime env read. Avoid process.env.NAME so Next does not inline empty values at build. */
export function env(name: string) {
  return String(process.env[name] ?? "").trim();
}
