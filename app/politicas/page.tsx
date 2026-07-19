import type { Metadata } from "next";
import { site } from "@/data/site.config";

export const metadata: Metadata = {
  title: "Políticas da loja",
  description:
    "Política de trocas, política de privacidade e termos de uso da Bella Black.",
};

export default function PoliciesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6 lg:pt-32">
      <h1 className="font-display text-4xl uppercase text-bone sm:text-5xl">
        Políticas da <span className="text-volt">loja</span>
      </h1>

      <section id="trocas" className="mt-12 scroll-mt-28">
        <h2 className="font-display text-2xl uppercase text-volt">Política de trocas</h2>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-bone/70">
          <p>
            Trocas podem ser feitas em até 7 dias corridos após a compra,
            mediante apresentação do comprovante, com a peça sem uso, sem
            lavagem e com a etiqueta original.
          </p>
          <p>
            Para peças compradas à distância, o prazo conta a partir do
            recebimento. Combine a troca pelo WhatsApp antes de enviar
            qualquer peça.
          </p>
        </div>
      </section>

      <section id="privacidade" className="mt-12 scroll-mt-28">
        <h2 className="font-display text-2xl uppercase text-volt">
          Política de privacidade
        </h2>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-bone/70">
          <p>
            Este site é uma vitrine digital: não coletamos dados de pagamento
            nem exigimos cadastro. As conversas de pedido acontecem no
            WhatsApp da loja e seguem as políticas de privacidade da
            plataforma.
          </p>
          <p>
            Os dados compartilhados com a loja (nome, contato e endereço para
            entrega) são usados apenas para atender o seu pedido.
          </p>
        </div>
      </section>

      <section id="termos" className="mt-12 scroll-mt-28">
        <h2 className="font-display text-2xl uppercase text-volt">Termos de uso</h2>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-bone/70">
          <p>
            Preços, condições e disponibilidade exibidos no site são
            informativos e podem mudar sem aviso. A confirmação de estoque e o
            fechamento do pedido acontecem sempre pelo atendimento da loja no
            WhatsApp.
          </p>
          <p>
            {site.name} — {site.address.street}, {site.address.city} —{" "}
            {site.address.stateFull}.
          </p>
        </div>
      </section>
    </div>
  );
}
