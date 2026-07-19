import { activeProducts } from "./products";
import type { Category, CategoryId } from "./types";

export const categories: Category[] = [
  {
    id: "calcas",
    name: "Calças",
    image: "/images/catalog/bb-21.jpg",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: "conjuntos",
    name: "Conjuntos",
    image: "/images/catalog/bb-13.jpg",
    span: "md:row-span-2",
  },
  {
    id: "camisetas",
    name: "Camisetas",
    image: "/images/catalog/bb-20.jpg",
    span: "",
  },
  {
    id: "moletons",
    name: "Moletons",
    image: "/images/catalog/bb-11.jpg",
    span: "",
  },
  {
    id: "jaquetas",
    name: "Jaquetas",
    image: "/images/catalog/bb-16.jpg",
    span: "",
  },
  {
    id: "bermudas",
    name: "Bermudas",
    image: "/images/catalog/bb-03.jpg",
    span: "",
  },
  {
    id: "acessorios",
    name: "Acessórios",
    image: "/images/catalog/bb-08.jpg",
    span: "",
  },
];

export const categoryNames: Record<CategoryId, string> = {
  camisetas: "Camisetas",
  moletons: "Moletons",
  calcas: "Calças",
  bermudas: "Bermudas",
  conjuntos: "Conjuntos",
  jaquetas: "Jaquetas",
  acessorios: "Acessórios",
};

export function countByCategory(id: CategoryId) {
  return activeProducts.filter((p) => p.category === id).length;
}
