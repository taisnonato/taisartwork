import { useEffect, useMemo, useRef, useState } from "react";
import svgMarkup from "@/assets/resume/cards_resume.svg?raw";
import starSrc from "@/assets/resume/stars-set-green.png";

export function ResumeCards() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const markup = useMemo(
    () => svgMarkup.replaceAll("__RESUME_STAR__", starSrc),
    [],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(max-width: 767px)");
    let fullyGone = true;
    let enterTimer = 0;

    const playEnter = () => {
      window.clearTimeout(enterTimer);
      setOpen(false);
      enterTimer = window.setTimeout(() => setOpen(true), 40);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!mq.matches) {
          fullyGone = true;
          setOpen(false);
          return;
        }

        const visible = entry.isIntersecting && entry.intersectionRatio > 0.12;

        if (visible) {
          if (fullyGone) {
            fullyGone = false;
            playEnter();
          }
          return;
        }

        fullyGone = true;
        window.clearTimeout(enterTimer);
        setOpen(false);
      },
      { threshold: [0, 0.12, 0.35, 1] },
    );

    io.observe(el);

    const onMq = () => {
      if (!mq.matches) {
        fullyGone = true;
        setOpen(false);
      }
    };
    mq.addEventListener("change", onMq);

    return () => {
      window.clearTimeout(enterTimer);
      io.disconnect();
      mq.removeEventListener("change", onMq);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`home-bento-resume-art${open ? " is-open" : ""}`}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
