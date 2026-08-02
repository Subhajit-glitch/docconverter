import { randomUUID } from "node:crypto";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { config } from "./config";
export type StoredJob = { id: string; directory: string; inputPath: string; outputPath?: string; downloadName?: string; createdAt: number };
const jobs = new Map<string, StoredJob>();
export async function createJob(originalName: string) { const id = randomUUID(); const directory = path.join(config.storageDir, id); await mkdir(directory, { recursive: true, mode: 0o700 }); const inputPath = path.join(directory, `input-${safeName(originalName)}`); const job: StoredJob = { id, directory, inputPath, createdAt: Date.now() }; jobs.set(id, job); return job; }
export function getJob(id: string) { const job = jobs.get(id); if (!job || Date.now() - job.createdAt > config.retentionMs) return undefined; return job; }
export function markOutput(job: StoredJob, outputPath: string, downloadName: string) { job.outputPath = outputPath; job.downloadName = downloadName; jobs.set(job.id, job); setTimeout(() => void removeJob(job.id), config.retentionMs).unref?.(); }
export async function removeJob(id: string) { const job = jobs.get(id); jobs.delete(id); if (job) await rm(job.directory, { recursive: true, force: true }); }
export async function cleanExpiredJobs() { await Promise.all([...jobs.values()].filter(j => Date.now() - j.createdAt > config.retentionMs).map(j => removeJob(j.id))); }
function safeName(name: string) { return path.basename(name).replace(/[^a-zA-Z0-9._-]/g, "_").slice(-120) || "document"; }
