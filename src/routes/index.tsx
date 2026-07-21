import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Globe } from "lucide-react";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";
import work6 from "@/assets/work-6.jpg";
import portraitAsset from "@/assets/portrait-tais.png.asset.json";
import catImageAsset from "@/assets/cat.jpg.asset.json";
import catVideoAsset from "@/assets/cat.mp4.asset.json";
import yukakoAsset from "@/assets/illu-yukako.jpg.asset.json";
import monalisaAsset from "@/assets/illu-monalisa.jpg.asset.json";
import butterflyAsset from "@/assets/illu-butterfly.jpg.asset.json";
import meganAsset from "@/assets/illu-megan.jpg.asset.json";
const portrait = portraitAsset.url;
const catImage = catImageAsset.url;
const catVideo = catVideoAsset.url;
const illustrationSlides = [
  { type: "video" as const, image: catImage, video: catVideo, alt: "Ilustração autoral — gato" },
  { type: "image" as const, src: yukakoAsset.url, alt: "Yukako" },
  { type: "image" as const, src: monalisaAsset.url, alt: "Monalisa Hollywood" },
  { type: "image" as const, src: butterflyAsset.url, alt: "Borboletas" },
  { type: "image" as const, src: meganAsset.url, alt: "Megan" },
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
      eyebrow: "Contato",
      title1: "Vamos criar",
      title2: "algo juntos?",
      email: "taiscapinan@gmail.com",
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
      eyebrow: "Contact",
      title1: "Let's make",
      title2: "something together?",
      email: "taiscapinan@gmail.com",
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
      eyebrow: "Contacto",
      title1: "¿Creamos algo",
      title2: "juntos?",
      email: "taiscapinan@gmail.com",
      social: { ig: "Instagram", be: "Behance", ln: "LinkedIn" },
      footer: "© 2026 Tais Artwork · Hecho con calma",
    },
  },
} as const;

const illustrations = [work1, work3, work6, work2];
const socialPieces = [work4, work5, work2, work1];
const igamingImages = [work3, work4, work6];

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

function Index() {
  const [lang, setLang] = useState<Lang>("pt");
  const t = dict[lang];

  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-background/75 border-b border-border/50">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10 flex items-center justify-between h-16">
          <a href="#top" className="text-display text-lg tracking-tight text-foreground">
            Tais<span className="italic text-accent-ink"> artwork</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-[13px] text-muted-foreground">
            <a href="#illustration" className="hover:text-foreground transition-colors">{t.nav.work}</a>
            <a href="#social" className="hover:text-foreground transition-colors">{t.nav.social}</a>
            <a href="#igaming" className="hover:text-foreground transition-colors">{t.nav.igaming}</a>
            <a href="#contact" className="hover:text-foreground transition-colors">{t.nav.contact}</a>
          </nav>
          <div className="flex items-center gap-1.5 text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
            <Globe className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />

            {(["pt", "en", "es"] as Lang[]).map((l, i) => (
              <span key={l} className="flex items-center">
                {i > 0 && <span className="mx-1.5 opacity-40">/</span>}
                <button
                  onClick={() => setLang(l)}
                  className={`transition-colors ${
                    lang === l ? "text-foreground font-medium" : "hover:text-foreground"
                  }`}
                  aria-label={`Switch language to ${l.toUpperCase()}`}
                >
                  {l.toUpperCase()}
                </button>
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="mx-auto max-w-[1300px] px-6 md:px-10 pt-36 md:pt-44 pb-24 md:pb-32">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-end">
          <div className="md:col-span-7">
            <p className="eyebrow text-muted-foreground">{t.hero.role}</p>
            <h1 className="text-display mt-8 text-[3rem] sm:text-[4.5rem] md:text-[6.5rem] leading-[0.95] text-foreground">
              {t.hero.title1} <br />
              <span className="italic text-accent-ink">{t.hero.title2}</span>
            </h1>
          </div>
          <div className="md:col-span-5">
            <div className="aspect-[4/5] overflow-hidden bg-muted">
              <img
                src={work1}
                alt="Ilustração em destaque"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
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
            <p className="mt-8 text-2xl md:text-4xl leading-[1.35] text-foreground font-serif">
              {t.intro.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Illustration */}
      <section id="illustration" className="border-t border-border/60">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10 py-24 md:py-32">
          <Reveal className="mb-14 flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="eyebrow text-muted-foreground">{t.illu.eyebrow}</p>
              <h2 className="text-display text-4xl md:text-6xl text-foreground mt-4"><span className="italic text-accent-ink">{t.illu.title.replace(/\.$/, "")}</span>.</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">{t.illu.desc}</p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {illustrations.map((src, i) => (
              <Reveal key={i}>
                {i === 0 ? (
                  <figure
                    className="group relative overflow-hidden bg-muted aspect-[3/4]"
                    onMouseEnter={(e) => {
                      const v = e.currentTarget.querySelector("video");
                      if (v) v.play().catch(() => {});
                    }}
                    onMouseLeave={(e) => {
                      const v = e.currentTarget.querySelector("video");
                      if (v) { v.pause(); v.currentTime = 0; }
                    }}
                  >
                    <img
                      src={catImage}
                      alt="Ilustração autoral — gato"
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                    />
                    <video
                      src={catVideo}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </figure>
                ) : (
                  <figure className="group overflow-hidden bg-muted aspect-[3/4]">
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </figure>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section id="social" className="border-t border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10 py-24 md:py-32">
          <Reveal className="mb-14 flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="eyebrow text-muted-foreground">{t.social.eyebrow}</p>
              <h2 className="text-display text-4xl md:text-6xl text-foreground mt-4"><span className="italic text-accent-ink">{t.social.title.replace(/\.$/, "")}</span>.</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">{t.social.desc}</p>
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
                  {[work4, work5, work2, work1, work3, work6].map((src, i) => (
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
            <p className="eyebrow text-muted-foreground">{t.igaming.eyebrow}</p>
            <h2 className="text-display text-4xl md:text-6xl text-foreground mt-4"><span className="italic text-accent-ink">{t.igaming.title.replace(/\.$/, "")}</span>.</h2>
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
                    <p className="eyebrow text-muted-foreground">0{i + 1}</p>
                    <h3 className="text-display text-3xl md:text-4xl text-foreground mt-3">{c.brand}</h3>
                    <p className="mt-5 text-base text-muted-foreground leading-relaxed">{c.goal}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-border/60 bg-foreground text-background">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10 py-28 md:py-40">
          <Reveal>
            <p className="eyebrow opacity-60">{t.contact.eyebrow}</p>
            <h2 className="text-display text-5xl md:text-8xl mt-6 leading-[0.95]">
              {t.contact.title1} <br />
              <span className="italic opacity-80">{t.contact.title2}</span>
            </h2>
            <div className="mt-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <a
                href={`mailto:${t.contact.email}`}
                className="text-display text-2xl md:text-4xl underline underline-offset-8 decoration-background/30 hover:decoration-background transition"
              >
                {t.contact.email}
              </a>
              <div className="flex gap-6 text-sm opacity-70">
                <a href="https://www.instagram.com/taisartwork" target="_blank" rel="noopener noreferrer" className="hover:opacity-100">{t.contact.social.ig}</a>
                <a href="https://www.behance.net/taisnonato" target="_blank" rel="noopener noreferrer" className="hover:opacity-100">{t.contact.social.be}</a>
                <a href="https://www.linkedin.com/in/tais-macedo-306984124/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100">{t.contact.social.ln}</a>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="border-t border-background/10">
          <div className="mx-auto max-w-[1300px] px-6 md:px-10 py-6 text-[11px] tracking-[0.18em] uppercase opacity-60">
            {t.contact.footer}
          </div>
        </div>
      </section>
    </div>
  );
}
