// src/lib/cache.js
// Small cache wrapper. Swappable backend: Vercel KV, Edge Config, or in-memory fallback.

const memory = new Map();
const DEFAULT_TTL_SEC = 60 * 60; // 1h

function nowSec() { return Math.floor(Date.now() / 1000); }

export async function getCache(key) {
  try {
    const v = memory.get(key);
    if (!v) return null;
    if (v.expiresAt && v.expiresAt < nowSec()) {
      memory.delete(key);
      return null;
    }
    return v.value;
  } catch (_) {
    return null;
  }
}

export async function setCache(key, value, ttlSec = DEFAULT_TTL_SEC) {
  try {
    const expiresAt = ttlSec ? nowSec() + ttlSec : undefined;
    memory.set(key, { value, expiresAt });
    return true;
  } catch (_) {
    return false;
  }
}

// If later you add Vercel KV/Edge Config, swap implementations here.
