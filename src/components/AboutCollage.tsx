import { useEffect, useRef, useState } from "react";
import aboutEu from "@/assets/about/eu.png";
import aboutTool from "@/assets/about/tool.png";
import aboutOrkut from "@/assets/about/orkut.png";
import aboutPhotoscape from "@/assets/about/photoscape.png";
import aboutPhotofilter from "@/assets/about/photofilter.png";

type Piece = {
  id: string;
  kind: "img" | "text";
  src?: string;
  lines?: readonly string[];
  className: string;
  delay: number;
  from: string;
};

type AboutCollageProps = {
  makingNote: readonly [string, string];
  digitalNote: readonly [string, string];
};

export function AboutCollage({ makingNote, digitalNote }: AboutCollageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const pieces: Piece[] = [
    {
      id: "making",
      kind: "text",
      lines: makingNote,
      className: "about-piece-making",
      delay: 0.05,
      from: "about-from-tr",
    },
    {
      id: "digital",
      kind: "text",
      lines: digitalNote,
      className: "about-piece-digital",
      delay: 0.12,
      from: "about-from-bl",
    },
    {
      id: "tool",
      kind: "img",
      src: aboutTool,
      className: "about-piece-tool",
      delay: 0.18,
      from: "about-from-tl",
    },
    {
      id: "photoscape",
      kind: "img",
      src: aboutPhotoscape,
      className: "about-piece-photoscape",
      delay: 0.28,
      from: "about-from-bottom",
    },
    {
      id: "photofilter",
      kind: "img",
      src: aboutPhotofilter,
      className: "about-piece-photofilter",
      delay: 0.34,
      from: "about-from-right",
    },
    {
      id: "orkut",
      kind: "img",
      src: aboutOrkut,
      className: "about-piece-orkut",
      delay: 0.42,
      from: "about-from-left",
    },
    {
      id: "eu",
      kind: "img",
      src: aboutEu,
      className: "about-piece-eu",
      delay: 0.55,
      from: "about-from-br",
    },
  ];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let fullyGone = true;
    let enterTimer = 0;

    const playEnter = () => {
      window.clearTimeout(enterTimer);
      setActive(false);
      enterTimer = window.setTimeout(() => setActive(true), 48);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio > 0;

        if (visible) {
          if (fullyGone) {
            fullyGone = false;
            playEnter();
          }
          return;
        }

        // Only reset after the collage has left the viewport entirely
        fullyGone = true;
        window.clearTimeout(enterTimer);
        setActive(false);
      },
      { threshold: [0, 0.01, 1] },
    );

    io.observe(el);
    return () => {
      window.clearTimeout(enterTimer);
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`about-collage ${active ? "is-active" : ""}`}
      aria-label="Sobre mim — collage"
    >
      <div className="about-pieces">
        {pieces.map((piece) => (
          <div
            key={piece.id}
            className={`about-piece ${piece.className} ${piece.from}`}
            style={{ ["--about-delay" as string]: `${piece.delay}s` }}
          >
            {piece.kind === "img" && piece.src ? (
              <img src={piece.src} alt="" draggable={false} />
            ) : (
              <p className="about-hand-note">
                {piece.lines?.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
