import type { Look } from "./types";

/**
 * Looks montados com fotos reais do Instagram da loja. Os pontos (x/y em %)
 * marcam peças do catálogo equivalentes às usadas na foto.
 */
export const looks: Look[] = [
  {
    id: "look-web",
    title: "Fit de rua",
    image: "/images/catalog/bb-24.jpg",
    items: [
      { label: "Camiseta estampada", slug: "camiseta-dragon-storm", x: 55, y: 18 },
      { label: "Calça Baggy Web", slug: "calca-baggy-web", x: 46, y: 60 },
    ],
  },
  {
    id: "look-zipper",
    title: "Uniforme do frio",
    image: "/images/catalog/bb-30.jpg",
    items: [
      { label: "Conjunto Zipper Cinza", slug: "conjunto-zipper-cinza", x: 50, y: 36 },
      { label: "Cinto Couro Emblema", slug: "cinto-couro-emblema", x: 52, y: 58 },
    ],
  },
  {
    id: "look-graffiti",
    title: "All black pesado",
    image: "/images/catalog/bb-29.jpg",
    items: [
      { label: "Conjunto Zipper Preto", slug: "conjunto-zipper-preto", x: 50, y: 30 },
      { label: "Calça Baggy Acid Grafite", slug: "calca-baggy-acid-grafite", x: 44, y: 72 },
    ],
  },
];
