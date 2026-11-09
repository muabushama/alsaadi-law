import { hash } from "bcryptjs";

async function main() {
  const password = process.argv[2];
  if (!password) {
    console.error("Usage: npx tsx scripts/hash-password.ts <password>");
    process.exit(1);
  }
  console.log(await hash(password, 12));
}

main();
