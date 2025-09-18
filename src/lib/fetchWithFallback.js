// src/lib/fetchWithFallback.js
// Orchestrates: live fetch -> cache -> snapshot -> defaults. Validates with zod schema.

import { setCache, getCache } from './cache';
import { readSnapshot } from './snapshots';

export async function fetchWithFallback({
  key,
  live, // () => Promise<any>
  schema, // zod schema
  timeoutMs = 3000,
  cacheTtlSec = 60 * 60, // 1h
  snapshotFile, // e.g. 'clients.json'
  defaults = [],
  logger = console,
}) {
  // 1) try live with timeout
  const liveResult = await tryWithTimeout(live, timeoutMs).catch(() => ({ ok: false }));
  if (liveResult?.ok) {
    const parsed = safeParse(schema, liveResult.data, logger, `live:${key}`);
    if (parsed) {
      await safeSetCache(key, parsed, cacheTtlSec, logger);
      return { data: parsed, source: 'live' };
    }
  }

  // 2) try cache
  const cached = await getCache(key).catch(() => null);
  if (cached) {
    const safe = safeParse(schema, cached, logger, `cache:${key}`);
    if (safe) return { data: safe, source: 'cache' };
  }

  // 3) try snapshot
  if (snapshotFile) {
    const snap = await readSnapshot(snapshotFile);
    if (snap) {
      const safe = safeParse(schema, snap, logger, `snapshot:${snapshotFile}`);
      if (safe) return { data: safe, source: 'snapshot' };
    }
  }

  // 4) defaults
  const safeDefaults = safeParse(schema, defaults, logger, `defaults:${key}`) || defaults;
  return { data: safeDefaults, source: 'default' };
}

async function tryWithTimeout(fn, timeoutMs) {
  if (!fn) return { ok: false };
  const timeoutPromise = new Promise((_, reject) => {
    const t = setTimeout(() => {
      clearTimeout(t);
      reject(new Error('timeout'));
    }, timeoutMs);
  });
  try {
    const data = await Promise.race([Promise.resolve().then(() => fn()), timeoutPromise]);
    return { ok: true, data };
  } catch (e) {
    return { ok: false, error: e };
  }
}

function safeParse(schema, data, logger, src) {
  if (!schema) return data;
  try {
    const parsed = schema.parse(data);
    return parsed;
  } catch (e) {
    logger?.warn?.(`[fetchWithFallback] schema parse failed from ${src}`, e?.errors || e?.message || e);
    return null;
  }
}

async function safeSetCache(key, value, ttlSec, logger) {
  try { await setCache(key, value, ttlSec); } catch (e) { logger?.warn?.('[fetchWithFallback] setCache failed', e); }
}
