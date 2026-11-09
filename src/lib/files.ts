import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export const MAX_FILE_BYTES = 8 * 1024 * 1024;
export const MAX_FILES = 5;

const allowed = new Map<string, string[]>([
  ["application/pdf", [".pdf"]],
  ["image/jpeg", [".jpg", ".jpeg"]],
  ["image/png", [".png"]],
  ["application/msword", [".doc"]],
  [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    [".docx"],
  ],
]);

export function uploadDir() {
  const custom = process.env.UPLOAD_DIR;
  if (custom) {
    return path.resolve(/* turbopackIgnore: true */ custom);
  }
  return path.join(process.cwd(), "uploads");
}

export function isAllowedFile(file: File) {
  const ext = path.extname(file.name).toLowerCase();
  const mime = file.type;
  const exts = allowed.get(mime);
  if (exts?.includes(ext)) return true;
  if (!mime) {
    return [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"].includes(ext);
  }
  return false;
}

export async function saveUpload(file: File) {
  const ext = path.extname(file.name).toLowerCase() || ".bin";
  const storedName = `${randomUUID()}${ext}`;
  const dir = uploadDir();
  await mkdir(dir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(/* turbopackIgnore: true */ dir, storedName), buffer);
  return {
    originalName: file.name,
    storedName,
    mimeType: file.type || "application/octet-stream",
    size: buffer.length,
  };
}
