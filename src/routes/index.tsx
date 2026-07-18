import { createFileRoute, Link } from "@tanstack/react-router";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";
import work6 from "@/assets/work-6.jpg";
import portraitAsset from "@/assets/portrait-tais.png.asset.json";
import { ContactSection, dict, Reveal, SiteHeader, useLang } from "@/lib/portfolio";

const portrait = portraitAsset.url;

export const Route = createFileRoute("/")({
  component: Index,
});

const socialPieces = [work4, work5, work2, work1];

function Index() {
  const [lang, setLang] = useLang();
  const t = dict[lang];

  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      <SiteHeader lang={lang} setLang={setLang} />

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
              <img src={work1} alt="Ilustração em destaque" className="w-full h-full object-cover" loading="eager" />
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
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/illustration"
                className="text-[11px] tracking-[0.2em] uppercase text-foreground border-b border-foreground/40 hover:border-foreground pb-1 transition"
              >
                {t.illu.eyebrow} →
              </Link>
              <Link
                to="/igaming"
                className="text-[11px] tracking-[0.2em] uppercase text-foreground border-b border-foreground/40 hover:border-foreground pb-1 transition"
              >
                {t.igaming.eyebrow} →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Social Media */}
      <section id="social" className="border-t border-border/60 bg-secondary/40 scroll-mt-16">
        <div className="mx-auto max-w-[1300px] px-6 md:px-10 py-24 md:py-32">
          <Reveal className="mb-14 flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="eyebrow text-muted-foreground">{t.social.eyebrow}</p>
              <h2 className="text-display text-4xl md:text-6xl text-foreground mt-4"><span className="italic text-accent-ink">{t.social.title.replace(/\.$/, "")}</span>.</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">{t.social.desc}</p>
          </Reveal>

          <div className="grid md:grid-cols-12 gap-6 md:gap-8">
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

      <ContactSection lang={lang} />
    </div>
  );
}
