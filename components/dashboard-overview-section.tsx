type DashboardOverviewSectionProps = {
  onboardingCompleted: boolean;
};

export function DashboardOverviewSection({
  onboardingCompleted,
}: DashboardOverviewSectionProps) {
  return (
    <section className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
      <div className="rounded-[2rem] border border-[#d9e8db] bg-[linear-gradient(135deg,#ffffff_0%,#f4fbf4_100%)] p-6 shadow-[0_24px_70px_rgba(26,74,43,0.08)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2d8a4b]">
          Painel do MVP
        </p>
        <h1 className="display-font mt-4 text-3xl font-semibold tracking-tight text-[#183323] sm:text-4xl">
          Sua operação agora está separada por módulos claros e rápidos.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#54705d] sm:text-base">
          A ideia aqui é simples: acompanhar conversas, ajustar catálogo e
          configurar o canal do WhatsApp sem confusão, com uma experiência que
          funciona bem no celular e no uso do dia a dia.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            ["Conversas", "Atendimento, resposta manual e reservas"],
            ["Catálogo", "Produtos, estoque e base da IA"],
            ["WhatsApp", "Configuração do canal e simulador de entrada"],
          ].map(([title, copy]) => (
            <div
              key={title}
              className="rounded-[1.25rem] border border-[#dbe8dc] bg-white/90 p-4"
            >
              <p className="display-font text-base font-semibold text-[#1c3928]">
                {title}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#5c7563]">{copy}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {[
          [
            "Onboarding",
            onboardingCompleted
              ? "Base da loja preenchida e pronta para operação."
              : "Ainda faltam dados iniciais da loja.",
          ],
          ["Uso mobile", "Fluxo pensado para o lojista acompanhar do celular."],
          [
            "Próximo foco",
            "Testar conversas, alimentar catálogo e evoluir a operação real.",
          ],
        ].map(([title, copy]) => (
          <div
            key={title}
            className="rounded-[1.6rem] border border-[#d9e6da] bg-white p-5 shadow-[0_16px_40px_rgba(26,74,43,0.05)]"
          >
            <p className="display-font text-lg font-semibold text-[#173424]">{title}</p>
            <p className="mt-3 text-sm leading-7 text-[#5f7766]">{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
