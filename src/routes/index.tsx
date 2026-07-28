import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Copy, Globe, Instagram } from "lucide-react";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work5 from "@/assets/work-5.jpg";
import work6 from "@/assets/work-6.jpg";
import portraitAsset from "@/assets/portrait-tais.png.asset.json";
import illustrationMegan from "@/assets/illustration-megan.gif";
import illustrationCat from "@/assets/illustration-cat.gif";
import illustrationYukako from "@/assets/illustration-yukako.png";
import illustrationPearls from "@/assets/illustration-pearls.png";
import illustrationButterfly from "@/assets/illustration-butterfly.png";
import illustrationHands from "@/assets/illustration-hands.png";
import illustrationMonalisa from "@/assets/illustration-monalisa.png";
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
    nav: { work: "Ilustração", social: "Social Media", igaming: "iGaming", contact: "Contato" },
    hero: {
      role: "Ilustradora & Designer",
      title1: "Traço próprio,",
      title2: "design com propósito.",
      scroll: "Role para explorar",
    },
    intro: {
      eyebrow: "Sobre o processo",
      body: "Trabalho em três frentes que se conversam: ilustração autoral, design para social media e design para iGaming. Em todas elas, o ponto de partida é o mesmo — narrativa, composição e um olhar cuidadoso para o detalhe. Cada projeto começa com uma conversa e termina com um sistema visual que pode crescer com a marca.",
    },
    illu: {
      eyebrow: "01 · Ilustração",
      title: "Ilustração autoral.",
      desc: "Peças pessoais e comissionadas, do estudo de personagem ao acabamento final.",
      seeMore: "ver mais ilustrações",
    },
    social: {
      eyebrow: "02 · Social Media",
      title: "Design para redes.",
      desc: "Sistemas visuais para feed, stories e campanhas — coesos, escaláveis e prontos para publicar.",
      feed: "Feed",
      story: "Stories",
    },
    igaming: {
      eyebrow: "03 · iGaming",
      title: "Design para iGaming.",
      cases: [
        {
          brand: "Aurora Slots",
          goal: "Identidade visual e key art para o lançamento de uma slot temática — sistema de banners, ícones e teasers para a campanha de estreia.",
        },
        {
          brand: "Nova Bet",
          goal: "Redesign das peças promocionais de cassino ao vivo, alinhando hierarquia, CTAs e ritmo visual entre web, app e ads pagos.",
        },
        {
          brand: "Reel Studio",
          goal: "Direção de arte para uma série de mini-jogos, do moodboard aos símbolos finais, mantendo consistência entre títulos da mesma família.",
        },
      ],
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
    nav: { work: "Illustration", social: "Social Media", igaming: "iGaming", contact: "Contact" },
    hero: {
      role: "Illustrator & Designer",
      title1: "A signature line,",
      title2: "design with purpose.",
      scroll: "Scroll to explore",
    },
    intro: {
      eyebrow: "About the process",
      body: "I work across three connected practices: personal illustration, social media design, and iGaming design. The starting point is always the same — narrative, composition, and a careful eye for detail. Each project begins with a conversation and ends with a visual system that can grow with the brand.",
    },
    illu: {
      eyebrow: "01 · Illustration",
      title: "Personal illustration.",
      desc: "Personal and commissioned pieces, from character studies to final artwork.",
      seeMore: "see more illustrations",
    },
    social: {
      eyebrow: "02 · Social Media",
      title: "Design for social.",
      desc: "Visual systems for feed, stories and campaigns — cohesive, scalable and ready to publish.",
      feed: "Feed",
      story: "Stories",
    },
    igaming: {
      eyebrow: "03 · iGaming",
      title: "Design for iGaming.",
      cases: [
        {
          brand: "Aurora Slots",
          goal: "Visual identity and key art for a themed slot launch — banner system, icons and teasers for the debut campaign.",
        },
        {
          brand: "Nova Bet",
          goal: "Redesign of live casino promo assets, aligning hierarchy, CTAs and visual rhythm across web, app and paid ads.",
        },
        {
          brand: "Reel Studio",
          goal: "Art direction for a series of mini-games, from moodboard to final symbols, keeping consistency across titles in the same family.",
        },
      ],
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
    nav: { work: "Ilustración", social: "Social Media", igaming: "iGaming", contact: "Contacto" },
    hero: {
      role: "Ilustradora y Diseñadora",
      title1: "Trazo propio,",
      title2: "diseño con propósito.",
      scroll: "Desliza para explorar",
    },
    intro: {
      eyebrow: "Sobre el proceso",
      body: "Trabajo en tres frentes que dialogan entre sí: ilustración de autor, diseño para redes sociales y diseño para iGaming. En todas, el punto de partida es el mismo — narrativa, composición y una mirada cuidadosa al detalle. Cada proyecto empieza con una conversación y termina con un sistema visual que puede crecer con la marca.",
    },
    illu: {
      eyebrow: "01 · Ilustración",
      title: "Ilustración de autor.",
      desc: "Piezas personales y por encargo, del estudio de personaje al acabado final.",
      seeMore: "ver más ilustraciones",
    },
    social: {
      eyebrow: "02 · Social Media",
      title: "Diseño para redes.",
      desc: "Sistemas visuales para feed, historias y campañas — coherentes, escalables y listos para publicar.",
      feed: "Feed",
      story: "Historias",
    },
    igaming: {
      eyebrow: "03 · iGaming",
      title: "Diseño para iGaming.",
      cases: [
        {
          brand: "Aurora Slots",
          goal: "Identidad visual y key art para el lanzamiento de una slot temática — sistema de banners, íconos y teasers para la campaña de estreno.",
        },
        {
          brand: "Nova Bet",
          goal: "Rediseño de las piezas promocionales de casino en vivo, alineando jerarquía, CTAs y ritmo visual entre web, app y anuncios pagos.",
        },
        {
          brand: "Reel Studio",
          goal: "Dirección de arte para una serie de mini-juegos, del moodboard a los símbolos finales, manteniendo consistencia entre títulos de la misma familia.",
        },
      ],
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
const igamingImages = [work5, work2, work6];

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
              className="relative h-[46vh] md:h-[56vh] max-h-[520px] shrink-0 overflow-hidden rounded-xl bg-muted"
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
          className="illustration-tag pointer-events-none fixed z-50 rounded-full border border-accent-ink bg-[oklch(0.97_0.02_150)] px-3.5 py-1.5 font-mono text-[11px] lowercase leading-none tracking-wide text-accent-ink shadow-sm"
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
  const t = dict[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <header className="fixed top-0 inset-x-0 z-40 px-4 md:px-6 pt-4">
        <div
          className={`relative mx-auto max-w-[1300px] flex items-center justify-between gap-4 rounded-full px-5 md:px-7 h-14 transition-all duration-300 ${
            scrolled
              ? "border border-white/40 bg-white/35 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-2xl supports-[backdrop-filter]:bg-white/25"
              : "border border-border bg-background/80 shadow-sm backdrop-blur-md"
          }`}
        >
          <a href="#top" className="text-display text-lg tracking-tight text-foreground shrink-0">
            Tais<span className="italic text-accent-ink"> artwork</span>
          </a>
          <nav className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex items-center gap-5 text-sm md:text-base text-foreground font-coolvetica tracking-[0.14em]">
            <a href="#illustration" className="pointer-events-auto hover:text-accent-ink transition-colors">{t.nav.work}</a>
            <a href="#social" className="pointer-events-auto hover:text-accent-ink transition-colors">{t.nav.social}</a>
            <a href="#igaming" className="pointer-events-auto hover:text-accent-ink transition-colors">{t.nav.igaming}</a>
            <a href="#contact" className="pointer-events-auto hover:text-accent-ink transition-colors">{t.nav.contact}</a>
          </nav>
          <div className="flex items-center gap-1 text-[13px] tracking-[0.04em] uppercase text-foreground font-coolvetica">
            <Globe className="w-3.5 h-3.5 shrink-0 text-foreground" aria-hidden="true" />

            {(["pt", "en", "es"] as Lang[]).map((l, i) => (
              <Fragment key={l}>
                {i > 0 && <span className="mx-0.5 opacity-40">/</span>}
                <button
                  onClick={() => setLang(l)}
                  className={`min-w-[2ch] text-center leading-none transition-colors ${
                    lang === l ? "text-accent-ink font-[900]" : "hover:text-accent-ink"
                  }`}
                  aria-label={`Switch language to ${l.toUpperCase()}`}
                >
                  {l.toUpperCase()}
                </button>
              </Fragment>
            ))}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="hero-dot-bg mx-auto max-w-[1300px] px-6 md:px-10 pt-36 md:pt-44 pb-24 md:pb-32">
        <div>
          <p className="eyebrow text-muted-foreground">{t.hero.role}</p>
          <h1 className="mt-8 text-[3rem] sm:text-[4.5rem] md:text-[6.5rem] font-normal leading-[0.95] text-foreground">
            <span className="font-eighties-condensed">{t.hero.title1}</span> <br />
            <span className="font-eighties-mdsmcn text-accent-ink">{t.hero.title2}</span>
          </h1>
        </div>
        <div className="mt-20 flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
          <span className="h-px w-10 bg-border" />
          {t.hero.scroll}
        </div>
      </section>

      {/* Intro */}
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-24 md:py-36 grid md:grid-cols-[5fr_7fr] gap-10 md:gap-16 items-center">
          <Reveal>
            <img
              src={portrait}
              alt="Retrato de Tais, ilustradora e designer"
              className="w-full h-auto object-cover aspect-[4/5] grayscale hover:grayscale-0 transition-all duration-700"
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
      <section id="illustration" className="border-t border-border/60">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10 pt-24 md:pt-32">
          <Reveal className="mb-14 flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h2 className="font-eighties-condensed text-4xl md:text-6xl font-normal text-foreground"><span className="text-accent-ink">{t.illu.title.replace(/\.$/, "")}</span>.</h2>
            </div>
            <p className="text-base md:text-lg text-foreground max-w-xs font-coolvetica font-normal">{t.illu.desc}</p>
          </Reveal>
        </div>
        <IllustrationScroller slides={illustrationSlides} />
        <div className="mx-auto max-w-[1300px] px-6 md:px-10 pt-8 pb-16 md:pb-20 flex justify-end">
          <button
            type="button"
            className="rounded-full border border-accent-ink bg-background px-5 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-accent-ink transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-accent-ink hover:text-background active:scale-[0.98]"
          >
            {t.illu.seeMore}
          </button>
        </div>
      </section>

      {/* Social Media */}
      <section id="social" className="bg-secondary/40">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10 py-24 md:py-32">
          <Reveal className="mb-14 flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h2 className="font-eighties-condensed text-4xl md:text-6xl font-normal text-foreground"><span className="text-accent-ink">{t.social.title.replace(/\.$/, "")}</span>.</h2>
            </div>
            <p className="text-base md:text-lg text-foreground max-w-xs font-coolvetica font-normal">{t.social.desc}</p>
          </Reveal>

          <div className="grid md:grid-cols-12 gap-6 md:gap-8">
            {/* Feed mockup */}
            <Reveal className="md:col-span-7">
              <p className="eyebrow text-muted-foreground mb-3">{t.social.feed}</p>
              <div className="bg-background border border-border/70 p-4 md:p-6">
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
                    className="w-[46%] max-w-[220px] aspect-[9/16] rounded-2xl overflow-hidden bg-background border border-border/70 shadow-sm"
                  >
                    <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* iGaming */}
      <section id="igaming" className="border-t border-border/60">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10 py-24 md:py-32">
          <Reveal className="mb-16">
            <h2 className="font-eighties-condensed text-4xl md:text-6xl font-normal text-foreground"><span className="text-accent-ink">{t.igaming.title.replace(/\.$/, "")}</span>.</h2>
          </Reveal>
          <div className="space-y-16 md:space-y-24">
            {t.igaming.cases.map((c, i) => (
              <Reveal key={i}>
                <article className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
                  <div className={`md:col-span-7 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={igamingImages[i]}
                        alt={c.brand}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                    <h3 className="text-display text-3xl md:text-4xl text-foreground">{c.brand}</h3>
                    <p className="mt-5 text-lg md:text-xl text-foreground leading-relaxed font-coolvetica font-normal">{c.goal}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-border/60 bg-foreground text-background">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10 pt-20 md:pt-24 pb-14 md:pb-16 text-center">
          <Reveal className="flex w-full flex-col items-center text-center">
            <p className="font-coolvetica text-[0.7rem] font-normal uppercase tracking-[0.22em] text-background pl-[0.22em]">
              {t.contact.eyebrow}
            </p>

            <div className="mt-8 inline-flex items-center justify-center gap-3 rounded-full border-2 border-accent-ink/70 px-6 py-3 text-sm md:text-base text-background">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-ink opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-ink" />
              </span>
              <span className="font-coolvetica font-light tracking-[0.14em]">{t.contact.available}</span>
            </div>

            <h2 className="font-eighties-condensed mt-8 w-full max-w-5xl text-center text-5xl md:text-8xl font-normal leading-[0.95]">
              <span className="block">{t.contact.title1}</span>
              <span className="block italic text-accent-ink">{t.contact.title2}</span>
            </h2>

            <div className="relative mt-10 flex w-full justify-center">
              <div
                className={`absolute -top-12 left-1/2 -translate-x-1/2 rounded-full border border-background/10 px-5 py-2 text-[11px] tracking-[0.18em] uppercase transition-all duration-300 ${
                  copied ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"
                }`}
              >
                {t.contact.copied}
              </div>
              <div className="inline-flex items-center justify-center gap-3 rounded-full border border-background/10 bg-background/10 px-5 py-3 shadow-sm transition-colors hover:border-accent-ink/70">
                <a
                  href={`mailto:${t.contact.email}`}
                  className="font-coolvetica text-sm md:text-base font-bold tracking-[0.08em] text-background transition-colors hover:text-accent"
                >
                  {t.contact.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className={`relative inline-flex h-4 w-4 items-center justify-center text-background/60 transition duration-200 hover:text-accent active:scale-90 ${
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

            <p className="mt-10 font-coolvetica text-[0.7rem] font-normal uppercase tracking-[0.22em] text-background pl-[0.22em]">
              {t.contact.alsoFind}
            </p>
            <div className="mt-6 flex w-full items-center justify-center gap-5">
              <a
                href="https://www.instagram.com/taisartwork"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.contact.social.ig}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-background/10 bg-background/10 text-background/70 transition duration-300 hover:scale-110 hover:border-accent-ink/70 hover:text-accent"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.behance.net/taisnonato"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.contact.social.be}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-background/10 bg-background/10 text-background/70 transition duration-300 hover:scale-110 hover:border-accent-ink/70 hover:text-accent"
              >
                <span className="text-[15px] font-black leading-none tracking-[-0.08em]">Bē</span>
              </a>
              <a
                href="https://www.linkedin.com/in/tais-macedo-306984124/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.contact.social.ln}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-background/10 bg-background/10 text-background/70 transition duration-300 hover:scale-110 hover:border-accent-ink/70 hover:text-accent"
              >
                <span className="text-[18px] font-black leading-none tracking-[-0.08em]">in</span>
              </a>
            </div>
          </Reveal>
        </div>
        <div className="border-t border-background/10">
          <div className="mx-auto max-w-[1300px] px-6 md:px-10 py-6 text-center font-coolvetica text-[11px] tracking-[0.18em] uppercase opacity-60">
            {t.contact.footer}
          </div>
        </div>
      </section>
    </div>
  );
}
