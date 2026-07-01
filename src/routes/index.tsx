import { createFileRoute } from "@tanstack/react-router";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";
import work6 from "@/assets/work-6.jpg";
import portrait from "@/assets/portrait.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

type Project = {
  title: string;
  category: string;
  year: string;
  image: string;
  w: number;
  h: number;
};

const projects: Project[] = [
  { title: "Herbário", category: "Identidade Visual", year: "2025", image: work1, w: 1024, h: 1280 },
  { title: "Folha App", category: "Produto Digital", year: "2025", image: work2, w: 1024, h: 1024 },
  { title: "Cartaz Olive", category: "Direção de Arte", year: "2024", image: work3, w: 1024, h: 1400 },
  { title: "Estúdio Verde", category: "Web Design", year: "2024", image: work4, w: 1280, h: 1024 },
  { title: "Papelaria Geal", category: "Branding", year: "2024", image: work5, w: 1024, h: 1100 },
  { title: "Botânica", category: "Ilustração", year: "2023", image: work6, w: 1024, h: 1300 },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 flex items-center justify-between h-16">
          <a href="#top" className="text-display text-xl text-forest">
            estúdio<span className="italic text-moss"> verde</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#work" className="hover:text-forest transition-colors">Trabalhos</a>
            <a href="#about" className="hover:text-forest transition-colors">Sobre</a>
            <a href="#services" className="hover:text-forest transition-colors">Serviços</a>
            <a href="#contact" className="hover:text-forest transition-colors">Contato</a>
          </nav>
          <a
            href="#contact"
            className="rounded-full bg-primary text-primary-foreground text-xs px-4 py-2 hover:bg-moss transition-colors"
          >
            Iniciar projeto
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="mx-auto max-w-[1400px] px-6 md:px-10 pt-16 md:pt-28 pb-20">
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-8">
            <p className="eyebrow text-moss">Portfólio · 2019 — 2026</p>
            <h1 className="text-display mt-6 text-[3.2rem] sm:text-[4.5rem] md:text-[7rem] leading-[0.92] text-forest">
              Design que <br />
              <span className="italic text-moss">respira</span>, cresce <br />
              e permanece.
            </h1>
          </div>
          <div className="md:col-span-4 md:pb-4">
            <p className="text-base md:text-lg text-muted-foreground max-w-sm">
              Sou designer independente. Crio identidades visuais, produtos digitais e
              direção de arte para marcas que valorizam calma, ofício e detalhe.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-moss animate-pulse" />
              <span className="text-xs text-muted-foreground">Aceitando projetos para Q2</span>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee tag row */}
      <div className="border-y border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-4 flex flex-wrap items-center gap-x-8 gap-y-2 text-xs text-muted-foreground">
          <span className="eyebrow text-forest">Especialidades</span>
          <span>Identidade Visual</span>
          <span>·</span>
          <span>Design Editorial</span>
          <span>·</span>
          <span>Produto Digital</span>
          <span>·</span>
          <span>Direção de Arte</span>
          <span>·</span>
          <span>Packaging</span>
          <span>·</span>
          <span>Tipografia</span>
        </div>
      </div>

      {/* Work — Masonry */}
      <section id="work" className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow text-moss">Trabalhos selecionados</p>
            <h2 className="text-display text-4xl md:text-6xl text-forest mt-3">
              Um jardim de <span className="italic">projetos</span>.
            </h2>
          </div>
          <a href="#contact" className="hidden md:inline text-sm text-muted-foreground hover:text-forest">
            Ver arquivo completo →
          </a>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {projects.map((p, i) => (
            <figure
              key={p.title}
              className="mb-6 break-inside-avoid group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-md bg-muted">
                <img
                  src={p.image}
                  alt={p.title}
                  width={p.w}
                  height={p.h}
                  loading={i < 2 ? "eager" : "lazy"}
                  className="w-full h-auto transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/10 transition-colors duration-500" />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between gap-4">
                <div>
                  <h3 className="text-display text-xl text-forest">{p.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{p.category}</p>
                </div>
                <span className="text-xs text-muted-foreground tabular-nums">{p.year}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-secondary/40 border-y border-border/60">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5">
            <div className="overflow-hidden rounded-md bg-muted">
              <img
                src={portrait}
                alt="Retrato da designer no estúdio"
                width={1024}
                height={1280}
                loading="lazy"
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="md:col-span-7 md:pl-8">
            <p className="eyebrow text-moss">Sobre</p>
            <h2 className="text-display text-4xl md:text-6xl text-forest mt-4">
              Design com raízes, <span className="italic">feito à mão</span>.
            </h2>
            <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              Trabalho como designer independente há mais de seis anos, colaborando com marcas
              pequenas e médias que valorizam ofício e narrativa. Meu processo começa com
              conversa — entender o terreno antes de plantar qualquer coisa.
            </p>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
              <div>
                <dt className="text-xs text-muted-foreground">Anos</dt>
                <dd className="text-display text-3xl text-forest mt-1">06</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Projetos</dt>
                <dd className="text-display text-3xl text-forest mt-1">40+</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Clientes</dt>
                <dd className="text-display text-3xl text-forest mt-1">22</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <p className="eyebrow text-moss">Serviços</p>
        <h2 className="text-display text-4xl md:text-6xl text-forest mt-3 max-w-3xl">
          O que posso <span className="italic">cultivar</span> para você.
        </h2>

        <div className="mt-14 divide-y divide-border border-y border-border">
          {[
            { n: "01", t: "Identidade Visual", d: "Logotipos, sistemas visuais e diretrizes de marca com longevidade." },
            { n: "02", t: "Design Editorial", d: "Livros, revistas, relatórios e materiais impressos com atenção tipográfica." },
            { n: "03", t: "Produto Digital", d: "Interfaces limpas para web e mobile, do wireframe ao design system." },
            { n: "04", t: "Direção de Arte", d: "Campanhas, ensaios e narrativas visuais para marcas conscientes." },
          ].map((s) => (
            <div key={s.n} className="grid grid-cols-12 gap-6 py-8 group hover:bg-accent/40 transition-colors px-2 -mx-2 rounded">
              <div className="col-span-2 md:col-span-1 eyebrow text-moss">{s.n}</div>
              <h3 className="col-span-10 md:col-span-4 text-display text-2xl md:text-3xl text-forest">
                {s.t}
              </h3>
              <p className="col-span-12 md:col-span-7 text-muted-foreground md:pl-8">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-forest text-cream">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-36">
          <p className="eyebrow text-sage">Contato</p>
          <h2 className="text-display text-5xl md:text-8xl mt-6 leading-[0.95]">
            Vamos plantar <br />
            algo <span className="italic text-sage">juntos</span>?
          </h2>
          <div className="mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <a
              href="mailto:ola@estudioverde.com"
              className="text-display text-2xl md:text-4xl underline underline-offset-8 decoration-sage/40 hover:decoration-sage transition"
            >
              ola@estudioverde.com
            </a>
            <div className="flex gap-6 text-sm text-sage">
              <a href="#" className="hover:text-cream">Instagram</a>
              <a href="#" className="hover:text-cream">Behance</a>
              <a href="#" className="hover:text-cream">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="border-t border-cream/10">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-sage">
            <p>© 2026 Estúdio Verde. Todos os direitos reservados.</p>
            <p>Feito com calma em São Paulo · BR</p>
          </div>
        </div>
      </section>
    </div>
  );
}
