import { memo, useCallback, useEffect, useRef, useState, type RefObject } from "react";
import svgMarkup from "@/assets/illustration_vector.svg?raw";
import capture01Markup from "@/assets/capture/capture01.svg?raw";
import polaroid1 from "@/assets/polaroids/01.png";
import polaroid2 from "@/assets/polaroids/02.png";
import polaroid3 from "@/assets/polaroids/03.png";
import polaroid4 from "@/assets/polaroids/04.png";
import polaroid5 from "@/assets/polaroids/05.png";

const POLAROID_PHOTOS = [
  polaroid1,
  polaroid2,
  polaroid3,
  polaroid4,
  polaroid5,
] as const;

/** Five-petal flower from polaroid 3 — used on every shot. */
const FLOWER_ANGLES = [0, 72, 144, 216, 288] as const;

const POLAROID_ROTATIONS = [-6, 4, -2, 7, -5] as const;

const POLAROID_CAPTIONS = [
  ["washington, d.c,", "capital 24'"],
  ["new york,", "christmas eve 24'"],
  ["san diego,", "la jolla beach 25'"],
  ["los angeles,", "little tokyo 25'"],
  ["valencia,", "spain 26'"],
] as const;

const NS = "http://www.w3.org/2000/svg";

const CAPTURE_CURSOR_PATH =
  '<path class="cls-4" d="M335.46,129.81c-.52-13.82-1.05-27.65-1.57-41.47,10.16,9.22,20.32,18.43,30.48,27.65-3.2,1.48-6.41,2.97-9.61,4.45,1.74,3.54,3.48,7.09,5.22,10.63-2.72,1.27-5.43,2.55-8.15,3.82-1.89-3.79-3.79-7.57-5.68-11.36-3.56,2.09-7.12,4.19-10.68,6.28Z"/>';

const CAPTURE_YELLOW_FLOWER_PATH = '<path class="cls-12" d="M50.05,196.47c-1.45-1.87-3.79-2.18-4.26-2.24-4.16-.54-7.94,2.75-11.99,6.28-1.09.95-1.95,1.79-2.53,2.38,1.34-2,2.34-3.73,3.03-4.98,2.68-4.85,2.83-6.52,2.85-7.37.02-.9.06-2.52-.83-4.12-2.36-4.23-9.48-5.16-13.17-2.75-.95.62-1.52,1.36-1.63,1.52-1.58,2.1-1.36,4.68-1.23,6.35.21,2.79.83,7.15,2.74,12.64-.65-1.46-1.73-3.58-3.39-5.92-2.59-3.64-6.62-9.29-11.34-8.81-2.96.3-4.93,2.88-5.05,3.06-1.39,1.87-1.51,3.91-1.51,4.53.03,4.15,6.46,8.67,15.88,10.76-7.75-.99-14.42.58-16.68,4.55-.84,1.48-.93,3.05-.94,3.32-.16,3.58,2.35,7.35,5.78,8.38.23.07,1.18.34,2.45.26,1.08-.06,3.05-.42,7.88-4.74,1.03-.92,2.41-2.22,3.97-3.9-1.02,1.08-2.48,2.88-3.61,5.42-1.11,2.49-3.03,6.78-1.01,10.54,1.47,2.73,4.2,3.64,4.55,3.75,2.56.81,5.47.24,7.44-1.44,2.47-2.12,2.62-5.26,2.74-7.73.13-2.64-.48-4.92-.99-6.86-.41-1.56-.88-2.84-1.25-3.75,3.23,7.63,8.47,12.42,12.78,11.84,1.81-.24,3.36-1.41,3.68-1.66,2.3-1.79,4.21-5.2,3.39-8.66-.89-3.79-4.53-5.46-6.17-6.21-2.09-.96-4.01-1.16-5.24-1.19,7.54-.2,13.38-3.17,14.51-7.33.1-.36.97-3.55-.87-5.92ZM27.65,211.44c-.79,1.16-2.18,1.27-2.5,1.3-.47.04-1.41.11-2.1-.48-1-.86-1-2.7-.2-3.89.76-1.14,2.41-1.96,3.76-1.31,1.14.55,1.55,1.9,1.52,2.85,0,.22-.04.89-.48,1.54Z"/>';

const taggedCaptureMarkup = capture01Markup
  .replace("<svg ", '<svg overflow="visible" ')
  .replace(
    CAPTURE_CURSOR_PATH,
    `<g class="capture-live-cursor" transform="translate(0 78)"><g class="capture-live-cursor-nudge">${CAPTURE_CURSOR_PATH}</g></g>`,
  )
  .replace(
    CAPTURE_YELLOW_FLOWER_PATH,
    `<g class="capture-yellow-flower" transform="translate(0 -88)"><g class="capture-yellow-flower-spin">${CAPTURE_YELLOW_FLOWER_PATH}</g></g>`,
  );

function scopeInlineSvgCss(markup: string, scope: string) {
  return markup.replace(/<style>([\s\S]*?)<\/style>/i, (_match, css: string) => {
    const scoped = css.replace(/([^{}]+)\{/g, (rule: string, selectors: string) => {
      const trimmed = selectors.trim();
      if (!trimmed || trimmed.startsWith("@")) return rule;
      const next = trimmed
        .split(",")
        .map((sel) => {
          const s = sel.trim();
          return s ? `${scope} ${s}` : s;
        })
        .join(", ");
      return `${next} {`;
    });
    return `<style>${scoped}</style>`;
  });
}

const scopedDeskMarkup = scopeInlineSvgCss(svgMarkup, ".hero-desk-art");

const DESK_LAYER_ORDER = [
  "chair",
  "table",
  "me",
  "screen",
  "wacom",
  "keyboard",
  "left_arm",
  "tea_cup",
  "shelf",
  "books",
  "camera",
  "lamp",
  "vase",
  "plant01",
  "plant02",
  "polaroids",
  "drawonscreen",
] as const;

const DESK_TYPE_MS = DESK_LAYER_ORDER.length * 75 + 520;

const taggedDeskMarkup = DESK_LAYER_ORDER.reduce((markup, id, index) => {
  return markup.replace(
    `<g id="${id}"`,
    `<g id="${id}" class="desk-layer" style="--desk-i:${index}"`,
  );
}, scopedDeskMarkup);

let audioCtx: AudioContext | null = null;
let rustleBuffer: AudioBuffer | null = null;
let cupClickBuffer: AudioBuffer | null = null;

function getAudioContext() {
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext;
  if (!AC) return null;
  if (!audioCtx) audioCtx = new AC();
  if (audioCtx.state === "suspended") void audioCtx.resume();
  return audioCtx;
}

function getRustleBuffer(ctx: AudioContext) {
  if (rustleBuffer) return rustleBuffer;
  const dur = 0.85;
  const noiseBuf = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * dur), ctx.sampleRate);
  const data = noiseBuf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < data.length; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    const t = i / data.length;
    const env = Math.sin(Math.PI * t) ** 1.35;
    const flutter = 0.65 + 0.35 * Math.sin(t * Math.PI * 9);
    data[i] = last * 4.2 * env * flutter;
  }
  rustleBuffer = noiseBuf;
  return noiseBuf;
}

/** Soft leaf-rustle for the right-side plant (Web Audio, no asset files). */
function playPlantRustle() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const dur = 0.85;

    const src = ctx.createBufferSource();
    src.buffer = getRustleBuffer(ctx);

    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.setValueAtTime(1400, now);
    bp.frequency.exponentialRampToValueAtTime(2200, now + 0.28);
    bp.frequency.exponentialRampToValueAtTime(1100, now + dur);
    bp.Q.value = 0.7;

    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 380;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.22, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    src.connect(bp);
    bp.connect(hp);
    hp.connect(gain);
    gain.connect(ctx.destination);
    src.start(now);
    src.stop(now + dur + 0.02);
  } catch {
    /* ignore — autoplay / unsupported */
  }
}

function getCupClickBuffer(ctx: AudioContext) {
  if (cupClickBuffer) return cupClickBuffer;
  const n = Math.ceil(ctx.sampleRate * 0.06);
  const buf = ctx.createBuffer(1, n, ctx.sampleRate);
  const data = buf.getChannelData(0);
  let brown = 0;
  for (let i = 0; i < n; i++) {
    brown = (brown + (Math.random() * 2 - 1) * 0.08) / 1.08;
    const env = 1 - i / n;
    data[i] = brown * 6.5 * env;
  }
  cupClickBuffer = buf;
  return buf;
}

/** Camera flash + shutter, no asset files. */
function playShutterClick() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const n = Math.ceil(ctx.sampleRate * 0.18);
    const buf = ctx.createBuffer(1, n, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < n; i++) {
      const t = i / n;
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 2.4);
    }

    const flash = ctx.createBufferSource();
    flash.buffer = buf;
    const flashHp = ctx.createBiquadFilter();
    flashHp.type = "highpass";
    flashHp.frequency.value = 1400;
    const flashGain = ctx.createGain();
    flashGain.gain.setValueAtTime(0.0001, now);
    flashGain.gain.exponentialRampToValueAtTime(0.42, now + 0.006);
    flashGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
    flash.connect(flashHp);
    flashHp.connect(flashGain);
    flashGain.connect(ctx.destination);
    flash.start(now);
    flash.stop(now + 0.18);

    const pop = (time: number, freq: number, amp: number, dur: number) => {
      const osc = ctx.createOscillator();
      osc.type = "square";
      osc.frequency.setValueAtTime(freq, time);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.38, time + dur);
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 2400;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(amp, time + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);
      osc.connect(lp);
      lp.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + dur + 0.02);
    };

    pop(now + 0.018, 2100, 0.14, 0.04);
    pop(now + 0.072, 980, 0.18, 0.055);
  } catch {
    /* ignore — autoplay / unsupported */
  }
}

/** Dull ceramic mug knocking on wood — no glassy ring. */
function playCupRattle() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const hits = [
      { t: 0.02, amp: 1 },
      { t: 0.14, amp: 0.72 },
      { t: 0.3, amp: 0.48 },
      { t: 0.45, amp: 0.3 },
      { t: 0.6, amp: 0.16 },
      { t: 0.74, amp: 0.08 },
    ];

    hits.forEach((hit, seed) => {
      const time = now + hit.t;
      const master = ctx.createGain();
      const tone = ctx.createBiquadFilter();
      tone.type = "lowpass";
      tone.frequency.value = 1400;
      tone.Q.value = 0.55;
      master.gain.setValueAtTime(0.0001, time);
      master.gain.exponentialRampToValueAtTime(0.55 * hit.amp, time + 0.003);
      master.gain.exponentialRampToValueAtTime(0.0001, time + 0.16);
      master.connect(tone);
      tone.connect(ctx.destination);

      const wood = ctx.createOscillator();
      wood.type = "sine";
      const woodFreq = 92 + (seed % 3) * 8;
      wood.frequency.setValueAtTime(woodFreq, time);
      wood.frequency.exponentialRampToValueAtTime(58, time + 0.07);
      const woodGain = ctx.createGain();
      woodGain.gain.setValueAtTime(0.9 * hit.amp, time);
      woodGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.09);
      wood.connect(woodGain);
      woodGain.connect(master);
      wood.start(time);
      wood.stop(time + 0.1);

      const body = ctx.createOscillator();
      body.type = "triangle";
      const bodyFreq = 310 + (seed % 4) * 22;
      body.frequency.setValueAtTime(bodyFreq, time);
      body.frequency.exponentialRampToValueAtTime(bodyFreq * 0.72, time + 0.05);
      const bodyGain = ctx.createGain();
      bodyGain.gain.setValueAtTime(0.38 * hit.amp, time);
      bodyGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.055);
      body.connect(bodyGain);
      bodyGain.connect(master);
      body.start(time);
      body.stop(time + 0.07);

      const rim = ctx.createOscillator();
      rim.type = "sine";
      const rimFreq = 620 + (seed % 5) * 18;
      rim.frequency.setValueAtTime(rimFreq, time);
      rim.frequency.exponentialRampToValueAtTime(rimFreq * 0.88, time + 0.035);
      const rimGain = ctx.createGain();
      rimGain.gain.setValueAtTime(0.12 * hit.amp, time);
      rimGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.04);
      rim.connect(rimGain);
      rimGain.connect(master);
      rim.start(time);
      rim.stop(time + 0.05);

      const knock = ctx.createBufferSource();
      knock.buffer = getCupClickBuffer(ctx);
      const knockBp = ctx.createBiquadFilter();
      knockBp.type = "bandpass";
      knockBp.frequency.value = 480;
      knockBp.Q.value = 0.85;
      const knockGain = ctx.createGain();
      knockGain.gain.setValueAtTime(0.55 * hit.amp, time);
      knockGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.045);
      knock.connect(knockBp);
      knockBp.connect(knockGain);
      knockGain.connect(master);
      knock.start(time);
      knock.stop(time + 0.06);
    });
  } catch {
    /* ignore — autoplay / unsupported */
  }
}

/** Inline SVG content (viewBox 0 0 48 48) — same flower on every polaroid. */
function appendSymbolShapes(parent: SVGElement) {
  const g = document.createElementNS(NS, "g");
  g.setAttribute("fill", "#5c992d");
  FLOWER_ANGLES.forEach((deg) => {
    const petal = document.createElementNS(NS, "ellipse");
    petal.setAttribute("cx", "24");
    petal.setAttribute("cy", "14.5");
    petal.setAttribute("rx", "7.2");
    petal.setAttribute("ry", "10.2");
    petal.setAttribute("transform", `rotate(${deg} 24 24)`);
    g.appendChild(petal);
  });
  parent.appendChild(g);
}

function placeSymbolsInIllustration(root: HTMLElement) {
  // New illustration already paints flowers on the film
  if (root.querySelector("#polaroids > path.cls-27")) return;
  const shots = [
    ...root.querySelectorAll<SVGGElement>("#polaroids .polaroid-shot"),
  ];
  shots.forEach((shot) => {
    if (shot.querySelector(".polaroid-inline-symbol")) return;
    const match = shot.id.match(/polaroid-(\d+)/);
    const index = match ? Number(match[1]) - 1 : -1;
    if (index < 0) return;

    const hole =
      shot.querySelector<SVGRectElement>("rect.cls-4") ??
      shot.querySelector<SVGRectElement>("rect.cls-3");
    if (!hole) return;

    const x = Number(hole.getAttribute("x") ?? 0);
    const y = Number(hole.getAttribute("y") ?? 0);
    const w = Number(hole.getAttribute("width") ?? 0);
    const h = Number(hole.getAttribute("height") ?? 0);
    const transform = hole.getAttribute("transform");
    const pad = w * 0.14;

    const symbol = document.createElementNS(NS, "svg");
    symbol.setAttribute("class", "polaroid-inline-symbol");
    symbol.setAttribute("viewBox", "0 0 48 48");
    symbol.setAttribute("x", String(x + pad));
    symbol.setAttribute("y", String(y + pad));
    symbol.setAttribute("width", String(w - pad * 2));
    symbol.setAttribute("height", String(h - pad * 2));
    symbol.setAttribute("overflow", "visible");
    if (transform) symbol.setAttribute("transform", transform);
    appendSymbolShapes(symbol);
    shot.appendChild(symbol);
  });
}

function PolaroidSymbol() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="polaroid-lightbox-symbol"
      aria-hidden
    >
      <g fill="#5c992d">
        {FLOWER_ANGLES.map((deg) => (
          <ellipse
            key={deg}
            cx="24"
            cy="14.5"
            rx="7.2"
            ry="10.2"
            transform={`rotate(${deg} 24 24)`}
          />
        ))}
      </g>
    </svg>
  );
}

function HandwrittenCaption({ lines }: { lines: readonly string[] }) {
  let charIndex = 0;

  return (
    <figcaption className="polaroid-lightbox-caption" aria-label={lines.join(" ")}>
      {lines.map((line) => (
        <span key={line} className="polaroid-caption-line">
          {Array.from(line).map((char) => {
            const delay = 0.45 + charIndex * 0.045;
            charIndex += 1;
            return (
              <span
                key={`${line}-${charIndex}`}
                className="polaroid-caption-char"
                style={{ animationDelay: `${delay}s` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </span>
      ))}
    </figcaption>
  );
}

function wait(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }
    const id = window.setTimeout(() => resolve(), ms);
    signal.addEventListener(
      "abort",
      () => {
        window.clearTimeout(id);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true }
    );
  });
}

function groupDrawingHand(root: HTMLElement) {
  if (root.querySelector("#drawing-hand")) return;
  const me = root.querySelector<SVGGElement>("#me");
  const pen = root.querySelector<SVGGElement>("#pen_ponta");
  const hand = root.querySelector<SVGGElement>("#mao_dir");
  if (!me || !pen?.parentNode || !hand) return;

  const g = document.createElementNS(NS, "g");
  g.setAttribute("id", "drawing-hand");
  pen.parentNode.insertBefore(g, pen);
  g.appendChild(pen);
  g.appendChild(hand);

  const handBox = hand.getBBox();
  for (const path of me.querySelectorAll<SVGPathElement>(":scope > path.cls-18")) {
    const box = path.getBBox();
    if (box.y < 490 && box.x + box.width > 1040) {
      g.appendChild(path);
    }
  }

  const groupBox = g.getBBox();
  const wristX = handBox.x - groupBox.x + handBox.width * 0.1;
  const wristY = handBox.y - groupBox.y + handBox.height;
  g.style.transformBox = "fill-box";
  g.style.transformOrigin = `${wristX}px ${wristY}px`;
}

function groupPlant01Leaves(root: HTMLElement) {
  const plant01 = root.querySelector<SVGGElement>("#plant01");
  if (!plant01 || plant01.querySelector("#plant01-leaves")) return;

  const leaves = [
    ...plant01.querySelectorAll<SVGPathElement>("path.cls-23, path.cls-25"),
  ];
  if (leaves.length === 0) return;

  const leafGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  leafGroup.setAttribute("id", "plant01-leaves");
  leaves[0].parentNode?.insertBefore(leafGroup, leaves[0]);
  leaves.forEach((leaf) => leafGroup.appendChild(leaf));
}

type DeskSvgProps = {
  tipRef: RefObject<HTMLSpanElement | null>;
  onPolaroidClick: (index: number) => void;
  onCameraClick: () => void;
};

const DeskSvg = memo(function DeskSvg({ tipRef, onPolaroidClick, onCameraClick }: DeskSvgProps) {
  const ref = useRef<HTMLDivElement>(null);
  const onPolaroidClickRef = useRef(onPolaroidClick);
  const onCameraClickRef = useRef(onCameraClick);
  onPolaroidClickRef.current = onPolaroidClick;
  onCameraClickRef.current = onCameraClick;

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    groupPlant01Leaves(root);
    groupDrawingHand(root);
    placeSymbolsInIllustration(root);

    root.querySelectorAll<SVGGElement>("#left_arm .desk-finger").forEach((finger) => {
      const box = finger.getBBox();
      finger.style.transformBox = "fill-box";
      finger.style.transformOrigin = `${box.width}px ${box.height * 0.5}px`;
    });

    const cleanups: Array<() => void> = [];

    const wacom = root.querySelector<SVGGElement>("#wacom");
    const pathList = [
      ...root.querySelectorAll<SVGPathElement>("#drawonscreen path"),
    ];

    if (wacom && pathList.length > 0) {
      const ordered = [...pathList].sort((a, b) => {
        return a.getPointAtLength(0).y - b.getPointAtLength(0).y;
      });

      const lengths = ordered.map((path) => {
        const length = path.getTotalLength();
        const start = path.getPointAtLength(0);
        const end = path.getPointAtLength(length);
        const fromEnd = start.y > end.y;
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${fromEnd ? -length : length}`;
        path.style.animation = "none";
        return { length, hidden: fromEnd ? -length : length };
      });

      const totalLength = lengths.reduce((sum, item) => sum + item.length, 0);
      const drawMs = 2400;
      const holdMs = 700;
      const activeAnims: Animation[] = [];
      let loopController: AbortController | null = null;

      const hideAll = () => {
        activeAnims.splice(0).forEach((anim) => anim.cancel());
        ordered.forEach((path, index) => {
          path.style.strokeDashoffset = `${lengths[index].hidden}`;
        });
      };

      const animateOffset = (
        path: SVGPathElement,
        from: number,
        to: number,
        duration: number
      ) => {
        const anim = path.animate(
          [{ strokeDashoffset: from }, { strokeDashoffset: to }],
          { duration, easing: "ease-in-out", fill: "forwards" }
        );
        activeAnims.push(anim);
        return anim.finished.then(() => {
          path.style.strokeDashoffset = `${to}`;
        });
      };

      const runLoop = async (signal: AbortSignal) => {
        try {
          while (!signal.aborted) {
            hideAll();

            for (let i = 0; i < ordered.length; i++) {
              if (signal.aborted) return;
              const duration = Math.max(
                280,
                (lengths[i].length / totalLength) * drawMs
              );
              await animateOffset(ordered[i], lengths[i].hidden, 0, duration);
            }

            if (signal.aborted) return;
            await wait(holdMs, signal);

            for (let i = ordered.length - 1; i >= 0; i--) {
              if (signal.aborted) return;
              const duration = Math.max(
                180,
                (lengths[i].length / totalLength) * 900
              );
              await animateOffset(ordered[i], 0, lengths[i].hidden, duration);
            }
          }
        } catch (error) {
          if (!(error instanceof DOMException && error.name === "AbortError")) {
            throw error;
          }
        }
      };

      const startLoop = () => {
        if (loopController) return;
        loopController = new AbortController();
        void runLoop(loopController.signal);
      };

      const stopLoop = () => {
        loopController?.abort();
        loopController = null;
        hideAll();
      };

      wacom.addEventListener("mouseenter", startLoop);
      wacom.addEventListener("mouseleave", stopLoop);
      cleanups.push(() => {
        stopLoop();
        wacom.removeEventListener("mouseenter", startLoop);
        wacom.removeEventListener("mouseleave", stopLoop);
      });
    }

    const plant02 = root.querySelector<SVGGElement>("#plant02");
    if (plant02) {
      const bumpPlant = () => {
        playPlantRustle();
        plant02.classList.remove("is-bumping");
        void plant02.getBoundingClientRect();
        plant02.classList.add("is-bumping");
        window.setTimeout(() => {
          plant02.classList.remove("is-bumping");
        }, 900);
      };
      plant02.addEventListener("click", bumpPlant);
      cleanups.push(() => {
        plant02.classList.remove("is-bumping");
        plant02.removeEventListener("click", bumpPlant);
      });
    }

    const teaCup = root.querySelector<SVGGElement>("#tea_cup");
    if (teaCup) {
      const wobbleCup = () => {
        playCupRattle();
        teaCup.classList.remove("is-wobbling");
        void teaCup.getBoundingClientRect();
        teaCup.classList.add("is-wobbling");
        window.setTimeout(() => {
          teaCup.classList.remove("is-wobbling");
        }, 950);
      };
      teaCup.addEventListener("click", wobbleCup);
      cleanups.push(() => {
        teaCup.classList.remove("is-wobbling");
        teaCup.removeEventListener("click", wobbleCup);
      });
    }

    const camera = root.querySelector<SVGGElement>("#camera");
    if (camera) {
      const clickCamera = () => {
        playShutterClick();
        camera.classList.remove("is-capturing");
        void camera.getBoundingClientRect();
        camera.classList.add("is-capturing");
        window.setTimeout(() => {
          camera.classList.remove("is-capturing");
        }, 520);
        onCameraClickRef.current();
      };
      camera.addEventListener("click", clickCamera);
      cleanups.push(() => {
        camera.classList.remove("is-capturing");
        camera.removeEventListener("click", clickCamera);
      });
    }

    const polaroids = root.querySelector<SVGGElement>("#polaroids");
    if (polaroids) {
      polaroids.style.pointerEvents = "visiblePainted";

      let tipRaf = 0;
      let following = false;
      let tipX = 0;
      let tipY = 0;
      let curX = 0;
      let curY = 0;
      const tickTip = () => {
        tipRaf = 0;
        const tip = tipRef.current;
        if (!tip) return;
        curX += (tipX - curX) * 0.18;
        curY += (tipY - curY) * 0.18;
        tip.style.transform = `translate3d(${curX + 14}px, ${curY + 14}px, 0)`;
        tip.style.opacity = "1";
        if (Math.abs(tipX - curX) > 0.4 || Math.abs(tipY - curY) > 0.4) {
          tipRaf = window.requestAnimationFrame(tickTip);
        } else {
          following = false;
        }
      };
      const moveTip = (e: MouseEvent) => {
        tipX = e.clientX;
        tipY = e.clientY;
        if (!following) {
          following = true;
          if (curX === 0 && curY === 0) {
            curX = tipX;
            curY = tipY;
          }
          tipRaf = window.requestAnimationFrame(tickTip);
        }
      };
      const hideTip = () => {
        following = false;
        window.cancelAnimationFrame(tipRaf);
        tipRaf = 0;
        const tip = tipRef.current;
        if (!tip) return;
        tip.style.opacity = "0";
      };
      polaroids.addEventListener("mousemove", moveTip);
      polaroids.addEventListener("mouseleave", hideTip);
      cleanups.push(() => {
        hideTip();
        window.cancelAnimationFrame(tipRaf);
        polaroids.removeEventListener("mousemove", moveTip);
        polaroids.removeEventListener("mouseleave", hideTip);
      });

      // Event delegation — more reliable than per-shot listeners (esp. mobile)
      const onPolaroidsPointer = (e: Event) => {
        const target = e.target;
        if (!(target instanceof Element)) return;
        const shot = target.closest<SVGGElement>(".polaroid-shot");
        if (!shot || !polaroids.contains(shot)) return;
        const match = shot.id.match(/polaroid-(\d+)/);
        const index = match ? Number(match[1]) - 1 : -1;
        if (index < 0 || index >= POLAROID_PHOTOS.length) return;
        e.preventDefault();
        e.stopPropagation();
        hideTip();
        onPolaroidClickRef.current(index);
      };
      polaroids.addEventListener("click", onPolaroidsPointer);
      cleanups.push(() => {
        polaroids.removeEventListener("click", onPolaroidsPointer);
      });
    }

    const steamPaths = [
      ...root.querySelectorAll<SVGPathElement>("#tea_cup .tea-steam"),
    ];
    steamPaths.forEach((path) => {
      const len = path.getTotalLength();
      if (len < 1) return;
      path.style.setProperty("--steam-len", `${len}`);
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
    });

    let typedDoneTimer = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      root.classList.add("is-typed", "is-typed-done");
    } else {
      root.classList.add("is-typed");
      typedDoneTimer = window.setTimeout(() => {
        root.classList.add("is-typed-done");
      }, DESK_TYPE_MS);
    }
    const vis = new IntersectionObserver(
      ([entry]) => {
        const onScreen = Boolean(
          entry?.isIntersecting && entry.intersectionRatio > 0.06,
        );
        root.classList.toggle("is-animating", onScreen);
      },
      { threshold: [0, 0.06, 0.2] },
    );
    vis.observe(root);
    cleanups.push(() => {
      window.clearTimeout(typedDoneTimer);
      vis.disconnect();
      root.classList.remove("is-animating", "is-typed", "is-typed-done");
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [tipRef]);

  return (
    <div
      ref={ref}
      className="hero-desk-art"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: taggedDeskMarkup }}
    />
  );
}, (prev, next) => prev.tipRef === next.tipRef);

export function HeroDeskArt({
  memoriesLabel = "memories",
}: {
  memoriesLabel?: string;
}) {
  const tipRef = useRef<HTMLSpanElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [flashing, setFlashing] = useState(false);
  const [capture, setCapture] = useState(false);
  const capturingRef = useRef(false);
  const flashTimerRef = useRef(0);

  useEffect(() => {
    if (tipRef.current) tipRef.current.textContent = memoriesLabel;
  }, [memoriesLabel]);

  useEffect(() => {
    if (openIndex === null && !capture) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenIndex(null);
      setCapture(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, capture]);

  useEffect(() => {
    return () => {
      capturingRef.current = false;
      window.clearTimeout(flashTimerRef.current);
    };
  }, []);

  const openSrc = openIndex !== null ? POLAROID_PHOTOS[openIndex] : null;
  const openRotation =
    openIndex !== null ? POLAROID_ROTATIONS[openIndex] : 0;
  const openCaption =
    openIndex !== null ? POLAROID_CAPTIONS[openIndex] : null;

  const openPolaroid = useCallback((index: number) => {
    setCapture(false);
    setOpenIndex(index);
  }, []);

  const onCameraClick = useCallback(() => {
    if (capturingRef.current) return;
    capturingRef.current = true;
    setOpenIndex(null);
    setCapture(false);
    setFlashing(true);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.clearTimeout(flashTimerRef.current);
    flashTimerRef.current = window.setTimeout(() => {
      setFlashing(false);
      setCapture(true);
      capturingRef.current = false;
    }, reduce ? 180 : 420);
  }, []);

  return (
    <>
      <DeskSvg
        tipRef={tipRef}
        onPolaroidClick={openPolaroid}
        onCameraClick={onCameraClick}
      />
      <span
        ref={tipRef}
        className="illustration-tag pointer-events-none fixed z-50 rounded-full border border-accent-ink bg-accent-soft px-3.5 py-1.5 font-mono text-[11px] lowercase leading-none tracking-wide text-accent-ink shadow-sm"
        style={{ top: 0, left: 0, opacity: 0 }}
      >
        {memoriesLabel}
      </span>
      {flashing && (
        <div className="desk-capture-flash" aria-hidden="true" />
      )}
      {(openSrc || capture) && (
        <button
          type="button"
          className="polaroid-lightbox"
          aria-label="Fechar memória"
          onClick={() => {
            setOpenIndex(null);
            setCapture(false);
          }}
        >
          <div
            className="polaroid-lightbox-stage"
            onClick={(e) => e.stopPropagation()}
          >
            <figure
              className={`polaroid-lightbox-card${capture ? " is-level" : ""}`}
              style={{
                ["--polaroid-tilt" as string]: `${capture ? 0 : openRotation}deg`,
              }}
            >
              {capture ? (
                <div
                  className="polaroid-lightbox-capture"
                  aria-label="capture01"
                  dangerouslySetInnerHTML={{ __html: taggedCaptureMarkup }}
                />
              ) : (
                <img
                  src={openSrc}
                  alt={openCaption?.join(" ") ?? "Memory"}
                />
              )}
              {openIndex !== null && <PolaroidSymbol />}
              {openCaption && !capture && <HandwrittenCaption lines={openCaption} />}
            </figure>
          </div>
        </button>
      )}
    </>
  );
}
