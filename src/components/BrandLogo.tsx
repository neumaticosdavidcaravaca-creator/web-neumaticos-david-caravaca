import { useEffect, useState } from 'react';

interface BrandLogoProps {
  className?: string;
}

const LOGO_SRC = '/assets/aistudio/Neum_ticos_David_png_89963276.png';
let cachedProcessedLogoUrl: string | null = null;
let processingPromise: Promise<string> | null = null;

function processLogoForDarkBg(): Promise<string> {
  if (cachedProcessedLogoUrl) {
    return Promise.resolve(cachedProcessedLogoUrl);
  }
  if (processingPromise) {
    return processingPromise;
  }

  processingPromise = new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const w = img.naturalWidth || 488;
        const h = img.naturalHeight || 158;

        const srcCanvas = document.createElement('canvas');
        srcCanvas.width = w;
        srcCanvas.height = h;
        const srcCtx = srcCanvas.getContext('2d', { willReadFrequently: true });
        if (!srcCtx) {
          resolve(LOGO_SRC);
          return;
        }
        srcCtx.drawImage(img, 0, 0);
        const fullData = srcCtx.getImageData(0, 0, w, h);
        const px = fullData.data;

        // 1. Flood-fill exterior white background from image borders
        const isBgCandidate = (idx: number) => {
          return px[idx] > 238 && px[idx + 1] > 238 && px[idx + 2] > 238;
        };

        const isExterior = new Uint8Array(w * h);
        const queue = new Int32Array(w * h);
        let head = 0;
        let tail = 0;

        const seed = (x: number, y: number) => {
          const p = y * w + x;
          if (!isExterior[p] && isBgCandidate(p * 4)) {
            isExterior[p] = 1;
            queue[tail++] = p;
          }
        };

        for (let x = 0; x < w; x++) {
          seed(x, 0);
          seed(x, h - 1);
        }
        for (let y = 0; y < h; y++) {
          seed(0, y);
          seed(w - 1, y);
        }

        while (head < tail) {
          const p = queue[head++];
          const x = p % w;
          const y = (p - x) / w;
          if (x > 0) seed(x - 1, y);
          if (x < w - 1) seed(x + 1, y);
          if (y > 0) seed(x, y - 1);
          if (y < h - 1) seed(x, y + 1);
        }

        const isAdjacentToExterior = (x: number, y: number) => {
          if (x > 0 && isExterior[y * w + (x - 1)]) return true;
          if (x < w - 1 && isExterior[y * w + (x + 1)]) return true;
          if (y > 0 && isExterior[(y - 1) * w + x]) return true;
          if (y < h - 1 && isExterior[(y + 1) * w + x]) return true;
          return false;
        };

        // 2. Crop tightly around actual logo graphic (eliminates empty white padding)
        const cropX = 10;
        const cropY = 16;
        const cropW = Math.min(464, w - cropX);
        const cropH = Math.min(106, h - cropY);

        const outCanvas = document.createElement('canvas');
        outCanvas.width = cropW;
        outCanvas.height = cropH;
        const outCtx = outCanvas.getContext('2d');
        if (!outCtx) {
          resolve(LOGO_SRC);
          return;
        }

        const outImg = outCtx.createImageData(cropW, cropH);
        const out = outImg.data;

        for (let y = 0; y < cropH; y++) {
          const absY = cropY + y;
          for (let x = 0; x < cropW; x++) {
            const absX = cropX + x;
            const p = absY * w + absX;
            const i = p * 4;
            const o = (y * cropW + x) * 4;

            const r = px[i];
            const g = px[i + 1];
            const b = px[i + 2];

            if (isExterior[p]) {
              out[o] = 0;
              out[o + 1] = 0;
              out[o + 2] = 0;
              out[o + 3] = 0;
              continue;
            }

            const maxC = Math.max(r, g, b);
            const minC = Math.min(r, g, b);
            const sat = maxC - minC;

            // Inside the green slogan bar ("Seguimos Dejando huella") and not on outer bar border
            const inSloganBarInterior =
              absX >= 216 &&
              absX <= 456 &&
              absY >= 71 &&
              absY <= 84 &&
              !isAdjacentToExterior(absX, absY);

            if (inSloganBarInterior) {
              if (g > r + 10 && g > b + 20) {
                out[o] = 134;
                out[o + 1] = 208;
                out[o + 2] = 64;
                out[o + 3] = 255;
              } else {
                // Keep white letters crisp inside the green bar
                out[o] = Math.min(255, Math.round(r * 1.05));
                out[o + 1] = Math.min(255, Math.round(g * 1.08));
                out[o + 2] = Math.min(255, Math.round(b * 1.05));
                out[o + 3] = 255;
              }
              continue;
            }

            // Neutral / grayscale pixels: black "Neumáticos David" -> crisp white; white holes -> transparent
            if (sat <= 28) {
              const lum = (r + g + b) / 3;
              const ink = Math.max(0, Math.min(1, (240 - lum) / 210));
              out[o] = 255;
              out[o + 1] = 255;
              out[o + 2] = 255;
              out[o + 3] = Math.round(ink * 255);
              continue;
            }

            // Apple green graphics (tyre, arrow, "CARAVACA", slogan bar outer edges)
            if (g >= r && g > b + 8) {
              const coverage = Math.max(0, Math.min(1, (248 - b) / (248 - 80)));
              out[o] = 148;
              out[o + 1] = 216;
              out[o + 2] = 68;
              out[o + 3] = Math.round(coverage * 255);
              continue;
            }

            const lum = (r + g + b) / 3;
            const alpha = Math.max(0, Math.min(1, (244 - lum) / 180));
            out[o] = 255;
            out[o + 1] = 255;
            out[o + 2] = 255;
            out[o + 3] = Math.round(alpha * 255);
          }
        }

        outCtx.putImageData(outImg, 0, 0);
        const dataUrl = outCanvas.toDataURL('image/png');
        cachedProcessedLogoUrl = dataUrl;
        resolve(dataUrl);
      } catch {
        resolve(LOGO_SRC);
      }
    };
    img.onerror = () => resolve(LOGO_SRC);
    img.src = LOGO_SRC;
  });

  return processingPromise;
}

export function BrandLogo({ className = 'h-11 w-auto' }: BrandLogoProps) {
  const [processedSrc, setProcessedSrc] = useState<string | null>(cachedProcessedLogoUrl);

  useEffect(() => {
    let active = true;
    if (!cachedProcessedLogoUrl) {
      processLogoForDarkBg().then((url) => {
        if (active) setProcessedSrc(url);
      });
    }
    return () => {
      active = false;
    };
  }, []);

  if (!processedSrc) {
    return (
      <div
        className={`${className} aspect-[464/106] opacity-0`}
        aria-label="Neumáticos David Caravaca"
      />
    );
  }

  return (
    <img
      src={processedSrc}
      alt="Neumáticos David - Caravaca. Seguimos dejando huella"
      referrerPolicy="no-referrer"
      className={`${className} object-contain [filter:drop-shadow(0_0_12px_rgba(74,222,128,0.28))]`}
    />
  );
}
