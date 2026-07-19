# Bella Black — Vitrine Digital

Vitrine digital da loja de streetwear **Bella Black** (Avenida Mauá, 3133 — Maringá/PR, desde 2018). Não é um e-commerce: a conversão acontece pelo WhatsApp, com mensagem automática montada a partir da peça escolhida.

## Rodar o projeto

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção
```

## ⚠️ Antes de publicar

1. **WhatsApp** — trocar o número placeholder em `data/site.config.ts` (`whatsapp: "5544999990000"`) pelo número real da loja.
2. **Horários** — confirmar os horários de atendimento em `data/site.config.ts`.
3. **Domínio** — ajustar `url` em `data/site.config.ts` (usado no SEO e nos links das mensagens de WhatsApp).

## Estrutura

- `data/products.ts` — **fonte única de produtos**. Cada peça é um objeto com código, preço, tamanhos, cores, badges etc. Para adicionar/editar produtos, mexa só aqui (formato já pensado para migrar para Supabase + painel admin no futuro).
- `data/categories.ts`, `data/looks.ts`, `data/site.config.ts` — categorias, looks do editorial e dados da loja.
- `app/` — páginas: home, `catalogo` (busca + filtros), `produto/[slug]`, `sobre`, `loja`, `politicas`.
- `components/` — Header, Footer, ProductCard, seções da home, grafismos tribais (`Tribal.tsx`).
- `public/images/catalog/` — fotos reais extraídas do Instagram [@bellablackoofc](https://www.instagram.com/bellablackoofc/) (`bb-00` a `bb-35`).

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4. Sem banco de dados nesta versão — tudo estático e rápido.
