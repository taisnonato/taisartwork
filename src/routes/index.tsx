import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Copy, Globe, Instagram } from "lucide-react";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work5 from "@/assets/work-5.jpg";
import work6 from "@/assets/work-6.jpg";
import portraitAsset from "@/assets/portrait-tais.png.asset.json";
import { getStoredTheme, type ThemeMode } from "@/lib/theme";
import illustrationMegan from "@/assets/illustration-megan.gif";
import illustrationCat from "@/assets/illustration-cat.gif";
import illustrationYukako from "@/assets/illustration-yukako.png";
import illustrationPearls from "@/assets/illustration-pearls.png";
import illustrationButterfly from "@/assets/illustration-butterfly.png";
import illustrationHands from "@/assets/illustration-hands.png";
import illustrationMonalisa from "@/assets/illustration-monalisa.png";
import homeHero from "@/assets/home-hero.png";
const portrait = portraitAsset.url;
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
    },
    intro: {
      eyebrow: "Sobre mim",
      body: "Trabalho em duas frentes que se conversam: ilustração autoral e design para social media. Em ambas, o ponto de partida é o mesmo — narrativa, composição e um olhar cuidadoso para o detalhe. Cada projeto começa com uma conversa e termina com um sistema visual que pode crescer com a marca.",
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
    },
    intro: {
      eyebrow: "About me",
      body: "I work across two connected practices: personal illustration and social media design. The starting point is always the same — narrative, composition, and a careful eye for detail. Each project begins with a conversation and ends with a visual system that can grow with the brand.",
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
    },
    intro: {
      eyebrow: "Sobre mí",
      body: "Trabajo en dos frentes que dialogan entre sí: ilustración de autor y diseño para redes sociales. En ambos, el punto de partida es el mismo — narrativa, composición y una mirada cuidadosa al detalle. Cada proyecto empieza con una conversación y termina con un sistema visual que puede crecer con la marca.",
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
      title1: "¿Creamos",
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

function IllustrationScroller({ slides }: { slides: Slide[] }) {
  const marqueeSlides = [...slides, ...slides];
  const [tip, setTip] = useState<{ text: string; x: number; y: number } | null>(null);

  return (
    <>
      <div className="relative overflow-hidden">
        <div className="illustration-marquee flex w-max items-center gap-3 md:gap-4 px-4 md:px-6 will-change-transform">
          {marqueeSlides.map((s, i) => (
            <figure
              key={`${s.alt}-${i}`}
              className="relative h-[46vh] md:h-[56vh] max-h-[520px] shrink-0 overflow-hidden rounded-xl bg-muted ring-1 ring-border/40 dark:ring-border"
              onMouseMove={
                s.tag
                  ? (e) => setTip({ text: s.tag!, x: e.clientX, y: e.clientY })
                  : undefined
              }
              onMouseLeave={s.tag ? () => setTip(null) : undefined}
            >
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                className={`h-full w-auto block ${s.imageClassName ?? ""}`}
              />
            </figure>
          ))}
        </div>
      </div>
      {tip && (
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

function Index() {
  const [lang, setLang] = useState<Lang>("pt");
  const [copied, setCopied] = useState(false);
  const [copyBurstKey, setCopyBurstKey] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [navOnDark, setNavOnDark] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(() => getStoredTheme());
  const [activeSection, setActiveSection] = useState("top");
  const t = dict[lang];
  const navLightText = navOnDark && theme === "light";

  useEffect(() => {
    setTheme(getStoredTheme());
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
        className="hero-dot-bg mx-auto flex min-h-[calc(100svh-5rem)] max-w-[1300px] flex-col justify-center px-6 pb-16 pt-24 sm:pt-28 md:px-10 md:pb-20 md:pt-28"
      >
        <div className="grid items-center md:items-start gap-8 md:grid-cols-[minmax(0,0.3fr)_minmax(0,0.7fr)] md:gap-x-6 lg:gap-x-8">
          <div className="md:pl-8 lg:pl-14 md:pt-16 lg:pt-24">

            <p className="eyebrow text-muted-foreground">{t.hero.role}</p>
            <h1 className="mt-6 text-[3rem] sm:text-[3.6rem] md:text-[4.4rem] lg:text-[5.25rem] font-normal leading-[0.92] text-foreground">
              <span className="block font-eighties-condensed">{t.hero.title1}</span>
              <span className="mt-1 block font-eighties-mdsmcn text-accent-ink">{t.hero.title2}</span>
            </h1>
          </div>
          <div className="md:min-w-0">
            <img
              src={homeHero}
              alt=""
              aria-hidden="true"
              className="hero-desk-art w-full"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-24 md:py-36 grid md:grid-cols-[5fr_7fr] gap-10 md:gap-16 items-center">
          <Reveal>
            <img
              src={portrait}
              alt="Retrato de Tais, ilustradora e designer"
              className="w-full h-auto object-cover aspect-[4/5] grayscale hover:grayscale-0 transition-all duration-700 dark:brightness-[1.08] dark:contrast-[1.03]"
              loading="lazy"
            />
          </Reveal>
          <Reveal>
            <p className="eyebrow text-muted-foreground">{t.intro.eyebrow}</p>
            <p className="mt-8 text-lg md:text-xl leading-[1.5] text-foreground font-coolvetica font-normal">
              {t.intro.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Illustration */}
      <section id="illustration" className="border-t border-border/60 dark:border-border">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10 pt-24 md:pt-32">
          <Reveal className="mb-14 flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h2 className="font-eighties-condensed text-4xl md:text-6xl font-normal text-foreground"><span className="text-accent-ink">{t.illu.title}</span></h2>
            </div>
            <p className="text-base md:text-lg text-foreground max-w-xs font-coolvetica font-normal">{t.illu.desc}</p>
          </Reveal>
        </div>
        <IllustrationScroller slides={illustrationSlides} />
        <div className="mx-auto max-w-[1300px] px-6 md:px-10 pt-8 pb-16 md:pb-20 flex justify-end">
          <button
            type="button"
            className="rounded-full border border-accent-ink bg-background px-5 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-accent-ink transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-accent-ink hover:text-primary-foreground active:scale-[0.98]"
          >
            {t.illu.seeMore}
          </button>
        </div>
      </section>

      {/* Social Media */}
      <section id="social" className="bg-secondary/40 dark:bg-secondary/75">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10 py-24 md:py-32">
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
        <div className="mx-auto max-w-[1300px] px-6 md:px-10 pt-10 md:pt-12 pb-14 md:pb-16 text-center">
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
                  className="font-coolvetica text-sm md:text-base font-bold tracking-[0.08em] text-contact-fg transition-colors hover:text-accent"
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
          <div className="mx-auto max-w-[1300px] px-6 md:px-10 py-3 text-center font-coolvetica text-[11px] tracking-[0.18em] uppercase opacity-60 dark:opacity-75">
            {t.contact.footer}
          </div>
        </div>
      </section>
    </div>
  );
}
