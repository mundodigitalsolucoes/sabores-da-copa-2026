import { useEffect, useMemo } from "react";
import {
  ArrowRight,
  Clock3,
  Gift,
  Globe,
  MapPinned,
  PackageCheck,
  ScrollText,
  ShieldCheck,
  Star,
  Trophy,
  Truck,
  UtensilsCrossed,
  Zap,
} from "lucide-react";

import heroImage from "@/assets/mascote-villa-copa.png";
import deliveryAsset from "@/assets/delivery-especial.png.asset.json";
import combosAsset from "@/assets/combos-especiais.png.asset.json";
import flavorsAsset from "@/assets/copa-sabores.png.asset.json";
import passportAsset from "@/assets/passaporte-gastronomico.png.asset.json";
import poolAsset from "@/assets/bolao-copa.png.asset.json";
import finalAsset from "@/assets/acesso-cardapio.png.asset.json";
import logoAsset from "@/assets/villa-rotisseria-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import {
  CAMPAIGN_LINKS,
  bootstrapMarketing,
  trackMenuClick,
  trackPageView,
  trackScrollDepth70,
  trackViewContent,
  trackWhatsAppClick,
} from "@/lib/marketing";

const benefits = [
  "Horário estendido",
  "Pedido quentinho",
  "Entrega rápida",
  "Mais comodidade para sua torcida",
];

const comboCards = [
  {
    name: "Combo Torcida",
    copy: "Perfeito para reunir a galera antes do jogo.",
    accent: "Mais pedido da rodada",
  },
  {
    name: "Combo Hexa",
    copy: "Seleção de clássicos da Villa com clima de decisão.",
    accent: "Favorito do estádio",
  },
  {
    name: "Combo Campeão",
    copy: "Mesa farta para transformar cada lance em celebração.",
    accent: "Ideal para família",
  },
];

const countries = [
  { flag: "🇧🇷", country: "Brasil", dish: "Feijoada" },
  { flag: "🇵🇹", country: "Portugal", dish: "Bacalhau à Portuguesa" },
  { flag: "🇪🇸", country: "Espanha", dish: "Paella" },
  { flag: "🇦🇷", country: "Argentina", dish: "Picanha" },
  { flag: "🇩🇪", country: "Alemanha", dish: "Joelho de Porco" },
  { flag: "🇯🇵", country: "Japão", dish: "Sushi" },
  { flag: "🇲🇦", country: "Marrocos", dish: "Cuscuz Marroquino" },
];

const prizes = ["Sobremesas", "Refrigerantes", "Descontos", "Brindes surpresa"];
const podium = ["Frango Assado", "Marmitas", "Vale-compras"];
const stats = [
  { value: 3, suffix: "x", label: "mais cliques no pedido" },
  { value: 7, suffix: " países", label: "na rota da Copa dos Sabores" },
  { value: 2026, suffix: "", label: "energia total da campanha" },
];

function CounterStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  return (
    <div className="campaign-panel-soft reveal rounded-xl px-4 py-5 text-center">
      <div className="font-display text-4xl leading-none text-foreground sm:text-5xl">
        <span data-counter={value}>0</span>
        <span>{suffix}</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function CampaignActions({ source }: { source: string }) {
  return (
    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
      <Button asChild variant="hero" size="hero">
        <a
          href={CAMPAIGN_LINKS.whatsapp}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackWhatsAppClick(source)}
        >
          <span aria-hidden="true">🟢</span>
<span aria-hidden="true">📲</span>
Fazer Pedido
        </a>
      </Button>
      <Button asChild variant="scoreboard" size="hero">
        <a
          href={CAMPAIGN_LINKS.menu}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackMenuClick(source)}
        >
          <span aria-hidden="true">🌐</span>
          Acessar Cardápio
        </a>
      </Button>
    </div>
  );
}

function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="max-w-2xl reveal">
      <span className="campaign-chip">{eyebrow}</span>
      <h2 className="mt-4 font-display text-4xl leading-[0.92] text-foreground sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">{text}</p>
    </div>
  );
}

export function SaboresCopaPage() {
  const sameAs = useMemo(
    () => [CAMPAIGN_LINKS.site, CAMPAIGN_LINKS.menu, CAMPAIGN_LINKS.instagram],
    [],
  );

  useEffect(() => {
    bootstrapMarketing();
    trackPageView();
    trackViewContent("hero");

    const revealItems = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const counterItems = Array.from(document.querySelectorAll<HTMLElement>("[data-counter]"));
    const seenSections = new Set<string>();

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");

          const section = (entry.target as HTMLElement).dataset.section;
          if (section && !seenSections.has(section)) {
            seenSections.add(section);
            trackViewContent(section);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -10% 0px" },
    );

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target as HTMLElement;
          const target = Number(el.dataset.counter || 0);
          const duration = 1100;
          const start = performance.now();

          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            el.textContent = Math.floor(target * (1 - Math.pow(1 - progress, 3))).toString();
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
          counterObserver.unobserve(el);
        });
      },
      { threshold: 0.45 },
    );

    revealItems.forEach((item) => revealObserver.observe(item));
    counterItems.forEach((item) => counterObserver.observe(item));

    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const depth = (window.scrollY / scrollable) * 100;
      if (depth >= 70) trackScrollDepth70();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      revealObserver.disconnect();
      counterObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <main className="relative overflow-hidden bg-background text-foreground">
        <div className="pointer-events-none absolute inset-0 bg-campaign-noise opacity-40" aria-hidden="true" />

        <section className="relative isolate overflow-hidden border-b border-border/60">
          <div className="campaign-hero-glow" aria-hidden="true" />
          <div className="container mx-auto grid min-h-screen max-w-7xl gap-10 px-4 pb-16 pt-6 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:pb-24 lg:pt-8">
            <div className="relative z-10 flex flex-col justify-between">
              <div>
                
                <div className="mt-10 max-w-2xl">
                   <h1 className="reveal mt-5 font-display text-6xl leading-[0.88] text-foreground sm:text-7xl lg:text-[6.6rem]">
                    Sabores da Copa é na Villa
                  </h1>
                  <p className="reveal mt-5 max-w-xl text-xl leading-8 text-highlight sm:text-2xl">
                    Promoções especiais durante toda a Copa do Mundo 2026.
                  </p>
                  <p className="reveal mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                    Marmitex, assados e combos especiais para você torcer sem correria e garantir o sabor antes do apito inicial.
                  </p>
                  <CampaignActions source="hero" />
                </div>
              </div>
              
            </div>

            <div className="relative z-10 flex items-end justify-center">
              <div className="campaign-image-frame reveal max-w-[36rem]" data-section="hero_poster">
                <img
                  src={heroImage}
                  alt="Arte principal da campanha Sabores da Copa com mascote da Villa em camisa 10 do Brasil"
                  className="h-full w-full object-contain drop-shadow-[0_0_45px_rgba(255,208,0,0.25)] transition duration-700 ease-out hover:scale-[1.02]"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="relative border-b border-border/60 py-18 sm:py-24">
          <div className="container mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <div className="order-2 lg:order-1">
              <div className="campaign-image-frame reveal" data-section="delivery">
                <img
                  src={deliveryAsset.url}
                  alt="Criativo de delivery especial nos jogos do Brasil"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <SectionHeader
                eyebrow="🚚 Dobra 02"
                title="Delivery Especial nos Jogos do Brasil"
                text="Nos dias de jogos da Seleção Brasileira, nosso delivery funciona até o início da partida para a torcida pedir sem correria."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <div key={benefit} className="campaign-panel reveal flex items-start gap-3 rounded-xl p-4">
                    <ShieldCheck className="mt-1 h-5 w-5 text-highlight" />
                    <span className="text-sm font-semibold text-foreground sm:text-base">{benefit}</span>
                  </div>
                ))}
              </div>
              <CampaignActions source="delivery" />
            </div>
          </div>
        </section>

        <section className="relative border-b border-border/60 py-18 sm:py-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeader
                eyebrow="🇧🇷 Dobra 03"
                title="Combos Especiais para Torcer"
                text="Cada jogo do Brasil terá um combo especial. Monte sua torcida com opções desenhadas para esquentar a resenha antes, durante e depois do jogo."
              />
              <div className="campaign-image-mini reveal" data-section="combos_banner">
                <img
                  src={combosAsset.url}
                  alt="Criativo dos combos especiais da campanha"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {comboCards.map((combo, index) => (
                <article key={combo.name} className="campaign-panel reveal rounded-xl p-5" data-section={`combo_${index + 1}`}>
                  <div className="campaign-media-slot">
                    <div className="campaign-media-slot-inner">
                      <UtensilsCrossed className="h-8 w-8 text-highlight" />
                      <span>Espaço para imagem do combo</span>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center gap-2 text-highlight">
                    <Star className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.18em]">{combo.accent}</span>
                  </div>
                  <h3 className="mt-3 font-display text-3xl leading-none text-foreground">{combo.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{combo.copy}</p>
                </article>
              ))}
            </div>

            <CampaignActions source="combos" />
          </div>
        </section>

        <section className="relative border-b border-border/60 py-18 sm:py-24">
          <div className="campaign-map-grid" aria-hidden="true" />
          <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
              <div>
                <SectionHeader
                  eyebrow="🌎 Dobra 04"
                  title="Uma Viagem Gastronômica pelo Mundo"
                  text="Toda semana um país participante será homenageado com pratos especiais para transformar a Villa em estádio, arquibancada e rota gastronômica da Copa."
                />
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {countries.map((item) => (
                    <article key={item.country} className="campaign-panel reveal rounded-xl p-4" data-section={`country_${item.country}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-2xl">{item.flag}</p>
                          <h3 className="mt-3 font-display text-3xl leading-none text-foreground">{item.country}</h3>
                          <p className="mt-2 text-base font-semibold text-highlight">{item.dish}</p>
                        </div>
                        <MapPinned className="mt-1 h-5 w-5 text-highlight" />
                      </div>
                    </article>
                  ))}
                </div>
                <CampaignActions source="copa_dos_sabores" />
              </div>

              <div className="campaign-image-frame reveal" data-section="flavors_visual">
                <img
                  src={flavorsAsset.url}
                  alt="Criativo Copa dos Sabores com pratos de vários países"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="relative border-b border-border/60 py-18 sm:py-24">
          <div className="container mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.98fr_1.02fr] lg:px-8">
            <div>
              <div className="campaign-image-frame reveal" data-section="passport_visual">
                <img
                  src={passportAsset.url}
                  alt="Mockup ilustrativo do Passaporte Gastronômico da campanha"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div>
              <SectionHeader
                eyebrow="🛂 Dobra 05"
                title="Passaporte Gastronômico"
                text="A cada país experimentado você recebe um carimbo. Complete seu passaporte, acumule experiências e transforme cada rodada em uma chance de ganhar brindes especiais."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {prizes.map((prize) => (
                  <div key={prize} className="campaign-panel reveal flex items-center gap-3 rounded-xl p-4" data-section={`prize_${prize}`}>
                    <Gift className="h-5 w-5 text-highlight" />
                    <span className="text-sm font-semibold text-foreground sm:text-base">🎁 {prize}</span>
                  </div>
                ))}
              </div>
              <div className="campaign-scoreboard reveal mt-8 rounded-2xl p-5">
                <div className="flex items-center gap-3 text-highlight">
                  <ScrollText className="h-5 w-5" />
                  <span className="text-xs font-semibold uppercase tracking-[0.22em]">Mecânica da promoção</span>
                </div>
                <p className="mt-4 text-lg leading-7 text-foreground">
                  Carimbou, avançou. Quanto mais países no passaporte, mais perto de brindes, descontos e recompensas especiais para a sua torcida.
                </p>
              </div>
              <CampaignActions source="passaporte" />
            </div>
          </div>
        </section>

        <section className="relative border-b border-border/60 py-18 sm:py-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr]">
              <div>
                <SectionHeader
                  eyebrow="⚽ Dobra 06"
                  title="Bolão da Copa"
                  text="Participe dos palpites dos jogos do Brasil, aumente o alcance da campanha nas redes e concorra a prêmios especiais em cada partida."
                />

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    "Siga a Villa Rotisseria",
                    "Curta a publicação",
                    "Comente seu placar",
                  ].map((step, index) => (
                    <div key={step} className="campaign-panel reveal rounded-xl p-4" data-section={`bolao_step_${index + 1}`}>
                      <div className="font-display text-4xl leading-none text-highlight">0{index + 1}</div>
                      <p className="mt-3 text-base font-semibold leading-6 text-foreground">{step}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {podium.map((item, index) => (
                    <div key={item} className="campaign-panel-soft reveal rounded-xl p-4 text-center" data-section={`podium_${index + 1}`}>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-highlight/30 bg-highlight/10 text-highlight">
                        <Trophy className="h-5 w-5" />
                      </div>
                      <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-highlight">{["🥇", "🥈", "🥉"][index]}</p>
                      <p className="mt-1 text-base font-semibold text-foreground">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="campaign-scoreboard reveal mt-8 rounded-2xl p-5" data-section="bolao_highlight">
                  <div className="flex items-center gap-3 text-highlight">
                    <Zap className="h-5 w-5" />
                    <span className="text-xs font-semibold uppercase tracking-[0.22em]">Destaque da ação</span>
                  </div>
                  <p className="mt-4 text-xl leading-8 text-foreground">
                    Cada jogo do Brasil é uma nova chance de ganhar — e um novo motivo para voltar, comentar e pedir com a Villa.
                  </p>
                </div>

                <CampaignActions source="bolao" />
              </div>

              <div className="campaign-image-frame reveal" data-section="bolao_visual">
                <img
                  src={poolAsset.url}
                  alt="Criativo do Bolão da Copa com instruções para participar"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden py-18 sm:py-24">
          <div className="absolute inset-0 bg-campaign-field" aria-hidden="true" />
          <div className="absolute inset-0 bg-campaign-final-overlay" aria-hidden="true" />
          <div className="container relative z-10 mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <div>
              <span className="campaign-chip reveal">📣 Dobra 07</span>
              <div className="campaign-scoreboard reveal mt-5 rounded-[1.75rem] p-6 sm:p-8" data-section="cta_final">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-highlight">Placar oficial da campanha</p>
                <h2 className="mt-4 font-display text-5xl leading-[0.9] text-foreground sm:text-6xl lg:text-7xl">
                  Acesse nosso cardápio
                </h2>
                <p className="mt-4 font-display text-3xl leading-none text-highlight sm:text-4xl">
                  villarotisseria.com.br
                </p>
                <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                  Faça seu pedido antes do apito inicial e transforme o jogo em experiência de arquibancada, estádio e mesa farta.
                </p>
                <div className="mt-8 flex flex-col gap-3">
                  <Button asChild variant="hero" size="heroLarge">
                    <a
                      href={CAMPAIGN_LINKS.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackWhatsAppClick("cta_final")}
                    >
                      <span aria-hidden="true">🟢</span>
                      Fazer Pedido Agora
                      <ArrowRight className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button asChild variant="scoreboard" size="heroLarge">
                    <a
                      href={CAMPAIGN_LINKS.menu}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackMenuClick("cta_final")}
                    >
                      <span aria-hidden="true">🌐</span>
                      Acessar Cardápio
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="campaign-image-frame reveal max-w-[38rem] justify-self-center lg:justify-self-end" data-section="cta_visual">
              <img
                src={finalAsset.url}
                alt="Mascote da Villa apontando para o acesso ao site em um placar eletrônico"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <footer className="border-t border-border/60 bg-panel/85">
          <div className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <img src={logoAsset.url} alt="Logo da Villa Rotisseria" className="h-18 w-auto" loading="lazy" />
                <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                  Delivery especial, combos dos jogos, Copa dos Sabores, Passaporte Gastronômico e Bolão da Copa em uma campanha feita para alta conversão.
                </p>
                <p className="mt-4 font-display text-3xl leading-none text-highlight">O mundo joga. A Villa serve.</p>
              </div>

              <div className="grid gap-3 text-sm sm:text-base">
                <a href={CAMPAIGN_LINKS.instagram} target="_blank" rel="noreferrer" className="footer-link">
                  Instagram: @villarotisseria
                </a>
                <a href={CAMPAIGN_LINKS.site} target="_blank" rel="noreferrer" className="footer-link">
                  Site: villarotisseria.com.br
                </a>
                <a
                  href={CAMPAIGN_LINKS.menu}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link"
                  onClick={() => trackMenuClick("footer")}
                >
                  Cardápio: cardapio.villarotisseria.com.br
                </a>
                <a
                  href={CAMPAIGN_LINKS.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link"
                  onClick={() => trackWhatsAppClick("footer")}
                >
                  WhatsApp: Fazer pedido agora
                </a>
              </div>
            </div>
          </div>
        </footer>

        <a
          href={CAMPAIGN_LINKS.whatsapp}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackWhatsAppClick("floating_button")}
          className="floating-whatsapp"
          aria-label="Fazer pedido pelo WhatsApp"
        >
          <span className="floating-whatsapp-icon" aria-hidden="true">
            🟢
          </span>
          <span>Faça seu Pedido</span>
        </a>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Villa Rotisseria",
            image: heroImage,
            logo: logoAsset.url,
            url: CAMPAIGN_LINKS.site,
            description:
              "Campanha Sabores da Copa é na Villa com delivery especial, combos da rodada, Copa dos Sabores, Passaporte Gastronômico e Bolão da Copa 2026.",
            sameAs,
            servesCuisine: ["Brasileira", "Rotisserie", "Delivery"],
            areaServed: "Brasil",
            hasMenu: CAMPAIGN_LINKS.menu,
          }),
        }}
      />
    </>
  );
}
