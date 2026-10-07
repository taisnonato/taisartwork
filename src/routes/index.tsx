import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useEffect, useLayoutEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { Check, Copy, Globe, Instagram } from "lucide-react";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work5 from "@/assets/work-5.jpg";
import work6 from "@/assets/work-6.jpg";
import { applyTheme, type ThemeMode } from "@/lib/theme";
import illustrationMegan from "@/assets/illustration-megan.gif";
import illustrationCat from "@/assets/illustration-cat.gif";
import illustrationYukako from "@/assets/illustration-yukako.png";
import illustrationPearls from "@/assets/illustration-pearls.png";
import illustrationButterfly from "@/assets/illustration-butterfly.png";
import illustrationHands from "@/assets/illustration-hands.png";
import illustrationMonalisa from "@/assets/illustration-monalisa.png";
import { HeroDeskArt } from "@/components/HeroDeskArt";
import { AboutCollage } from "@/components/AboutCollage";
import { BasedInStamp } from "@/components/BasedInStamp";
import { WordPuzzle } from "@/components/WordPuzzle";
import { ResumeCards } from "@/components/ResumeCards";
import { IllustrationStarCursor } from "@/components/IllustrationStarCursor";
import skillsFolderClosed from "@/assets/skills/folder01.svg";
import skillsFolderOpen from "@/assets/skills/folder02.svg";
import skillPhotoshop from "@/assets/skills/photoshop.webp";
import skillIllustrator from "@/assets/skills/illustrator.webp";
import skillAfterEffects from "@/assets/skills/after-effects.webp";
import skillPremiere from "@/assets/skills/premiere.webp";
import skillFigma from "@/assets/skills/figma.webp";
import skillCapcut from "@/assets/skills/capcut.webp";
import skillChatgpt from "@/assets/skills/chatgpt.webp";
import skillMagnific from "@/assets/skills/magnific.png";
import skillLovable from "@/assets/skills/lovable.png";
import companyAdidas from "@/assets/workedwith/adidas.webp";
import companyAmericanas from "@/assets/workedwith/americanas.webp";
import companyBancoDoBrasil from "@/assets/workedwith/banco-do-brasil.webp";
import companyChevrolet from "@/assets/workedwith/chevrolet.webp";
import companyC6Bank from "@/assets/workedwith/c6-bank.webp";
import companyFitFood from "@/assets/workedwith/fit-food.png";

const companyLogos = [
  { src: companyAdidas, alt: "Adidas" },
  { src: companyAmericanas, alt: "Americanas" },
  { src: companyBancoDoBrasil, alt: "Banco do Brasil" },
  { src: companyChevrolet, alt: "Chevrolet" },
  { src: companyC6Bank, alt: "C6 Bank" },
  { src: companyFitFood, alt: "Fit Food" },
] as const;

const skillLogos = [
  { src: skillPhotoshop, alt: "Photoshop", x: "-3.7rem", y: "-6.9rem", r: "-8deg", delay: "0ms" },
  { src: skillIllustrator, alt: "Illustrator", x: "-0.6rem", y: "-7.5rem", r: "-3deg", delay: "30ms" },
  { src: skillPremiere, alt: "Premiere Pro", x: "2.4rem", y: "-7.5rem", r: "3deg", delay: "60ms" },
  { src: skillAfterEffects, alt: "After Effects", x: "5.5rem", y: "-6.9rem", r: "8deg", delay: "90ms" },
  { src: skillFigma, alt: "Figma", x: "-2.5rem", y: "-4.1rem", r: "-6deg", delay: "50ms" },
  { src: skillCapcut, alt: "CapCut", x: "0.9rem", y: "-4.5rem", r: "0deg", delay: "80ms" },
  { src: skillChatgpt, alt: "ChatGPT", x: "4.3rem", y: "-4.1rem", r: "6deg", delay: "110ms" },
  {
    src: skillMagnific,
    alt: "Magnific",
    x: "-0.45rem",
    y: "-1.85rem",
    r: "-2deg",
    delay: "140ms",
    large: true,
  },
  {
    src: skillLovable,
    alt: "Lovable",
    x: "6.3rem",
    y: "-1.85rem",
    r: "2deg",
    delay: "160ms",
    large: true,
  },
] as const;

const illustrationSlides = [
  { src: illustrationButterfly, alt: "Ilustração autoral — borboletas", tag: "adobedraw" },
  { src: illustrationMegan, alt: "Ilustração autoral — Megan", tag: "adobephotoshop" },
  { src: illustrationHands, alt: "Ilustração autoral — mãos", tag: "adobephotoshop" },
  {
    src: illustrationCat,
    alt: "Ilustração autoral — gato",
    imageClassName: "scale-[1.18] -translate-x-1",
    tag: "adobedraw/aftereffects",
  },
  { src: illustrationMonalisa, alt: "Ilustração autoral — Monalisa Hollywood", tag: "adobephotoshop" },
  { src: illustrationPearls, alt: "Ilustração autoral — garota com pérolas", tag: "adobephotoshop" },
  { src: illustrationYukako, alt: "Ilustração autoral — Yukako", tag: "adobephotoshop" },
];

export const Route = createFileRoute("/")({
  component: Index,
});

type Lang = "pt" | "en" | "es";

const dict = {
  pt: {
    nav: { home: "Início", work: "Trabalhos", about: "Sobre mim", contact: "Contato" },
    hero: {
      role: "Ilustradora & Designer",
      title1: "Tais",
      title2: "Macedo",
      scroll: "Role para explorar",
      memories: "memórias",
    },
    intro: {
      eyebrow: "Sobre mim",
      body: "Trabalho em duas frentes que se conversam: ilustração autoral e design para social media. Em ambas, o ponto de partida é o mesmo — narrativa, composição e um olhar cuidadoso para o detalhe. Cada projeto começa com uma conversa e termina com um sistema visual que pode crescer com a marca.",
      lifeBtn: "minha vida como designer",
      makingNote: ["fazendo arte", "desde 2008"],
      digitalNote: ["minha arte digital", "começou aqui"],
    },
    homeBento: {
      skills: "habilidades",
      design: "what I design",
      companies: "empresas com que já trabalhei",
      companiesShort: "empresas",
      resume: "veja meu currículo",
      resumeShort: "currículo",
      networks: "redes",
      basedIn: "Based in",
      country: "Espanha",
      city: "Valência",
      puzzle: [
        "social media",
        "design UX/UI",
        "tecnologia IA",
        "edição de imagem",
        "edição de vídeo",
        "animação",
        "motion",
        "ilustração 2D",
        "vetorização",
        "conceito de personagem",
      ] as const,
    },
    illu: {
      eyebrow: "01 · Ilustração",
      title: "Ilustração autoral",
      desc: "Peças pessoais e comissionadas, do estudo de personagem ao acabamento final.",
      seeMore: "ver mais ilustrações",
    },
    social: {
      eyebrow: "02 · Social Media",
      title: "Design para redes",
      desc: "Sistemas visuais para feed, stories e campanhas — coesos, escaláveis e prontos para publicar.",
      feed: "Feed",
      story: "Stories",
    },
    contact: {
      eyebrow: "contato",
      available: "Aberta a vagas sênior, colaborações e ótimas conversas.",
      title1: "Vamos criar",
      title2: "algo juntos?",
      email: "taiscapinan@gmail.com",
      alsoFind: "Também me encontre em",
      copied: "Copiado",
      social: { ig: "Instagram", be: "Behance", ln: "LinkedIn" },
      footer: "© 2026 Tais Artwork · Feito com calma",
    },
  },
  en: {
    nav: { home: "Home", work: "Work", about: "About me", contact: "Contact" },
    hero: {
      role: "Illustrator & Designer",
      title1: "Tais",
      title2: "Macedo",
      scroll: "Scroll to explore",
      memories: "memories",
    },
    intro: {
      eyebrow: "About me",
      body: "I work across two connected practices: personal illustration and social media design. The starting point is always the same — narrative, composition, and a careful eye for detail. Each project begins with a conversation and ends with a visual system that can grow with the brand.",
      lifeBtn: "my life as a designer",
      makingNote: ["making art", "since 2008"],
      digitalNote: ["my digital art", "started here"],
    },
    homeBento: {
      skills: "skills",
      design: "what I design",
      companies: "companies I've worked with",
      companiesShort: "companies",
      resume: "checkout my resume",
      resumeShort: "resume",
      networks: "networks",
      basedIn: "Based in",
      country: "Spain",
      city: "Valencia",
      puzzle: [
        "social media",
        "UX/UI design",
        "AI technology",
        "image editing",
        "video editing",
        "animation",
        "motion",
        "2D illustration",
        "vectorization",
        "character concept",
      ] as const,
    },
    illu: {
      eyebrow: "01 · Illustration",
      title: "Personal illustration",
      desc: "Personal and commissioned pieces, from character studies to final artwork.",
      seeMore: "see more illustrations",
    },
    social: {
      eyebrow: "02 · Social Media",
      title: "Design for social",
      desc: "Visual systems for feed, stories and campaigns — cohesive, scalable and ready to publish.",
      feed: "Feed",
      story: "Stories",
    },
    contact: {
      eyebrow: "contact",
      available: "Open to senior roles, collaborations, and great conversations.",
      title1: "Let's make",
      title2: "something together?",
      email: "taiscapinan@gmail.com",
      alsoFind: "Also find me on",
      copied: "Copied",
      social: { ig: "Instagram", be: "Behance", ln: "LinkedIn" },
      footer: "© 2026 Tais Artwork · Made with care",
    },
  },
  es: {
    nav: { home: "Inicio", work: "Trabajos", about: "Sobre mí", contact: "Contacto" },
    hero: {
      role: "Ilustradora y Diseñadora",
      title1: "Tais",
      title2: "Macedo",
      scroll: "Desliza para explorar",
      memories: "recuerdos",
    },
    intro: {
      eyebrow: "Sobre mí",
      body: "Trabajo en dos frentes que dialogan entre sí: ilustración de autor y diseño para redes sociales. En ambos, el punto de partida es el mismo — narrativa, composición y una mirada cuidadosa al detalle. Cada proyecto empieza con una conversación y termina con un sistema visual que puede crecer con la marca.",
      lifeBtn: "mi vida como diseñadora",
      makingNote: ["haciendo arte", "desde 2008"],
      digitalNote: ["mi arte digital", "empezó aquí"],
    },
    homeBento: {
      skills: "habilidades",
      design: "what I design",
      companies: "empresas con las que he trabajado",
      companiesShort: "empresas",
      resume: "mira mi currículum",
      resumeShort: "currículum",
      networks: "redes",
      basedIn: "Based in",
      country: "España",
      city: "Valencia",
      puzzle: [
        "social media",
        "diseño UX/UI",
        "tecnología IA",
        "edición de imagen",
        "edición de vídeo",
        "animación",
        "motion",
        "ilustración 2D",
        "vectorización",
        "concepto de personaje",
      ] as const,
    },
    illu: {
      eyebrow: "01 · Ilustración",
      title: "Ilustración de autor",
      desc: "Piezas personales y por encargo, del estudio de personaje al acabado final.",
      seeMore: "ver más ilustraciones",
    },
    social: {
      eyebrow: "02 · Social Media",
      title: "Diseño para redes",
      desc: "Sistemas visuales para feed, historias y campañas — coherentes, escalables y listos para publicar.",
      feed: "Feed",
      story: "Historias",
    },
    contact: {
      eyebrow: "contacto",
      available: "Abierta a roles senior, colaboraciones y grandes conversaciones.",
      title1: "Vamos a crear",
      title2: "algo juntos?",
      email: "taiscapinan@gmail.com",
      alsoFind: "También encuéntrame en",
      copied: "Copiado",
      social: { ig: "Instagram", be: "Behance", ln: "LinkedIn" },
      footer: "© 2026 Tais Artwork · Hecho con calma",
    },
  },
} as const;

const socialPieces = [work5, work2, work1, work6];

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-[900ms] ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {children}
    </div>
  );
}

type Slide = { src: string; alt: string; imageClassName?: string; tag?: string };

function CompaniesMarquee({
  logos,
}: {
  logos: readonly { src: string; alt: string }[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const halfWidthRef = useRef(0);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startOffsetRef = useRef(0);
  const [dragging, setDragging] = useState(false);
  const slides = [...logos, ...logos];

  const wrapOffset = (value: number) => {
    const half = halfWidthRef.current;
    if (half <= 0) return value;
    let next = value;
    while (next <= -half) next += half;
    while (next > 0) next -= half;
    return next;
  };

  const applyOffset = (value: number) => {
    offsetRef.current = value;
    const el = trackRef.current;
    if (el) el.style.transform = `translate3d(${value}px, 0, 0)`;
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => {
      halfWidthRef.current = el.scrollWidth / 2;
      applyOffset(wrapOffset(offsetRef.current));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let last = performance.now();
    let raf = 0;
    let visible = true;
    const tick = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = Math.min((now - last) / 1000, 0.064);
      last = now;
      if (!draggingRef.current && halfWidthRef.current > 0) {
        const speed = halfWidthRef.current / 12;
        applyOffset(wrapOffset(offsetRef.current - speed * dt));
      }
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(el);
    raf = requestAnimationFrame(tick);
    return () => {
      visible = false;
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    draggingRef.current = true;
    setDragging(true);
    startXRef.current = e.clientX;
    startOffsetRef.current = offsetRef.current;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - startXRef.current;
    applyOffset(wrapOffset(startOffsetRef.current + dx));
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div
      className={`home-bento-companies${dragging ? " is-dragging" : ""}`}
      aria-hidden="true"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div ref={trackRef} className="home-bento-companies-track">
        {slides.map((logo, i) => (
          <img
            key={`${logo.alt}-${i}`}
            src={logo.src}
            alt=""
            className="home-bento-company-logo"
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
}

function IllustrationScroller({ slides }: { slides: Slide[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const halfWidthRef = useRef(0);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startOffsetRef = useRef(0);
  const [dragging, setDragging] = useState(false);
  const [tip, setTip] = useState<{ text: string; x: number; y: number } | null>(null);
  const marqueeSlides = [...slides, ...slides];

  const wrapOffset = (value: number) => {
    const half = halfWidthRef.current;
    if (half <= 0) return value;
    let next = value;
    while (next <= -half) next += half;
    while (next > 0) next -= half;
    return next;
  };

  const applyOffset = (value: number) => {
    offsetRef.current = value;
    const el = trackRef.current;
    if (el) el.style.transform = `translate3d(${value}px, 0, 0)`;
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => {
      halfWidthRef.current = el.scrollWidth / 2;
      applyOffset(wrapOffset(offsetRef.current));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let last = performance.now();
    let raf = 0;
    let visible = true;
    const tick = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = Math.min((now - last) / 1000, 0.064);
      last = now;
      if (!draggingRef.current && halfWidthRef.current > 0) {
        const speed = halfWidthRef.current / 22;
        applyOffset(wrapOffset(offsetRef.current - speed * dt));
      }
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(el);
    raf = requestAnimationFrame(tick);
    return () => {
      visible = false;
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    draggingRef.current = true;
    setDragging(true);
    setTip(null);
    startXRef.current = e.clientX;
    startOffsetRef.current = offsetRef.current;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - startXRef.current;
    applyOffset(wrapOffset(startOffsetRef.current + dx));
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <>
      <div
        className={`illustration-scroller relative overflow-hidden ${dragging ? "is-dragging" : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          ref={trackRef}
          className="illustration-track flex w-max items-center gap-3 md:gap-4 px-4 md:px-6 will-change-transform"
        >
          {marqueeSlides.map((s, i) => (
            <figure
              key={`${s.alt}-${i}`}
              className="relative h-[46vh] md:h-[56vh] max-h-[520px] shrink-0 overflow-hidden rounded-xl bg-muted ring-1 ring-border/40 dark:ring-border"
              onMouseMove={
                s.tag && !dragging
                  ? (e) => setTip({ text: s.tag!, x: e.clientX, y: e.clientY })
                  : undefined
              }
              onMouseLeave={s.tag ? () => setTip(null) : undefined}
            >
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                draggable={false}
                className={`h-full w-auto block pointer-events-none select-none ${s.imageClassName ?? ""}`}
              />
            </figure>
          ))}
        </div>
      </div>
      {tip && !dragging && (
        <span
          className="illustration-tag pointer-events-none fixed z-50 rounded-full border border-accent-ink bg-accent-soft px-3.5 py-1.5 font-mono text-[11px] lowercase leading-none tracking-wide text-accent-ink shadow-sm"
          style={{ left: tip.x + 14, top: tip.y + 14 }}
        >
          {tip.text}
        </span>
      )}
    </>
  );
}

function NetworksLinks({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let fullyGone = true;
    let enterTimer = 0;

    const playEnter = () => {
      window.clearTimeout(enterTimer);
      setActive(false);
      enterTimer = window.setTimeout(() => setActive(true), 40);
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
      className={`home-bento-networks-links${active ? " is-active" : ""}`}
      aria-label={label}
    >
      {children}
    </div>
  );
}

function Index() {
  const [lang, setLang] = useState<Lang>("pt");
  const [copied, setCopied] = useState(false);
  const [copyBurstKey, setCopyBurstKey] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [navOnDark, setNavOnDark] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [activeSection, setActiveSection] = useState("top");
  const [skillsOpen, setSkillsOpen] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);
  const t = dict[lang];
  const navLightText = navOnDark && theme === "light";

  useEffect(() => {
    // Clear stuck dark from removed lamp night toggle
    applyTheme("light");
    setTheme("light");
  }, []);

  useEffect(() => {
    const el = skillsRef.current;
    if (!el) return;

    const mq = window.matchMedia("(max-width: 767px)");
    let wasInView = false;
    let reopenTimer = 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!mq.matches) {
          wasInView = false;
          setSkillsOpen(false);
          return;
        }

        // Open/close in both scroll directions (down into view and back up)
        const inView = entry.isIntersecting && entry.intersectionRatio >= 0.22;
        window.clearTimeout(reopenTimer);

        if (inView && !wasInView) {
          // Force closed → open so the fly-out always replays
          setSkillsOpen(false);
          reopenTimer = window.setTimeout(() => setSkillsOpen(true), 48);
        } else if (!inView && wasInView) {
          setSkillsOpen(false);
        }

        wasInView = inView;
      },
      { threshold: [0, 0.12, 0.22, 0.35, 0.5, 0.75, 1] },
    );
    io.observe(el);

    const onMq = () => {
      if (!mq.matches) {
        wasInView = false;
        setSkillsOpen(false);
      }
    };
    mq.addEventListener("change", onMq);
    return () => {
      window.clearTimeout(reopenTimer);
      io.disconnect();
      mq.removeEventListener("change", onMq);
    };
  }, []);

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    if (window.location.hash && window.location.hash !== "#top") {
      history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}#top`
      );
    }
    window.scrollTo(0, 0);
  }, []);

  const navLinks = [
    { id: "top", href: "#top", label: t.nav.home },
    { id: "about", href: "#about", label: t.nav.about },
    { id: "illustration", href: "#illustration", label: t.nav.work },
    { id: "contact", href: "#contact", label: t.nav.contact },
  ] as const;

  useEffect(() => {
    const updateScrollState = () => {
      setScrolled(window.scrollY > 12);
      const contact = document.getElementById("contact");
      if (contact) {
        const navBottom = 88;
        const rect = contact.getBoundingClientRect();
        setNavOnDark(rect.top <= navBottom && rect.bottom > navBottom);
      }
    };
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [lang]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(t.contact.email);
      setCopyBurstKey((key) => key + 1);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-center px-4 md:px-6 pt-4">
        <div
          className={`relative flex h-14 w-fit max-w-[calc(100%-0.5rem)] items-center gap-6 rounded-full px-6 md:px-8 transition-all duration-300 ${
            navLightText
              ? "border border-background/15 bg-foreground/80 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-2xl"
              : theme === "dark"
                ? "border border-white/20 bg-card/90 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
                : scrolled
                  ? "border border-white/40 bg-white/35 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-2xl supports-[backdrop-filter]:bg-white/25"
                  : "border border-border bg-white shadow-sm"
          }`}
        >
          <a
            href="#top"
            className={`text-display text-lg tracking-tight shrink-0 transition-colors duration-300 ${
              navLightText ? "text-background" : "text-foreground"
            }`}
          >
            Tais<span className="italic text-accent-ink"> artwork</span>
          </a>
          <nav className="hidden lg:flex items-center gap-6 font-coolvetica text-[15px] font-normal normal-case">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`whitespace-nowrap tracking-[0.06em] transition-colors duration-200 ${
                  activeSection === link.id
                    ? "font-bold text-accent-ink"
                    : navLightText
                      ? "font-light text-background/85 hover:text-accent"
                      : "font-light text-foreground/80 hover:text-accent-ink dark:text-foreground/88"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex shrink-0 items-center gap-2 font-coolvetica text-[13px] uppercase tracking-[0.04em] lg:ml-0">
            <Globe
              className={`w-3.5 h-3.5 shrink-0 transition-colors duration-300 ${
                navLightText ? "text-background" : "text-foreground"
              }`}
              aria-hidden="true"
            />

            {(["pt", "en", "es"] as Lang[]).map((l, i) => (
              <Fragment key={l}>
                {i > 0 && (
                  <span
                    className={`font-coolvetica font-light select-none transition-colors duration-300 ${
                      navLightText ? "text-background/45" : "text-muted-foreground/45 dark:text-muted-foreground/70"
                    }`}
                  >
                    /
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setLang(l)}
                  className={`min-w-[2ch] border-0 bg-transparent p-0 text-center font-coolvetica leading-none transition-colors duration-300 ${
                    lang === l
                      ? "font-bold text-accent-ink"
                      : navLightText
                        ? "font-light text-background hover:text-accent"
                        : "font-light text-foreground hover:text-accent-ink"
                  }`}
                  aria-label={`Switch language to ${l.toUpperCase()}`}
                  aria-current={lang === l ? "true" : undefined}
                >
                  {l.toUpperCase()}
                </button>
              </Fragment>
            ))}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
        id="top"
        className="hero-dot-bg page-shell mx-auto flex min-h-[calc(100svh-5rem)] flex-col justify-center pb-16 pt-24 sm:pt-28 md:pb-20 md:pt-28"
      >
        <div className="grid items-center md:items-start gap-8 md:grid-cols-[minmax(0,0.3fr)_minmax(0,0.7fr)] md:gap-x-6 lg:gap-x-8">
          <div className="md:pl-8 lg:pl-14 md:pt-8 lg:pt-12">

            <p className="eyebrow text-muted-foreground">{t.hero.role}</p>
            <h1 className="mt-6 text-[3.4rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] font-normal leading-[0.92] text-foreground">

              <span className="block font-eighties-condensed">{t.hero.title1}</span>
              <span className="mt-1 block font-eighties-mdsmcn text-accent-ink">{t.hero.title2}</span>
            </h1>
          </div>
          <div className="md:min-w-0">
            <HeroDeskArt memoriesLabel={t.hero.memories} />
          </div>
        </div>
      </section>

      {/* Home bento bases */}
      <section className="page-shell pb-8 md:pb-12" aria-label="Home highlights">
        <div className="home-bento-grid">
          <div
            ref={skillsRef}
            className={`home-bento-cell home-bento-a${skillsOpen ? " is-skills-open" : ""}`}
          >
            <p className="home-bento-label">{t.homeBento.skills}</p>
            <div className="home-bento-skills-icon" aria-hidden="true">
              <img
                src={skillsFolderClosed}
                alt=""
                className="home-bento-folder home-bento-folder--closed"
                draggable={false}
              />
              <img
                src={skillsFolderOpen}
                alt=""
                className="home-bento-folder home-bento-folder--open"
                draggable={false}
              />
              {skillLogos.map((logo, i) => (
                <img
                  key={logo.alt}
                  src={logo.src}
                  alt=""
                  className={
                    "large" in logo && logo.large
                      ? "home-bento-skill-logo home-bento-skill-logo--wide"
                      : "home-bento-skill-logo"
                  }
                  draggable={false}
                  style={{
                    ["--logo-x" as string]: logo.x,
                    ["--logo-y" as string]: logo.y,
                    ["--logo-r" as string]: logo.r,
                    ["--logo-delay" as string]: logo.delay,
                    ["--logo-i" as string]: String(i),
                  }}
                />
              ))}
            </div>
          </div>
          <div className="home-bento-cell home-bento-b">
            <p className="home-bento-label">{t.homeBento.design}</p>
            <WordPuzzle words={[...t.homeBento.puzzle]} />
          </div>
          <div className="home-bento-cell home-bento-c">
            <p className="home-bento-label">
              <span className="home-bento-label-full">{t.homeBento.companies}</span>
              <span className="home-bento-label-short">{t.homeBento.companiesShort}</span>
            </p>
            <CompaniesMarquee logos={companyLogos} />
          </div>
          <div className="home-bento-d">
            <div className="home-bento-cell home-bento-d-half home-bento-resume">
              <p className="home-bento-label">
                <span className="home-bento-label-full">{t.homeBento.resume}</span>
                <span className="home-bento-label-short">{t.homeBento.resumeShort}</span>
              </p>
              <ResumeCards />
            </div>
            <div className="home-bento-cell home-bento-d-half home-bento-networks">
              <p className="home-bento-label">{t.homeBento.networks}</p>
              <NetworksLinks label={t.homeBento.networks}>
                <span className="home-bento-network-pop">
                  <a
                    href="https://www.instagram.com/taisartwork"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.contact.social.ig}
                    className="home-bento-network-link"
                  >
                    <Instagram className="home-bento-network-icon" aria-hidden="true" />
                  </a>
                </span>
                <span className="home-bento-network-pop">
                  <a
                    href="https://www.behance.net/taisnonato"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.contact.social.be}
                    className="home-bento-network-link"
                  >
                    <span className="home-bento-network-text" aria-hidden="true">
                      Bē
                    </span>
                  </a>
                </span>
                <span className="home-bento-network-pop">
                  <a
                    href="https://www.linkedin.com/in/tais-macedo-306984124/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.contact.social.ln}
                    className="home-bento-network-link"
                  >
                    <span className="home-bento-network-text home-bento-network-text--in" aria-hidden="true">
                      in
                    </span>
                  </a>
                </span>
              </NetworksLinks>
            </div>
          </div>
          <div className="home-bento-cell home-bento-e">
            <BasedInStamp
              label={t.homeBento.basedIn}
              country={t.homeBento.country}
              city={t.homeBento.city}
              lang={lang}
            />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about">
        <div className="page-shell about-section pt-10 pb-24 md:pt-14 md:pb-36 grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-8 md:gap-x-14 md:gap-y-8 items-start justify-items-center md:justify-items-start">
          <AboutCollage
            makingNote={t.intro.makingNote}
            digitalNote={t.intro.digitalNote}
          />
          <Reveal className="about-copy-wrap w-full md:max-w-[23.5rem] md:pt-5">
            <p className="eyebrow text-muted-foreground">{t.intro.eyebrow}</p>
            <div className="about-copy mt-5 space-y-5 font-coolvetica">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
            <button type="button" className="about-life-btn group mt-8">
              <span>{t.intro.lifeBtn}</span>
              <svg
                className="about-life-btn__arrow"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2.5 7h9M7.5 3.5 11 7l-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </Reveal>
        </div>
      </section>

      {/* Illustration */}
      <IllustrationStarCursor className="border-t border-border/60 dark:border-border">
        <div className="page-shell pt-24 md:pt-32">
          <Reveal className="mb-14 flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h2 className="font-eighties-condensed text-4xl md:text-6xl font-normal text-foreground"><span className="text-accent-ink">{t.illu.title}</span></h2>
            </div>
            <p className="text-base md:text-lg text-foreground max-w-xs font-coolvetica font-normal">{t.illu.desc}</p>
          </Reveal>
        </div>
        <IllustrationScroller slides={illustrationSlides} />
        <div className="page-shell pt-8 pb-16 md:pb-20 flex justify-end">
          <button
            type="button"
            className="rounded-full border border-accent-ink bg-background px-5 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-accent-ink transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-accent-ink hover:text-primary-foreground active:scale-[0.98]"
          >
            {t.illu.seeMore}
          </button>
        </div>
      </IllustrationStarCursor>

      {/* Social Media */}
      <section id="social" className="bg-secondary/40 dark:bg-secondary/75">
        <div className="page-shell py-24 md:py-32">
          <Reveal className="mb-14 flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h2 className="font-eighties-condensed text-4xl md:text-6xl font-normal text-foreground"><span className="text-accent-ink">{t.social.title}</span></h2>
            </div>
            <p className="text-base md:text-lg text-foreground max-w-xs font-coolvetica font-normal">{t.social.desc}</p>
          </Reveal>

          <div className="grid md:grid-cols-12 gap-6 md:gap-8">
            {/* Feed mockup */}
            <Reveal className="md:col-span-7">
              <p className="eyebrow text-muted-foreground mb-3">{t.social.feed}</p>
              <div className="bg-background border border-border/70 dark:border-border p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-muted" />
                  <div>
                    <p className="text-xs font-medium text-foreground">tais.artwork</p>
                    <p className="text-[10px] text-muted-foreground">São Paulo · BR</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {[work5, work2, work1, work6, work5, work2].map((src, i) => (
                    <div key={i} className="aspect-square overflow-hidden bg-muted">
                      <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Stories mockup */}
            <Reveal className="md:col-span-5">
              <p className="eyebrow text-muted-foreground mb-3">{t.social.story}</p>
              <div className="flex gap-4 justify-center md:justify-start">
                {[socialPieces[0], socialPieces[1]].map((src, i) => (
                  <div
                    key={i}
                    className="w-[46%] max-w-[220px] aspect-[9/16] rounded-2xl overflow-hidden bg-background border border-border/70 dark:border-border shadow-sm dark:shadow-[0_12px_32px_rgba(0,0,0,0.35)]"
                  >
                    <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-border/60 dark:border-border bg-contact text-contact-fg">
        <div className="page-shell pt-10 md:pt-12 pb-14 md:pb-16 text-center">
          <Reveal className="flex w-full flex-col items-center text-center">
            <p className="font-coolvetica text-[0.7rem] font-normal uppercase tracking-[0.22em] text-contact-fg pl-[0.22em]">
              {t.contact.eyebrow}
            </p>

            <div className="mt-8 inline-flex items-center justify-center gap-3 rounded-full border-2 border-accent-ink/70 dark:border-accent-ink px-6 py-3 text-sm md:text-base text-contact-fg">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-ink opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-ink" />
              </span>
              <span className="font-coolvetica font-light tracking-[0.14em]">{t.contact.available}</span>
            </div>

            <h2 className="font-eighties-condensed mt-8 w-full max-w-5xl text-center text-6xl sm:text-7xl md:text-8xl font-normal leading-[0.95]">
              <span className="block">{t.contact.title1}</span>
              <span className="block italic text-accent-ink">{t.contact.title2}</span>
            </h2>

            <div className="relative mt-10 flex w-full justify-center">
              <div
                className={`absolute -top-12 left-1/2 -translate-x-1/2 rounded-full border border-contact-fg/10 px-5 py-2 text-[11px] tracking-[0.18em] uppercase transition-all duration-300 ${
                  copied ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"
                }`}
              >
                {t.contact.copied}
              </div>
              <div className="inline-flex items-center justify-center gap-3 rounded-full border border-contact-fg/10 dark:border-contact-fg/20 bg-contact-fg/10 dark:bg-contact-fg/20 px-5 py-3 shadow-sm transition-colors hover:border-accent-ink/70">
                <a
                  href={`mailto:${t.contact.email}`}
                  className="font-coolvetica text-sm md:text-base font-light tracking-[0.08em] text-contact-fg transition-colors hover:text-accent"
                >
                  {t.contact.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className={`relative inline-flex h-4 w-4 items-center justify-center text-contact-fg/60 transition duration-200 hover:text-accent active:scale-90 ${
                    copied ? "scale-110 text-accent" : ""
                  }`}
                  aria-label="Copy email"
                >
                  {copied && (
                    <span key={copyBurstKey} className="copy-burst" aria-hidden="true">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <span key={i} />
                      ))}
                    </span>
                  )}
                  {copied ? <Check className="relative h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <p className="mt-10 font-coolvetica text-[0.7rem] font-normal uppercase tracking-[0.22em] text-contact-fg pl-[0.22em]">
              {t.contact.alsoFind}
            </p>
            <div className="mt-6 flex w-full items-center justify-center gap-5">
              <a
                href="https://www.instagram.com/taisartwork"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.contact.social.ig}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-contact-fg/10 dark:border-contact-fg/20 bg-contact-fg/10 dark:bg-contact-fg/20 text-contact-fg/70 dark:text-contact-fg/80 transition duration-300 hover:scale-110 hover:border-accent-ink/70 hover:text-accent"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.behance.net/taisnonato"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.contact.social.be}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-contact-fg/10 dark:border-contact-fg/20 bg-contact-fg/10 dark:bg-contact-fg/20 text-contact-fg/70 dark:text-contact-fg/80 transition duration-300 hover:scale-110 hover:border-accent-ink/70 hover:text-accent"
              >
                <span className="text-[15px] font-black leading-none tracking-[-0.08em]">Bē</span>
              </a>
              <a
                href="https://www.linkedin.com/in/tais-macedo-306984124/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.contact.social.ln}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-contact-fg/10 dark:border-contact-fg/20 bg-contact-fg/10 dark:bg-contact-fg/20 text-contact-fg/70 dark:text-contact-fg/80 transition duration-300 hover:scale-110 hover:border-accent-ink/70 hover:text-accent"
              >
                <span className="text-[18px] font-black leading-none tracking-[-0.08em]">in</span>
              </a>
            </div>
          </Reveal>
        </div>
        <div className="border-t border-contact-fg/10 dark:border-contact-fg/20">
          <div className="page-shell py-3 text-center font-coolvetica text-[11px] tracking-[0.18em] uppercase opacity-60 dark:opacity-75">
            {t.contact.footer}
          </div>
        </div>
      </section>
    </div>
  );
}
