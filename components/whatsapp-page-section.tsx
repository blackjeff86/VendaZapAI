import { WhatsappConfigForm } from "@/components/whatsapp-config-form";
import { WhatsappActivationChecklist } from "@/components/whatsapp-activation-checklist";
import { WhatsappWebhookTesterForm } from "@/components/whatsapp-webhook-tester-form";

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
        <div className="rounded-[2rem] border border-[#d9e8db] bg-white p-6 shadow-[0_20px_48px_rgba(26,74,43,0.06)] sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2d8a4b]">
            Canal do WhatsApp
          </p>
          <h1 className="display-font mt-4 text-2xl font-semibold tracking-tight text-[#173424] sm:text-3xl">
            Prepare a integração do canal e teste a entrada de mensagens.
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
              className="rounded-[1.6rem] border border-[#d9e6da] bg-[#fbfefb] p-5 shadow-[0_14px_32px_rgba(26,74,43,0.04)]"
            >
              <p className="display-font text-lg font-semibold text-[#173424]">{title}</p>
              <p className="mt-3 text-base font-medium text-[#2d8a4b] break-words">
                {value}
              </p>
              <p className="mt-3 text-sm leading-7 text-[#5f7766]">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-[#dce8dd] bg-white p-6 shadow-[0_18px_44px_rgba(26,74,43,0.05)] sm:p-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2d8a4b]">
              Webhook local
            </p>
            <h2 className="display-font mt-3 text-2xl font-semibold tracking-tight text-[#173424]">
              Teste mensagens de entrada sem depender ainda da Meta.
            </h2>
          </div>
          <div className="rounded-[1.2rem] border border-[#d7e5d8] bg-[#f6fbf6] px-4 py-3 text-sm text-[#597260]">
            Endpoint: /api/whatsapp/webhook
          </div>
        </div>

        <div className="mt-5 rounded-[1.2rem] border border-[#dce8dd] bg-[#f8fcf8] p-4 text-sm leading-7 text-[#58705f]">
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
