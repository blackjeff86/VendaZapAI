import Link from "next/link";
import { DashboardOverviewSection } from "@/components/dashboard-overview-section";
import { getDashboardData } from "@/lib/dashboard";

function ModuleIcon({ title }: { title: string }) {
  const common = "h-[1.1rem] w-[1.1rem]";

  if (title === "Conversas") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.9">
        <path d="M6 8h12" strokeLinecap="round" />
        <path d="M6 12.25h8.5" strokeLinecap="round" />
        <path d="M6 16.5h5.5" strokeLinecap="round" />
        <path d="M5.25 4.75h13.5A1.75 1.75 0 0 1 20.5 6.5v8a1.75 1.75 0 0 1-1.75 1.75h-7l-4.25 3.5v-3.5h-2.25A1.75 1.75 0 0 1 3.5 14.5v-8a1.75 1.75 0 0 1 1.75-1.75Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (title === "Catálogo") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.9">
        <path d="M6 5.5h12" strokeLinecap="round" />
        <path d="M6 10.5h12" strokeLinecap="round" />
        <path d="M6 15.5h7" strokeLinecap="round" />
        <path d="M5.5 4h13a1.5 1.5 0 0 1 1.5 1.5v13A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5v-13A1.5 1.5 0 0 1 5.5 4Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M6 18V9.75A2.75 2.75 0 0 1 8.75 7h6.5A2.75 2.75 0 0 1 18 9.75V18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 18v-4h4v4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 4.5v2.5" strokeLinecap="round" />
      <path d="M9.75 4.5h4.5" strokeLinecap="round" />
    </svg>
  );
}

export default async function DashboardPage() {
  const { onboardingCompleted } = await getDashboardData();

  return (
    <div className="space-y-6 sm:space-y-8">
      <DashboardOverviewSection onboardingCompleted={onboardingCompleted} />

      <section className="grid gap-4 md:grid-cols-3">
        {[
          [
            "Conversas",
            "Acompanhe fila, prioridades e reservas em um fluxo mais rápido.",
            "/painel/conversas",
            "Abrir central",
          ],
          [
            "Catálogo",
            "Cadastre produtos e ajuste estoque sem travar a rotina da loja.",
            "/painel/catalogo",
            "Abrir catálogo",
          ],
          [
            "WhatsApp",
            "Prepare o canal e valide a entrada de mensagens antes da operação real.",
            "/painel/whatsapp",
            "Abrir canal",
          ],
        ].map(([title, copy, href, cta], index) => (
          <div
            key={title}
            className={`rounded-[1.8rem] border p-5 shadow-[0_16px_34px_rgba(26,74,43,0.05)] ${
              index === 0
                ? "border-[#bfe5c7] bg-[linear-gradient(135deg,#f2fff6_0%,#ddf6e6_100%)]"
                : index === 2
                  ? "border-[#cae2df] bg-[linear-gradient(135deg,#f1fbfb_0%,#e4f3f2_100%)]"
                  : "dashboard-card"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-[1.1rem] ${
                  index === 0
                    ? "bg-[rgba(37,201,91,0.12)] text-[#1f7a43]"
                    : index === 2
                      ? "bg-[rgba(72,182,170,0.14)] text-[#1a6e68]"
                      : "bg-[rgba(255,255,255,0.8)] text-[#506a58]"
                }`}
              >
                <ModuleIcon title={title} />
              </span>
              <span className="dashboard-chip rounded-full px-3 py-1 text-xs font-semibold text-[#607766]">
                Abrir módulo
              </span>
            </div>
            <p className="display-font text-xl font-semibold text-[#173424]">{title}</p>
            <p className="mt-3 text-sm leading-7 text-[#5f7766]">{copy}</p>
            <Link
              href={href}
              className="mt-5 inline-flex rounded-full border border-[#cfe0d0] bg-[#f8fcf8] px-4 py-2 text-sm font-semibold text-[#1d3a29] transition hover:border-[#8abf93] hover:bg-white"
            >
              {cta}
            </Link>
          </div>
        ))}
      </section>

      <section className="dashboard-card-strong rounded-[2rem] p-6 sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2d8a4b]">
              Direção da experiência
            </p>
            <h2 className="display-font mt-3 text-2xl font-semibold tracking-tight text-[#173424]">
              O painel foi refinado para priorizar ação rápida em telas menores.
            </h2>
          </div>
          <div className="rounded-[1.3rem] border border-[#cde0d0] bg-white px-4 py-3 text-sm text-[#5a7361]">
            Próxima camada: métricas mais fortes, automações e conexão real
          </div>
        </div>
      </section>
    </div>
  );
}
