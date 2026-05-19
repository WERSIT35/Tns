import sharp from 'sharp';
import { readdir, stat, rename } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const ASSETS = 'src/assets';
const SKIP_DIRS = ['alllogos', 'alk-sanet-master'];

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIRS.includes(e.name)) continue;
      yield* walk(full);
    } else {
      yield full;
    }
  }
}

const banner = 'src/assets/banner.png';
if (existsSync(banner)) {
  const before = (await stat(banner)).size;
  await sharp(banner)
    .resize({ width: 1600, withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true, quality: 80 })
    .toFile(banner + '.opt');
  const after = (await stat(banner + '.opt')).size;
  await rename(banner + '.opt', banner);
  console.log(`banner.png: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`);

  await sharp(banner).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 75 }).toFile('src/assets/banner.webp');
  const w = (await stat('src/assets/banner.webp')).size;
  console.log(`banner.webp: ${(w / 1024).toFixed(0)}KB`);
}

let totalBefore = 0;
let totalAfter = 0;
let count = 0;
for await (const file of walk(ASSETS)) {
  const ext = extname(file).toLowerCase();
  if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') continue;
  if (file.endsWith('banner.png')) continue;
  const before = (await stat(file)).size;
  totalBefore += before;

  const webpPath = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  if (!existsSync(webpPath)) {
    await sharp(file)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(webpPath);
  }
  const after = (await stat(webpPath)).size;
  totalAfter += after;
  count++;
}
console.log(
  `Catalog: ${count} files. ${(totalBefore / 1024 / 1024).toFixed(2)}MB -> ${(totalAfter / 1024 / 1024).toFixed(2)}MB WebP (${((1 - totalAfter / totalBefore) * 100).toFixed(0)}% smaller)`,
);
