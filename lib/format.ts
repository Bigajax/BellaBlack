export function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/** Parcelamento padrão da loja: até 3x sem juros */
export function installments(value: number) {
  return `3x de ${formatPrice(value / 3)} sem juros`;
}
