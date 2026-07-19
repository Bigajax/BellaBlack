export type CategoryId =
  | "camisetas"
  | "moletons"
  | "calcas"
  | "bermudas"
  | "conjuntos"
  | "jaquetas"
  | "acessorios";

export type Badge =
  | "Novo"
  | "Lançamento"
  | "Últimas unidades"
  | "Pronta entrega"
  | "Mais vendido"
  | "Exclusivo"
  | "Oferta";

export type Fit = "oversized" | "baggy" | "regular" | "slim";

export type Gender = "masculino" | "feminino" | "unissex";

export interface Product {
  /** Identificador estável usado como código da peça (ex.: BB-021) */
  code: string;
  slug: string;
  name: string;
  category: CategoryId;
  subcategory?: string;
  brand?: string;
  description: string;
  price: number;
  promoPrice?: number;
  /** Caminhos em /public — a primeira imagem é a principal */
  images: string[];
  colors: string[];
  sizes: string[];
  fit: Fit;
  material: string;
  gender: Gender;
  badges: Badge[];
  /** Aparece na seção "Acabou de chegar" e no filtro de novidades */
  isLaunch: boolean;
  /** Aparece em destaques da home e na ordenação "Destaques" */
  isFeatured: boolean;
  inStock: boolean;
  active: boolean;
  /** Ordem de exibição — menor aparece primeiro */
  order: number;
  relatedSlugs?: string[];
}

export interface Category {
  id: CategoryId;
  name: string;
  image: string;
  /** Classe de grid para a colagem editorial da home */
  span: string;
}

export interface LookItem {
  label: string;
  slug: string;
  /** Posição do ponto interativo sobre a foto, em % */
  x: number;
  y: number;
}

export interface Look {
  id: string;
  title: string;
  image: string;
  items: LookItem[];
}
