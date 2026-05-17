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
      <path d="M6 5h12a1.5 1.5 0 0 1 1.5 1.5v11A1.5 1.5 0 0 1 18 19H6a1.5 1.5 0 0 1-1.5-1.5v-11A1.5 1.5 0 0 1 6 5Z" strokeLinecap="round" strokeLinejoin="round" />
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
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1fr_0.92fr]">
        <div className="dashboard-card-strong rounded-[2rem] p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2d8a4b]">
            Canal do WhatsApp
          </p>
          <h1 className="display-font mt-4 text-2xl font-semibold tracking-tight text-[#173424] sm:text-3xl">
            Deixe o canal pronto para receber mensagens sem improviso.
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#5d7564]">
            Esta área concentra a configuração do WhatsApp Cloud API e o
            simulador que envia mensagens para a mesma rota que vamos usar na
            operação real.
          </p>

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

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {[
            [
              "Canal conectado",
              currentUser?.whatsappConnected ? "Sim" : "Ainda não",
              "Marca se o número já está pronto para operação real.",
            ],
            [
              "Webhook",
              currentUser?.whatsappWebhookReady ? "Preparado" : "Pendente",
              "Indica se a base do recebimento já foi configurada.",
            ],
            [
              "Phone Number ID",
              currentUser?.whatsappBusinessPhoneId || "Pendente",
              "Chave usada para vincular as mensagens à loja correta.",
            ],
          ].map(([title, value, copy]) => (
            <div
              key={title}
              className={`rounded-[1.7rem] border p-5 shadow-[0_14px_32px_rgba(26,74,43,0.07)] ${
                title === "Canal conectado"
                  ? "dashboard-tint-green border-[#bfe5c7]"
                  : title === "Webhook"
                    ? "dashboard-tint-cyan border-[#cae2df]"
                    : "dashboard-card border-[#d9e6da]"
              }`}
            >
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-[1rem] bg-[rgba(255,255,255,0.72)] text-[#2d8a4b]">
                <WhatsappInfoIcon title={title} />
              </span>
              <p className="display-font text-lg font-semibold text-[#173424]">{title}</p>
              <p className="mt-3 text-base font-medium text-[#2d8a4b] break-words">
                {value}
              </p>
              <p className="mt-3 text-sm leading-7 text-[#5f7766]">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="dashboard-card rounded-[2rem] p-6 sm:p-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2d8a4b]">
              Webhook local
            </p>
            <h2 className="display-font mt-3 text-2xl font-semibold tracking-tight text-[#173424]">
              Teste mensagens de entrada sem depender ainda da Meta.
            </h2>
          </div>
          <div className="dashboard-chip rounded-[1.2rem] px-4 py-3 text-sm text-[#597260]">
            Endpoint: /api/whatsapp/webhook
          </div>
        </div>

        <div className="dashboard-tint-emerald mt-5 rounded-[1.4rem] border border-[#dce8dd] p-4 text-sm leading-7 text-[#58705f]">
          Quando formos conectar a Cloud API de verdade, essa mesma rota já
          poderá receber a verificação do webhook e as mensagens de entrada da loja.
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
