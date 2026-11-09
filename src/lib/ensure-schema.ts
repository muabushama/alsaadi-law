import { prisma } from "@/lib/prisma";

let ready: Promise<void> | null = null;

export function ensureSchema() {
  if (!ready) {
    ready = createTables().catch((error) => {
      ready = null;
      throw error;
    });
  }
  return ready;
}

async function createTables() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS \`Request\` (
      \`id\` VARCHAR(191) NOT NULL,
      \`requestNumber\` VARCHAR(191) NOT NULL,
      \`clientName\` VARCHAR(191) NOT NULL,
      \`phone\` VARCHAR(191) NOT NULL,
      \`whatsapp\` VARCHAR(191) NULL,
      \`email\` VARCHAR(191) NULL,
      \`serviceType\` VARCHAR(191) NOT NULL,
      \`description\` TEXT NOT NULL,
      \`status\` ENUM('NEW','REVIEWING','CONTACTED','IN_PROGRESS','COMPLETED','CLOSED') NOT NULL DEFAULT 'NEW',
      \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
      \`updatedAt\` DATETIME(3) NOT NULL,
      PRIMARY KEY (\`id\`),
      UNIQUE KEY \`Request_requestNumber_key\` (\`requestNumber\`),
      KEY \`Request_status_idx\` (\`status\`),
      KEY \`Request_createdAt_idx\` (\`createdAt\`),
      KEY \`Request_serviceType_idx\` (\`serviceType\`)
    ) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS \`Attachment\` (
      \`id\` VARCHAR(191) NOT NULL,
      \`requestId\` VARCHAR(191) NOT NULL,
      \`originalName\` VARCHAR(191) NOT NULL,
      \`storedName\` VARCHAR(191) NOT NULL,
      \`mimeType\` VARCHAR(191) NOT NULL,
      \`size\` INT NOT NULL,
      \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
      PRIMARY KEY (\`id\`),
      KEY \`Attachment_requestId_idx\` (\`requestId\`),
      CONSTRAINT \`Attachment_requestId_fkey\`
        FOREIGN KEY (\`requestId\`) REFERENCES \`Request\`(\`id\`)
        ON DELETE CASCADE ON UPDATE CASCADE
    ) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}
