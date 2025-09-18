// src/lib/snapshots.js
import fs from 'node:fs/promises';
import path from 'node:path';

const SNAP_DIR = path.join(process.cwd(), 'src', 'data', 'snapshots');

export async function readSnapshot(file) {
  try {
    const p = path.join(SNAP_DIR, file);
    const buf = await fs.readFile(p, 'utf8');
    return JSON.parse(buf);
  } catch (_) {
    return null;
  }
}
