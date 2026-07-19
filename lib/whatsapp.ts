import { site } from "@/data/site.config";
import { formatPrice } from "./format";
import type { Product } from "@/data/types";

function waLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const waGeneral = waLink(
  "Olá! Conheci a Bella Black pelo site e gostaria de conhecer os produtos disponíveis.",
);

export const waLocation = waLink(
  "Olá! Gostaria de confirmar o endereço e o horário de atendimento da loja.",
);

export function waProduct(
  product: Product,
  options?: { size?: string; color?: string },
) {
  const lines = [
    "Olá! Vi este produto no catálogo da Bella Black:",
    "",
    `Produto: ${product.name}`,
    options?.color ? `Cor: ${options.color}` : null,
    options?.size ? `Tamanho: ${options.size}` : null,
    `Valor: ${formatPrice(product.promoPrice ?? product.price)}`,
    `Código: ${product.code}`,
    `Link: ${site.url}/produto/${product.slug}`,
    "",
    "Gostaria de confirmar a disponibilidade e finalizar meu pedido.",
  ].filter((l): l is string => l !== null);
  return waLink(lines.join("\n"));
}
