import { useEffect, useRef, useState } from "react";

type WordPuzzleProps = {
  words: readonly string[];
};

type ChipState = {
  id: number;
  word: string;
  x: number;
  y: number;
  baseR: number;
};

/**
 * Loose 3-column rhythm — structured but messy.
 * The whole cloud is centered as a group after placing.
 */
const STARTS: { x: number; y: number; r: number }[] = [
  { x: 0.02, y: 0.04, r: -6 },
  { x: 0.4, y: 0.12, r: 5 },
  { x: 0.78, y: 0.02, r: -8 },
  { x: 0.1, y: 0.34, r: 7 },
  { x: 0.48, y: 0.3, r: -4 },
  { x: 0.82, y: 0.36, r: 6 },
  { x: 0.04, y: 0.62, r: -5 },
  { x: 0.44, y: 0.58, r: 8 },
  { x: 0.3, y: 0.86, r: -7 },
  { x: 0.72, y: 0.82, r: 4 },
];

/** Extra inset so rotated + shadowed chips never clip the board edge. */
function chipPad(cw: number, ch: number, deg: number) {
  const rad = (Math.abs(deg) + 2.5) * (Math.PI / 180);
  const cos = Math.abs(Math.cos(rad));
  const sin = Math.abs(Math.sin(rad));
  const rotW = cw * cos + ch * sin;
  const rotH = cw * sin + ch * cos;
  const shadow = 2;
  return {
    padX: Math.ceil((rotW - cw) / 2) + shadow,
    padY: Math.ceil((rotH - ch) / 2) + shadow,
  };
}

function clampChip(
  boardW: number,
  boardH: number,
  cw: number,
  ch: number,
  deg: number,
  x: number,
  y: number,
) {
  const { padX, padY } = chipPad(cw, ch, deg);
  const minX = padX;
  const minY = padY;
  const maxX = Math.max(minX, boardW - cw - padX);
  const maxY = Math.max(minY, boardH - ch - padY);
  return {
    x: Math.min(Math.max(minX, x), maxX),
    y: Math.min(Math.max(minY, y), maxY),
  };
}

function estimateSize(word: string, board: HTMLElement, id: number) {
  const probe = board.querySelector(`[data-chip="${id}"]`) as HTMLElement | null;
  return {
    w: probe?.offsetWidth ?? Math.min(200, 36 + word.length * 8.2),
    h: probe?.offsetHeight ?? 42,
  };
}

/** Shift the whole scatter so left/right (and top/bottom) margins match. */
function centerGroup(
  chips: ChipState[],
  sizes: { w: number; h: number }[],
  boardW: number,
  boardH: number,
) {
  if (chips.length === 0) return chips;

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  chips.forEach((c, i) => {
    minX = Math.min(minX, c.x);
    maxX = Math.max(maxX, c.x + sizes[i].w);
    minY = Math.min(minY, c.y);
    maxY = Math.max(maxY, c.y + sizes[i].h);
  });

  const groupW = Math.max(1, maxX - minX);
  const groupH = Math.max(1, maxY - minY);
  let shiftX = (boardW - groupW) / 2 - minX;
  let shiftY = (boardH - groupH) / 2 - minY;

  // Keep the group inside the board (equal sides when it fits)
  const edge = 4;
  if (minX + shiftX < edge) shiftX = edge - minX;
  if (maxX + shiftX > boardW - edge) shiftX = boardW - edge - maxX;
  if (minY + shiftY < edge) shiftY = edge - minY;
  if (maxY + shiftY > boardH - edge) shiftY = boardH - edge - maxY;

  return chips.map((c) => ({
    ...c,
    x: c.x + shiftX,
    y: c.y + shiftY,
  }));
}

export function WordPuzzle({ words }: WordPuzzleProps) {
  const boardRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<ChipState[]>([]);
  const dragRef = useRef<{ id: number; offsetX: number; offsetY: number } | null>(null);
  const placedRef = useRef(false);
  const userDraggedRef = useRef(false);
  const [chips, setChips] = useState<ChipState[]>([]);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  chipsRef.current = chips;

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;

    const layout = (mode: "fresh" | "resize") => {
      const bw = board.clientWidth;
      const bh = board.clientHeight;
      if (bw < 8 || bh < 8) return;

      setChips((prev) => {
        const sizes = words.map((word, i) => estimateSize(word, board, i));

        // On resize after the user dragged, only keep chips in bounds
        if (mode === "resize" && userDraggedRef.current && prev.length === words.length) {
          const next = prev.map((c, i) => {
            const size = sizes[i];
            const clamped = clampChip(bw, bh, size.w, size.h, c.baseR, c.x, c.y);
            return { ...c, word: words[i], ...clamped };
          });
          chipsRef.current = next;
          return next;
        }

        // On resize before any drag: re-center existing relative layout
        if (mode === "resize" && prev.length === words.length) {
          const sized = prev.map((c, i) => ({ ...c, word: words[i] }));
          const next = centerGroup(sized, sizes, bw, bh);
          chipsRef.current = next;
          return next;
        }

        // Fresh place in local 0–1 space, then center the whole cloud
        const placed = words.map((word, i) => {
          const start = STARTS[i % STARTS.length];
          const { w: cw, h: ch } = sizes[i];
          const { padX, padY } = chipPad(cw, ch, start.r);
          const freeW = Math.max(0, bw - cw - padX * 2);
          const freeH = Math.max(0, bh - ch - padY * 2);
          return {
            id: i,
            word,
            x: padX + start.x * freeW,
            y: padY + start.y * freeH,
            baseR: start.r,
          };
        });

        const next = centerGroup(placed, sizes, bw, bh);
        chipsRef.current = next;
        return next;
      });

      if (!placedRef.current) {
        placedRef.current = true;
        requestAnimationFrame(() => setReady(true));
      }
    };

    placedRef.current = false;
    userDraggedRef.current = false;
    setReady(false);
    layout("fresh");
    // Remeasure real pill widths, then re-place + re-center
    const t = window.setTimeout(() => layout("fresh"), 60);

    const ro = new ResizeObserver(() => {
      if (dragRef.current) return;
      layout("resize");
    });
    ro.observe(board);
    return () => {
      ro.disconnect();
      window.clearTimeout(t);
    };
  }, [words]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const drag = dragRef.current;
      const board = boardRef.current;
      if (!drag || !board) return;
      const chip = chipsRef.current.find((c) => c.id === drag.id);
      if (!chip) return;
      const el = board.querySelector(`[data-chip="${drag.id}"]`) as HTMLElement | null;
      const cw = el?.offsetWidth ?? 100;
      const ch = el?.offsetHeight ?? 36;
      const rect = board.getBoundingClientRect();
      const next = clampChip(
        board.clientWidth,
        board.clientHeight,
        cw,
        ch,
        chip.baseR,
        e.clientX - rect.left - drag.offsetX,
        e.clientY - rect.top - drag.offsetY,
      );
      setChips((prev) => {
        const updated = prev.map((c) =>
          c.id === drag.id ? { ...c, x: next.x, y: next.y } : c,
        );
        chipsRef.current = updated;
        return updated;
      });
    };

    const onUp = () => {
      if (!dragRef.current) return;
      dragRef.current = null;
      setDraggingId(null);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>, id: number) => {
    if (e.button !== 0) return;
    const board = boardRef.current;
    const chip = chipsRef.current.find((c) => c.id === id);
    if (!board || !chip) return;
    e.preventDefault();
    userDraggedRef.current = true;
    const rect = board.getBoundingClientRect();
    dragRef.current = {
      id,
      offsetX: e.clientX - rect.left - chip.x,
      offsetY: e.clientY - rect.top - chip.y,
    };
    setDraggingId(id);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* ignore — window listeners still handle move/up */
    }
  };

  return (
    <div className={`word-puzzle${ready ? " is-ready" : ""}`} aria-label="Skills">
      <div ref={boardRef} className="word-puzzle-board">
        {chips.map((chip, i) => (
          <button
            key={chip.id}
            type="button"
            data-chip={chip.id}
            className={`word-puzzle-chip${draggingId === chip.id ? " is-dragging" : ""}`}
            style={{
              left: chip.x,
              top: chip.y,
              ["--chip-delay" as string]: `${100 + i * 60}ms`,
              ["--chip-r" as string]: `${chip.baseR}deg`,
            }}
            onPointerDown={(e) => onPointerDown(e, chip.id)}
          >
            <span className="word-puzzle-chip-face">{chip.word}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
