import { createFileRoute } from "@tanstack/react-router";

import heroAsset from "@/assets/sabores-copa-hero.png.asset.json";
import { SaboresCopaPage } from "@/components/landing/sabores-copa-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sabores da Copa é na Villa | Promoções Copa do Mundo 2026" },
      {
        name: "description",
        content:
          "Delivery especial, combos dos jogos do Brasil, Copa dos Sabores, Passaporte Gastronômico e Bolão da Copa. Faça seu pedido na Villa Rotisseria.",
      },
      { property: "og:title", content: "Sabores da Copa é na Villa | Promoções Copa do Mundo 2026" },
      {
        property: "og:description",
        content:
          "Delivery especial, combos dos jogos do Brasil, Copa dos Sabores, Passaporte Gastronômico e Bolão da Copa. Faça seu pedido na Villa Rotisseria.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroAsset.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Sabores da Copa é na Villa | Promoções Copa do Mundo 2026" },
      {
        name: "twitter:description",
        content:
          "Delivery especial, combos dos jogos do Brasil, Copa dos Sabores, Passaporte Gastronômico e Bolão da Copa. Faça seu pedido na Villa Rotisseria.",
      },
      { name: "twitter:image", content: heroAsset.url },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return <SaboresCopaPage />;
}
