import { Link } from "@tanstack/react-router";
import { Globe } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

export type Lang = "pt" | "en" | "es";

export const dict = {
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

const LANG_KEY = "tais.lang";

export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLangState] = useState<Lang>("pt");
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY) as Lang | null;
      if (saved === "pt" || saved === "en" || saved === "es") setLangState(saved);
    } catch {}
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(LANG_KEY, l); } catch {}
  };
  return [lang, setLang];
}

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
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

export function SiteHeader({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const t = dict[lang];
  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-background/75 border-b border-border/50">
      <div className="mx-auto max-w-[1300px] px-6 md:px-10 flex items-center justify-between h-16">
        <Link to="/" className="text-display text-lg tracking-tight text-foreground">
          Tais<span className="italic text-accent-ink"> artwork</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-[13px] text-muted-foreground">
          <Link to="/illustration" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>{t.nav.work}</Link>
          <Link to="/" hash="social" className="hover:text-foreground transition-colors">{t.nav.social}</Link>
          <Link to="/igaming" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>{t.nav.igaming}</Link>
          <Link to="/" hash="contact" className="hover:text-foreground transition-colors">{t.nav.contact}</Link>
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
  );
}

export function ContactSection({ lang }: { lang: Lang }) {
  const t = dict[lang];
  return (
    <section id="contact" className="border-t border-border/60 bg-foreground text-background">
      <div className="mx-auto max-w-[1300px] px-6 md:px-10 py-28 md:py-40">
        <Reveal>
          <p className="eyebrow opacity-60">{t.contact.eyebrow}</p>
          <h2 className="text-display text-5xl md:text-8xl mt-6 leading-[0.95]">
            {t.contact.title1} <br />
            <span className="italic text-accent-ink">{t.contact.title2}</span>
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
  );
}
