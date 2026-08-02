import path from "node:path";

export const config = {
  maxUploadBytes: Number(process.env.MAX_UPLOAD_BYTES ?? 10 * 1024 * 1024),
  retentionMs: Number(process.env.FILE_RETENTION_MS ?? 60 * 60 * 1000),
  storageDir: path.resolve(process.env.DOCUMENT_STORAGE_DIR ?? "/tmp/uploads"),
  libreOfficePath: process.env.LIBREOFFICE_PATH || "soffice",
  storageProvider: process.env.STORAGE_PROVIDER ?? "local"
};

if (!Number.isFinite(config.maxUploadBytes) || config.maxUploadBytes < 1)
  throw new Error("MAX_UPLOAD_BYTES must be a positive number");