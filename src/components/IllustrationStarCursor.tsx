import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import starSrc from "@/assets/cursors/stars-set-black-15.png";

function canUseStarCursor() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function IllustrationStarCursor({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const starRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const onEnter = () => {
    if (canUseStarCursor()) setActive(true);
  };

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const node = starRef.current;
    if (!node) return;
    node.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  };

  return (
    <section
      id="illustration"
      className={`illustration-section${active ? " is-star-cursor" : ""}${className ? ` ${className}` : ""}`}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={() => setActive(false)}
    >
      <div
        ref={starRef}
        className="illustration-star-cursor"
        style={{ ["--illustration-star" as string]: `url("${starSrc}")` }}
        aria-hidden="true"
      >
        <span className="illustration-star-cursor-icon" />
      </div>
      {children}
    </section>
  );
}
