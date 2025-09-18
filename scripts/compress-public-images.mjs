#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');

const isImage = (p) => /\.(jpe?g|png)$/i.test(p);

async function* walk(dir) {
  for (const d of await fs.promises.readdir(dir, { withFileTypes: true })) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) {
      yield* walk(entry);
    } else if (isImage(entry)) {
      yield entry;
    }
  }
}

async function compressImage(file, { qualityJpeg = 75, qualityPng = 65, toWebp = false, webpQuality = 70 } = {}) {
  const ext = path.extname(file).toLowerCase();
  const origStat = await fs.promises.stat(file);
  const input = sharp(file, { failOn: 'none' });

  let pipeline = input.rotate();
  if (ext === '.jpg' || ext === '.jpeg') {
    pipeline = pipeline.jpeg({ quality: qualityJpeg, mozjpeg: true, progressive: true });
  } else if (ext === '.png') {
    pipeline = pipeline.png({ quality: qualityPng, palette: true });
  }

  const tmp = file + '.tmp';
  await pipeline.toFile(tmp);

  // Replace if smaller
  const newStat = await fs.promises.stat(tmp);
  if (newStat.size < origStat.size) {
    await fs.promises.rename(tmp, file);
    console.log(`Compressed ${path.relative(publicDir, file)}: ${(origStat.size/1024).toFixed(1)}KB -> ${(newStat.size/1024).toFixed(1)}KB`);
  } else {
    await fs.promises.unlink(tmp);
    console.log(`Skipped  ${path.relative(publicDir, file)} (no gain)`);
  }

  if (toWebp) {
    const webpPath = file.replace(/\.(jpe?g|png)$/i, '.webp');
    await input.webp({ quality: webpQuality }).toFile(webpPath);
    const webpStat = await fs.promises.stat(webpPath);
    console.log(`WEBP     ${path.relative(publicDir, webpPath)}: ${(webpStat.size/1024).toFixed(1)}KB`);
  }
}

function parseArgs(argv) {
  const opts = { toWebp: false };
  for (const arg of argv.slice(2)) {
    if (arg === '--webp') opts.toWebp = true;
    else if (arg.startsWith('--jpeg=')) opts.qualityJpeg = Number(arg.split('=')[1]);
    else if (arg.startsWith('--png=')) opts.qualityPng = Number(arg.split('=')[1]);
    else if (arg.startsWith('--webp-q=')) opts.webpQuality = Number(arg.split('=')[1]);
  }
  return opts;
}

async function main() {
  const opts = parseArgs(process.argv);
  console.log(`Scanning ${publicDir}...`);
  let count = 0;
  for await (const f of walk(publicDir)) {
    try {
      await compressImage(f, opts);
      count++;
    } catch (e) {
      console.error('Error processing', f, e.message);
    }
  }
  console.log(`Done. Processed ${count} files.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
