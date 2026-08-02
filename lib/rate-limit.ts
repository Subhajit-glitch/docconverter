type Entry = { count: number; resetAt: number }; const entries = new Map<string, Entry>();
export function limit(ip: string, max = 10, windowMs = 60_000) { const now = Date.now(); const entry = entries.get(ip); if (!entry || entry.resetAt < now) { entries.set(ip, { count: 1, resetAt: now + windowMs }); return true; } entry.count++; return entry.count <= max; }
