import { createFileRoute } from "@tanstack/react-router";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work6 from "@/assets/work-6.jpg";
import catImageAsset from "@/assets/cat.jpg.asset.json";
import catVideoAsset from "@/assets/cat.mp4.asset.json";
import { ContactSection, dict, Reveal, SiteHeader, useLang } from "@/lib/portfolio";

const catImage = catImageAsset.url;
const catVideo = catVideoAsset.url;
const illustrations = [work1, work3, work6, work2, work1, work6, work3, work2];

export const Route = createFileRoute("/illustration")({
  head: () => ({
    meta: [
      { title: "Ilustração autoral — Tais Artwork" },
      { name: "description", content: "Ilustrações autorais e comissionadas de Tais: estudos de personagem, peças finais e projetos pessoais." },
      { property: "og:title", content: "Ilustração autoral — Tais Artwork" },
      { property: "og:description", content: "Ilustrações autorais e comissionadas de Tais: estudos de personagem, peças finais e projetos pessoais." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ilustração autoral — Tais Artwork" },
      { name: "twitter:description", content: "Ilustrações autorais e comissionadas de Tais." },
    ],
  }),
  component: IllustrationPage,
});

function IllustrationPage() {
  const [lang, setLang] = useLang();
  const t = dict[lang];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader lang={lang} setLang={setLang} />

      <section className="mx-auto max-w-[1300px] px-6 md:px-10 pt-36 md:pt-44 pb-16">
        <Reveal>
          <p className="eyebrow text-muted-foreground">{t.illu.eyebrow}</p>
          <h1 className="text-display text-5xl md:text-7xl text-foreground mt-6 max-w-3xl">
            <span className="italic text-accent-ink">{t.illu.title.replace(/\.$/, "")}</span>.
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl">{t.illu.desc}</p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1300px] px-6 md:px-10 pb-24 md:pb-32">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
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
      </section>

      <ContactSection lang={lang} />
    </div>
  );
}
