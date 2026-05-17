import { WhatsappConfigForm } from "@/components/whatsapp-config-form";
import { WhatsappActivationChecklist } from "@/components/whatsapp-activation-checklist";
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

  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M6 9.5h12" strokeLinecap="round" />
      <path d="M9 14h6" strokeLinecap="round" />
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
  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-1">
        <h1 className="text-[1.6rem] font-bold tracking-[-0.03em] text-[#191c1d]">
          Ajustes do WhatsApp
        </h1>
        <p className="text-sm text-[#3c4a3f]">
          Configure o canal, valide o webhook e prepare a operação real.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3">
        {[
          [
            "Canal conectado",
            currentUser?.whatsappConnected ? "Sim" : "Não",
          ],
          [
            "Webhook",
            currentUser?.whatsappWebhookReady ? "Pronto" : "Pendente",
          ],
          [
            "Número",
            currentUser?.whatsappDisplayNumber || "Pendente",
          ],
          [
            "Phone ID",
            currentUser?.whatsappBusinessPhoneId || "Pendente",
          ],
        ].map(([title, value]) => (
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

      <section className="dashboard-card rounded-xl border border-[#bacbbc]/30 p-4">
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

      <section className="dashboard-card rounded-xl border border-[#bacbbc]/30 p-4">
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

      <WhatsappActivationChecklist
        businessPhoneId={currentUser?.whatsappBusinessPhoneId}
        connected={currentUser?.whatsappConnected}
        displayNumber={currentUser?.whatsappDisplayNumber}
        webhookReady={currentUser?.whatsappWebhookReady}
      />
    </div>
  );
}
