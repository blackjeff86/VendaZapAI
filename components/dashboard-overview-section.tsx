import Link from "next/link";

type DashboardOverviewSectionProps = {
  onboardingCompleted: boolean;
};

function OverviewIcon({ title }: { title: string }) {
  const common = "h-[1rem] w-[1rem]";

  if (title === "Conversas") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.9">
        <path d="M6 8h12" strokeLinecap="round" />
        <path d="M6 12h8" strokeLinecap="round" />
        <path d="M6 16h5" strokeLinecap="round" />
      </svg>
    );
  }

  if (title === "Catálogo") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.9">
        <path d="M6 6.5h12" strokeLinecap="round" />
        <path d="M6 11.5h12" strokeLinecap="round" />
        <path d="M6 16.5h7" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M12 4.5v2.5" strokeLinecap="round" />
      <path d="M9.75 4.5h4.5" strokeLinecap="round" />
      <path d="M6 18V9.75A2.75 2.75 0 0 1 8.75 7h6.5A2.75 2.75 0 0 1 18 9.75V18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DashboardOverviewSection({
  onboardingCompleted,
}: DashboardOverviewSectionProps) {
  return (
    <section className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
      <div className="dashboard-card-strong relative overflow-hidden rounded-[2.15rem] p-6 sm:p-8">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-[radial-gradient(circle_at_top_right,rgba(37,201,91,0.16),transparent_72%)]" />
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2d8a4b]">
          Centro da operação
        </p>
        <h1 className="display-font mt-4 text-3xl font-semibold tracking-tight text-[#183323] sm:text-4xl">
          Painel vivo, claro e pronto para decisão rápida.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#54705d] sm:text-base">
          A experiência foi redesenhada para parecer uma central de operação
          moderna, com mais contraste, hierarquia e atalhos que realmente ajudam o lojista no dia a dia.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            ["Conversas", "Responder rápido, reservar e assumir quando precisar"],
            ["Catálogo", "Preço, estoque e compatibilidade sempre à mão"],
            ["WhatsApp", "Canal pronto para teste e operação real"],
          ].map(([title, copy]) => (
            <div
              key={title}
              className="dashboard-card rounded-[1.35rem] p-4"
            >
              <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-[0.95rem] bg-[rgba(37,201,91,0.1)] text-[#2d8a4b]">
                <OverviewIcon title={title} />
              </span>
              <p className="display-font text-base font-semibold text-[#1c3928]">
                {title}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#5c7563]">{copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/painel/conversas"
            className="rounded-full bg-[#173424] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#214932]"
          >
            Abrir central de conversas
          </Link>
          <Link
            href="/painel/catalogo"
            className="dashboard-chip rounded-full px-4 py-2 text-sm font-semibold text-[#2d8a4b] transition hover:border-[#8abf93] hover:bg-white"
          >
            Ajustar catálogo
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {[
          [
            "Loja pronta",
            onboardingCompleted
              ? "Dados mínimos preenchidos para seguir operando."
              : "Ainda faltam dados básicos para ativar a rotina.",
            onboardingCompleted
              ? "border-[#bfe5c7] bg-[linear-gradient(135deg,#effcf1_0%,#e2f8e7_100%)]"
              : "border-[#f0d9a6] bg-[linear-gradient(135deg,#fff9ec_0%,#fff3d8_100%)]",
          ],
          [
            "Uso mobile",
            "Navegação e blocos redesenhados para leitura rápida no celular.",
            "border-[#cae2df] bg-[linear-gradient(135deg,#f0fbfb_0%,#e8f5f4_100%)]",
          ],
          [
            "Próxima meta",
            "Responder mais rápido, deixar o catálogo confiável e ativar o canal.",
            "border-[#cfe0d0] bg-white",
          ],
        ].map(([title, copy, tone]) => (
          <div
            key={title}
            className={`rounded-[1.8rem] border p-5 shadow-[0_16px_40px_rgba(26,74,43,0.08)] ${tone}`}
          >
            <div className="mb-3 h-1.5 w-14 rounded-full bg-[rgba(37,201,91,0.18)]" />
            <p className="display-font text-lg font-semibold text-[#173424]">{title}</p>
            <p className="mt-3 text-sm leading-7 text-[#5f7766]">{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
