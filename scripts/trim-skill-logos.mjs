import sharp from "sharp";
import fs from "fs";

async function trimFile(src, dest) {
  const img = sharp(src);
  const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: c } = info;
  let minX = w,
    minY = h,
    maxX = 0,
    maxY = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * c;
      const a = c === 4 ? data[i + 3] : 255;
      if (a < 10) continue;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  if (maxX < minX) {
    console.log(src, "no opaque pixels");
    return;
  }

  const pad = 2;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(w - 1, maxX + pad);
  maxY = Math.min(h - 1, maxY + pad);
  const tw = maxX - minX + 1;
  const th = maxY - minY + 1;

  const tmp = dest + ".tmp.png";
  await sharp(src).extract({ left: minX, top: minY, width: tw, height: th }).png().toFile(tmp);
  fs.renameSync(tmp, dest);
  console.log(src, "->", `${tw}x${th}`, dest);
}

await trimFile("src/assets/skills/lovable.png", "src/assets/skills/lovable.png");
await trimFile("src/assets/skills/magnific.webp", "src/assets/skills/magnific.png");
