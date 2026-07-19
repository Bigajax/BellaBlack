export const site = {
  name: "Bella Black",
  tagline: "Streetwear para você expressar quem é.",
  since: 2018,
  url: "https://bellablack.com.br",

  // ⚠️ PLACEHOLDER — trocar pelo número real da loja (formato: 55 + DDD + número)
  whatsapp: "5544999990000",

  instagram: "https://www.instagram.com/bellablackoofc/",
  instagramHandle: "@bellablackoofc",

  address: {
    street: "Avenida Mauá, 3133",
    city: "Maringá",
    state: "PR",
    stateFull: "Paraná",
    zip: "87050-020",
  },

  // ⚠️ Confirmar horários reais com a loja
  hours: [
    { days: "Segunda a sexta", time: "9h às 19h" },
    { days: "Sábado", time: "9h às 17h" },
  ],

  mapsQuery: "Bella Black, Avenida Mauá 3133, Maringá - PR",
} as const;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.mapsQuery,
)}`;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  site.mapsQuery,
)}&output=embed`;
