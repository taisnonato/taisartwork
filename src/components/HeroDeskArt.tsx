import { memo, useEffect, useRef, useState, type RefObject } from "react";
import svgMarkup from "@/assets/illustration_vector.svg?raw";
import polaroid1 from "@/assets/polaroids/01.png";
import polaroid2 from "@/assets/polaroids/02.png";
import polaroid3 from "@/assets/polaroids/03.png";
import polaroid4 from "@/assets/polaroids/04.png";
import polaroid5 from "@/assets/polaroids/05.png";
import polaroidSymbol5 from "@/assets/polaroids/05-symbol.png";

const POLAROID_PHOTOS = [
  polaroid1,
  polaroid2,
  polaroid3,
  polaroid4,
  polaroid5,
] as const;

const POLAROID_ROTATIONS = [-6, 4, -2, 7, -5] as const;

const POLAROID_CAPTIONS = [
  ["washington, d.c,", "capital 24'"],
  ["new york,", "christmas eve 24'"],
  ["san diego,", "la jolla beach 25'"],
  ["los angeles,", "little tokyo 25'"],
  ["valencia,", "spain 26'"],
] as const;

const NS = "http://www.w3.org/2000/svg";

/** Inline SVG content (viewBox 0 0 48 48) for each polaroid square. */
function appendSymbolShapes(parent: SVGElement, index: number) {
  if (index === 0) {
    const path = document.createElementNS(NS, "path");
    path.setAttribute(
      "d",
      "M24 4.5 28.9 18.1 43.5 18.6 32.2 27.8 36.4 42 24 33.9 11.6 42 15.8 27.8 4.5 18.6 19.1 18.1Z"
    );
    path.setAttribute("fill", "#5c992d");
    parent.appendChild(path);
    return;
  }

  if (index === 1) {
    const path = document.createElementNS(NS, "path");
    path.setAttribute(
      "d",
      "M24 8c4.2 0 7.5 3.2 7.5 7.2 0 1.5-.4 2.9-1.2 4.1 1.6-.7 3.4-1.1 5.2-1.1 5.1 0 9.2 3.8 9.2 8.5S40.6 35.2 35.5 35.2c-1.7 0-3.3-.4-4.7-1.1.7 1.4 1.1 3 1.1 4.7 0 5.1-3.8 9.2-8.5 9.2s-8.5-4.1-8.5-9.2c0-1.6.4-3.1 1-4.5-1.5.8-3.2 1.2-5.1 1.2-5.1 0-9.2-3.8-9.2-8.5s4.1-8.5 9.2-8.5c1.7 0 3.3.4 4.7 1-1.1-1.4-1.8-3.1-1.8-5 0-4 3.3-7.2 7.5-7.2Z"
    );
    path.setAttribute("fill", "#5c992d");
    parent.appendChild(path);
    return;
  }

  if (index === 2) {
    const g = document.createElementNS(NS, "g");
    g.setAttribute("fill", "#5c992d");
    [0, 72, 144, 216, 288].forEach((deg) => {
      const petal = document.createElementNS(NS, "ellipse");
      petal.setAttribute("cx", "24");
      petal.setAttribute("cy", "14.5");
      petal.setAttribute("rx", "7.2");
      petal.setAttribute("ry", "10.2");
      petal.setAttribute("transform", `rotate(${deg} 24 24)`);
      g.appendChild(petal);
    });
    parent.appendChild(g);
    return;
  }

  if (index === 3) {
    const g = document.createElementNS(NS, "g");
    g.setAttribute("fill", "#5c992d");
    [0, 60, 120, 180, 240, 300].forEach((deg) => {
      const petal = document.createElementNS(NS, "ellipse");
      petal.setAttribute("cx", "24");
      petal.setAttribute("cy", "15");
      petal.setAttribute("rx", "6.4");
      petal.setAttribute("ry", "9.4");
      petal.setAttribute("transform", `rotate(${deg} 24 24)`);
      g.appendChild(petal);
    });
    parent.appendChild(g);
    return;
  }

  // foto05 — STARS SET BLACK-15.png
  const img = document.createElementNS(NS, "image");
  img.setAttribute("href", polaroidSymbol5);
  img.setAttributeNS("http://www.w3.org/1999/xlink", "href", polaroidSymbol5);
  img.setAttribute("x", "4");
  img.setAttribute("y", "4");
  img.setAttribute("width", "40");
  img.setAttribute("height", "40");
  img.setAttribute("preserveAspectRatio", "xMidYMid meet");
  img.classList.add("polaroid-symbol-asset");
  parent.appendChild(img);
}

function placeSymbolsInIllustration(root: HTMLElement) {
  const shots = [
    ...root.querySelectorAll<SVGGElement>("#polaroids .polaroid-shot"),
  ];
  shots.forEach((shot) => {
    if (shot.querySelector(".polaroid-inline-symbol")) return;
    const match = shot.id.match(/polaroid-(\d+)/);
    const index = match ? Number(match[1]) - 1 : -1;
    if (index < 0) return;

    const hole = shot.querySelector<SVGRectElement>("rect.cls-4");
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
    appendSymbolShapes(symbol, index);
    shot.appendChild(symbol);
  });
}

function PolaroidSymbol({ index }: { index: number }) {
  const common = {
    viewBox: "0 0 48 48",
    className: "polaroid-lightbox-symbol",
    "aria-hidden": true as const,
  };

  if (index === 4) {
    return (
      <svg {...common}>
        <image
          href={polaroidSymbol5}
          x="4"
          y="4"
          width="40"
          height="40"
          preserveAspectRatio="xMidYMid meet"
          className="polaroid-symbol-asset"
        />
      </svg>
    );
  }

  switch (index) {
    case 0:
      return (
        <svg {...common}>
          <path
            fill="#5c992d"
            d="M24 4.5 28.9 18.1 43.5 18.6 32.2 27.8 36.4 42 24 33.9 11.6 42 15.8 27.8 4.5 18.6 19.1 18.1Z"
          />
        </svg>
      );
    case 1:
      return (
        <svg {...common}>
          <path
            fill="#5c992d"
            d="M24 8c4.2 0 7.5 3.2 7.5 7.2 0 1.5-.4 2.9-1.2 4.1 1.6-.7 3.4-1.1 5.2-1.1 5.1 0 9.2 3.8 9.2 8.5S40.6 35.2 35.5 35.2c-1.7 0-3.3-.4-4.7-1.1.7 1.4 1.1 3 1.1 4.7 0 5.1-3.8 9.2-8.5 9.2s-8.5-4.1-8.5-9.2c0-1.6.4-3.1 1-4.5-1.5.8-3.2 1.2-5.1 1.2-5.1 0-9.2-3.8-9.2-8.5s4.1-8.5 9.2-8.5c1.7 0 3.3.4 4.7 1-1.1-1.4-1.8-3.1-1.8-5 0-4 3.3-7.2 7.5-7.2Z"
          />
        </svg>
      );
    case 2:
      return (
        <svg {...common}>
          <g fill="#5c992d">
            {[0, 72, 144, 216, 288].map((deg) => (
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
    default:
      return (
        <svg {...common}>
          <g fill="#5c992d">
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <ellipse
                key={deg}
                cx="24"
                cy="15"
                rx="6.4"
                ry="9.4"
                transform={`rotate(${deg} 24 24)`}
              />
            ))}
          </g>
        </svg>
      );
  }
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

/** Reverse path geometry so stroke-draw runs left → right. */
function orientPathLeftToRight(path: SVGPathElement) {
  const length = path.getTotalLength();
  if (length < 1) return;

  const start = path.getPointAtLength(0);
  const end = path.getPointAtLength(length);
  if (start.x <= end.x) return;

  const steps = Math.max(24, Math.ceil(length / 3));
  const points: DOMPoint[] = [];
  for (let i = 0; i <= steps; i++) {
    points.push(path.getPointAtLength((length * i) / steps));
  }
  points.reverse();

  const d = points
    .map((point, index) => {
      const x = point.x.toFixed(2);
      const y = point.y.toFixed(2);
      return index === 0 ? `M${x},${y}` : `L${x},${y}`;
    })
    .join(" ");
  path.setAttribute("d", d);
}

function pathStartX(path: SVGPathElement) {
  return path.getPointAtLength(0).x;
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

function groupPlant01Leaves(root: HTMLElement) {
  const plant01 = root.querySelector<SVGGElement>("#plant01");
  if (!plant01 || plant01.querySelector("#plant01-leaves")) return;

  const leaves = [...plant01.querySelectorAll<SVGPathElement>("path.cls-26")];
  if (leaves.length === 0) return;

  const leafGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  leafGroup.setAttribute("id", "plant01-leaves");
  leaves[0].parentNode?.insertBefore(leafGroup, leaves[0]);
  leaves.forEach((leaf) => leafGroup.appendChild(leaf));
}

type DeskSvgProps = {
  tipRef: RefObject<HTMLSpanElement | null>;
  onPolaroidClick: (index: number) => void;
};

const DeskSvg = memo(function DeskSvg({ tipRef, onPolaroidClick }: DeskSvgProps) {
  const ref = useRef<HTMLDivElement>(null);
  const onPolaroidClickRef = useRef(onPolaroidClick);
  onPolaroidClickRef.current = onPolaroidClick;

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    groupPlant01Leaves(root);
    placeSymbolsInIllustration(root);

    const cleanups: Array<() => void> = [];

    const wacom = root.querySelector<SVGGElement>("#wacom");
    const pathList = [
      ...root.querySelectorAll<SVGPathElement>("#drawonscreen path"),
    ];

    if (wacom && pathList.length > 0) {
      pathList.forEach(orientPathLeftToRight);
      const ordered = [...pathList].sort((a, b) => pathStartX(a) - pathStartX(b));

      const lengths = ordered.map((path) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
        path.style.animation = "none";
        return length;
      });

      const totalLength = lengths.reduce((sum, len) => sum + len, 0);
      const drawMs = 2400;
      const holdMs = 700;
      const activeAnims: Animation[] = [];
      let loopController: AbortController | null = null;

      const hideAll = () => {
        activeAnims.splice(0).forEach((anim) => anim.cancel());
        ordered.forEach((path, index) => {
          path.style.strokeDashoffset = `${lengths[index]}`;
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
                (lengths[i] / totalLength) * drawMs
              );
              await animateOffset(ordered[i], lengths[i], 0, duration);
            }

            if (signal.aborted) return;
            await wait(holdMs, signal);

            for (let i = ordered.length - 1; i >= 0; i--) {
              if (signal.aborted) return;
              const duration = Math.max(
                180,
                (lengths[i] / totalLength) * 900
              );
              await animateOffset(ordered[i], 0, lengths[i], duration);
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

    const polaroids = root.querySelector<SVGGElement>("#polaroids");
    if (polaroids) {
      const moveTip = (e: MouseEvent) => {
        const tip = tipRef.current;
        if (!tip) return;
        tip.style.left = `${e.clientX + 14}px`;
        tip.style.top = `${e.clientY + 14}px`;
        tip.style.opacity = "1";
      };
      const hideTip = () => {
        const tip = tipRef.current;
        if (!tip) return;
        tip.style.opacity = "0";
      };
      polaroids.addEventListener("mousemove", moveTip);
      polaroids.addEventListener("mouseleave", hideTip);
      cleanups.push(() => {
        hideTip();
        polaroids.removeEventListener("mousemove", moveTip);
        polaroids.removeEventListener("mouseleave", hideTip);
      });

      const shots = [
        ...polaroids.querySelectorAll<SVGGElement>(".polaroid-shot"),
      ];
      shots.forEach((shot) => {
        const match = shot.id.match(/polaroid-(\d+)/);
        const index = match ? Number(match[1]) - 1 : -1;
        if (index < 0 || index >= POLAROID_PHOTOS.length) return;

        const openPhoto = (e: MouseEvent) => {
          e.stopPropagation();
          hideTip();
          onPolaroidClickRef.current(index);
        };
        shot.addEventListener("click", openPhoto);
        cleanups.push(() => shot.removeEventListener("click", openPhoto));
      });
    }

    const steamPaths = [
      ...root.querySelectorAll<SVGPathElement>("#tea_cup .tea-steam"),
    ];
    steamPaths.forEach((path) => {
      const length = path.getTotalLength();
      if (length > 1) {
        const start = path.getPointAtLength(0);
        const end = path.getPointAtLength(length);
        if (start.y < end.y) {
          const steps = Math.max(24, Math.ceil(length / 2));
          const points: DOMPoint[] = [];
          for (let i = 0; i <= steps; i++) {
            points.push(path.getPointAtLength((length * i) / steps));
          }
          points.reverse();
          path.setAttribute(
            "d",
            points
              .map((point, index) => {
                const x = point.x.toFixed(2);
                const y = point.y.toFixed(2);
                return index === 0 ? `M${x},${y}` : `L${x},${y}`;
              })
              .join(" ")
          );
        }
      }

      const len = path.getTotalLength();
      path.style.setProperty("--steam-len", `${len}`);
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
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
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  );
});

export function HeroDeskArt({ memoriesLabel = "memories" }: { memoriesLabel?: string }) {
  const tipRef = useRef<HTMLSpanElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (tipRef.current) tipRef.current.textContent = memoriesLabel;
  }, [memoriesLabel]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex]);

  const openSrc = openIndex !== null ? POLAROID_PHOTOS[openIndex] : null;
  const openRotation =
    openIndex !== null ? POLAROID_ROTATIONS[openIndex] : 0;
  const openCaption =
    openIndex !== null ? POLAROID_CAPTIONS[openIndex] : null;

  return (
    <>
      <DeskSvg tipRef={tipRef} onPolaroidClick={setOpenIndex} />
      <span
        ref={tipRef}
        className="illustration-tag pointer-events-none fixed z-50 rounded-full border border-accent-ink bg-accent-soft px-3.5 py-1.5 font-mono text-[11px] lowercase leading-none tracking-wide text-accent-ink shadow-sm"
        style={{ left: 0, top: 0, opacity: 0 }}
      >
        {memoriesLabel}
      </span>
      {openSrc && (
        <button
          type="button"
          className="polaroid-lightbox"
          aria-label="Fechar memória"
          onClick={() => setOpenIndex(null)}
        >
          <div
            className="polaroid-lightbox-stage"
            onClick={(e) => e.stopPropagation()}
          >
            <figure
              className="polaroid-lightbox-card"
              style={{ ["--polaroid-tilt" as string]: `${openRotation}deg` }}
            >
              <img src={openSrc} alt={openCaption?.join(" ") ?? "Memory"} />
              {openIndex !== null && <PolaroidSymbol index={openIndex} />}
              {openCaption && <HandwrittenCaption lines={openCaption} />}
            </figure>
          </div>
        </button>
      )}
    </>
  );
}
