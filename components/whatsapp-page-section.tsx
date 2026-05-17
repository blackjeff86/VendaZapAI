import { WhatsappActivationChecklist } from "@/components/whatsapp-activation-checklist";
import { WhatsappConfigForm } from "@/components/whatsapp-config-form";
import { WhatsappWebhookTesterForm } from "@/components/whatsapp-webhook-tester-form";

function WhatsappInfoIcon({ title }: { title: string }) {
  const common = "h-[1rem] w-[1rem]";

  if (title === "Canal conectado") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.9">
        <path d="m7 12 3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="8" />
      </svg>
    );
  }

  if (title === "Webhook") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.9">
        <path d="M7 9.5a4.5 4.5 0 1 1 7.5 3.3L13 14.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 14.5a4.5 4.5 0 1 1-7.5 3.3L11 16.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (title === "Número") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.9">
        <path d="M7.5 6.5h9" strokeLinecap="round" />
        <path d="M7.5 12h9" strokeLinecap="round" />
        <path d="M9.5 17.5h5" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.9">
      <rect x="6" y="6" width="12" height="12" rx="2.5" />
      <path d="M9.5 9.5h5" strokeLinecap="round" />
      <path d="M9.5 14.5h5" strokeLinecap="round" />
    </svg>
  );
}

type WhatsappPageSectionProps = {
  currentUser: {
    whatsappAccessTokenHint?: string;
    whatsappBusinessPhoneId?: string;
    whatsappConnected?: boolean;
    whatsappDisplayNumber?: string;
    whatsappWebhookReady?: boolean;
  } | null;
};

export function WhatsappPageSection({
  currentUser,
}: WhatsappPageSectionProps) {
  const metrics = [
    ["Canal conectado", currentUser?.whatsappConnected ? "Sim" : "Não"],
    ["Webhook", currentUser?.whatsappWebhookReady ? "Pronto" : "Pendente"],
    ["Número", currentUser?.whatsappDisplayNumber || "Pendente"],
    ["Phone ID", currentUser?.whatsappBusinessPhoneId || "Pendente"],
  ] as const;

  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-1 md:hidden">
        <h1 className="text-[1.6rem] font-bold tracking-[-0.03em] text-[#191c1d]">
          Ajustes do WhatsApp
        </h1>
        <p className="text-sm text-[#3c4a3f]">
          Configure o canal, valide o webhook e prepare a operação real.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3 md:hidden">
        {metrics.map(([title, value]) => (
          <div
            key={title}
            className="dashboard-card rounded-xl border border-[#bacbbc]/30 p-4"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#3c4a3f]">
                {title}
              </p>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#f2f4f5] text-[#006d3e]">
                <WhatsappInfoIcon title={title} />
              </span>
            </div>
            <p className="break-words text-sm font-bold text-[#191c1d]">{value}</p>
          </div>
        ))}
      </section>

      <section className="dashboard-card rounded-xl border border-[#bacbbc]/30 p-4 md:hidden">
        <div className="mb-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#006d3e]">
            Configuração do canal
          </p>
          <h2 className="mt-1 text-lg font-bold text-[#191c1d]">
            Dados da integração
          </h2>
        </div>

        <WhatsappConfigForm
          initialDisplayNumber={currentUser?.whatsappDisplayNumber}
          initialBusinessPhoneId={currentUser?.whatsappBusinessPhoneId}
          initialAccessTokenHint={currentUser?.whatsappAccessTokenHint}
          initialConnected={Boolean(currentUser?.whatsappConnected)}
          initialWebhookReady={Boolean(currentUser?.whatsappWebhookReady)}
        />
      </section>

      <section className="dashboard-card rounded-xl border border-[#bacbbc]/30 p-4 md:hidden">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#006d3e]">
              Webhook local
            </p>
            <h2 className="mt-1 text-lg font-bold text-[#191c1d]">
              Teste a entrada de mensagens
            </h2>
          </div>
          <div className="rounded-full bg-[#e6e8e9] px-3 py-1 text-[11px] font-semibold text-[#3c4a3f]">
            /api/whatsapp/webhook
          </div>
        </div>

        <WhatsappWebhookTesterForm
          businessPhoneId={currentUser?.whatsappBusinessPhoneId}
          initialDisplayNumber={currentUser?.whatsappDisplayNumber}
        />
      </section>

      <div className="md:hidden">
        <WhatsappActivationChecklist
          businessPhoneId={currentUser?.whatsappBusinessPhoneId}
          connected={currentUser?.whatsappConnected}
          displayNumber={currentUser?.whatsappDisplayNumber}
          webhookReady={currentUser?.whatsappWebhookReady}
        />
      </div>

      <section className="hidden space-y-6 md:block">
        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-3 rounded-2xl border border-[#bbcbb9]/20 bg-white p-6 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6c7b6b]">
              Canal conectado
            </p>
            <h3 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-[#111c2d]">
              {currentUser?.whatsappConnected ? "Sim" : "Não"}
            </h3>
            <p className="mt-2 text-xs font-semibold text-[#006d2f]">
              Status do número principal
            </p>
          </div>

          <div className="col-span-3 rounded-2xl border border-[#bbcbb9]/20 bg-white p-6 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6c7b6b]">
              Webhook
            </p>
            <h3 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-[#111c2d]">
              {currentUser?.whatsappWebhookReady ? "Pronto" : "Pendente"}
            </h3>
            <p className="mt-2 text-xs font-semibold text-[#006b5f]">
              Rota pronta para receber mensagens
            </p>
          </div>

          <div className="col-span-3 rounded-2xl border border-[#bbcbb9]/20 bg-white p-6 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6c7b6b]">
              Número exibido
            </p>
            <h3 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-[#111c2d]">
              {currentUser?.whatsappDisplayNumber || "Pendente"}
            </h3>
            <p className="mt-2 text-xs font-semibold text-[#93492e]">
              Identidade visível da loja
            </p>
          </div>

          <div className="col-span-3 flex items-center justify-between rounded-2xl bg-[#006d2f] p-6 text-white shadow-md">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/80">
              Canal oficial
            </p>
            <h4 className="mt-2 text-xl font-semibold">WhatsApp pronto para vender</h4>
            <p className="mt-2 text-sm text-white/80">
                Deixe a IA responder com mais segurança e contexto.
              </p>
            </div>
            <span className="text-5xl opacity-20">✦</span>
          </div>
        </section>

        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-8 rounded-2xl border border-[#bbcbb9]/20 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#006d2f]">
                  Configuração do canal
                </p>
                <h3 className="mt-1 text-xl font-semibold text-[#111c2d]">
                  Dados da integração oficial
                </h3>
                <p className="mt-1 text-sm text-[#3c4a3d]">
                  Preencha número exibido, phone ID e status do canal para preparar a operação real.
                </p>
              </div>

              <span className="rounded-full bg-[#e7eeff] px-4 py-2 text-xs font-semibold text-[#006d2f]">
                Meta Cloud API
              </span>
            </div>

            <div className="mt-6">
              <WhatsappConfigForm
                initialDisplayNumber={currentUser?.whatsappDisplayNumber}
                initialBusinessPhoneId={currentUser?.whatsappBusinessPhoneId}
                initialAccessTokenHint={currentUser?.whatsappAccessTokenHint}
                initialConnected={Boolean(currentUser?.whatsappConnected)}
                initialWebhookReady={Boolean(currentUser?.whatsappWebhookReady)}
              />
            </div>
          </div>

          <div className="col-span-4 flex flex-col gap-6">
            <div className="rounded-2xl border border-[#bbcbb9]/20 bg-white p-6 shadow-sm">
              <h4 className="text-xl font-semibold text-[#111c2d]">Leitura operacional</h4>
              <div className="mt-5 space-y-4">
                <div className="border-l-2 border-[#006d2f] pl-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#006d2f]">
                    Canal ativo
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#3c4a3d]">
                    Quando o número e o webhook estiverem corretos, a IA pode processar as mensagens com contexto.
                  </p>
                </div>
                <div className="border-l-2 border-[#006b5f] pl-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#006b5f]">
                    Validacao
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#3c4a3d]">
                    Use o teste local para simular mensagens antes da conexão final com a Meta.
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#006b5f] via-[#25d366] to-[#3B82F6] p-6 text-white shadow-lg">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/80">
                VendaZap Insight
              </p>
              <p className="mt-2 text-lg font-semibold">
                Um canal bem configurado reduz falhas, acelera respostas e deixa a operação pronta para escalar.
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-7 rounded-2xl border border-[#bbcbb9]/20 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#006d2f]">
                  Webhook local
                </p>
                <h3 className="mt-1 text-xl font-semibold text-[#111c2d]">
                  Teste a entrada de mensagens
                </h3>
                <p className="mt-1 text-sm text-[#3c4a3d]">
                  Simule mensagens no mesmo endpoint que vai receber os eventos do WhatsApp oficial.
                </p>
              </div>

              <span className="rounded-full bg-[#f0f3ff] px-4 py-2 text-xs font-semibold text-[#3c4a3d]">
                /api/whatsapp/webhook
              </span>
            </div>

            <div className="mt-6">
              <WhatsappWebhookTesterForm
                businessPhoneId={currentUser?.whatsappBusinessPhoneId}
                initialDisplayNumber={currentUser?.whatsappDisplayNumber}
              />
            </div>
          </div>

          <div className="col-span-5">
            <WhatsappActivationChecklist
              businessPhoneId={currentUser?.whatsappBusinessPhoneId}
              connected={currentUser?.whatsappConnected}
              displayNumber={currentUser?.whatsappDisplayNumber}
              webhookReady={currentUser?.whatsappWebhookReady}
            />
          </div>
        </section>
      </section>
    </div>
  );
}
