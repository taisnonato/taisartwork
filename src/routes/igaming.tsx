import { createFileRoute } from "@tanstack/react-router";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work6 from "@/assets/work-6.jpg";
import { ContactSection, dict, Reveal, SiteHeader, useLang } from "@/lib/portfolio";

const igamingImages = [work3, work4, work6];

export const Route = createFileRoute("/igaming")({
  head: () => ({
    meta: [
      { title: "Design para iGaming — Tais Artwork" },
      { name: "description", content: "Mini cases de design para iGaming: identidade visual, key art, banners e direção de arte para slots e cassino ao vivo." },
      { property: "og:title", content: "Design para iGaming — Tais Artwork" },
      { property: "og:description", content: "Mini cases de design para iGaming: identidade visual, key art, banners e direção de arte para slots e cassino ao vivo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Design para iGaming — Tais Artwork" },
      { name: "twitter:description", content: "Mini cases de design para iGaming." },
    ],
  }),
  component: IGamingPage,
});

function IGamingPage() {
  const [lang, setLang] = useLang();
  const t = dict[lang];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader lang={lang} setLang={setLang} />

      <section className="mx-auto max-w-[1300px] px-6 md:px-10 pt-36 md:pt-44 pb-16">
        <Reveal>
          <p className="eyebrow text-muted-foreground">{t.igaming.eyebrow}</p>
          <h1 className="text-display text-5xl md:text-7xl text-foreground mt-6 max-w-3xl">
            <span className="italic text-accent-ink">{t.igaming.title.replace(/\.$/, "")}</span>.
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1300px] px-6 md:px-10 pb-24 md:pb-32">
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
                  <h2 className="text-display text-3xl md:text-4xl text-foreground mt-3">{c.brand}</h2>
                  <p className="mt-5 text-base text-muted-foreground leading-relaxed">{c.goal}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <ContactSection lang={lang} />
    </div>
  );
}
