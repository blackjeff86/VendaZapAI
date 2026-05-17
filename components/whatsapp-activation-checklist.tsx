type WhatsappActivationChecklistProps = {
  businessPhoneId?: string;
  connected?: boolean;
  displayNumber?: string;
  webhookReady?: boolean;
};

export function WhatsappActivationChecklist({
  businessPhoneId,
  connected,
  displayNumber,
  webhookReady,
}: WhatsappActivationChecklistProps) {
  const items = [
    {
      done: Boolean(displayNumber),
      label: "Informar o número exibido no WhatsApp",
    },
    {
      done: Boolean(businessPhoneId),
      label: "Cadastrar o Business Phone ID",
    },
    {
      done: Boolean(webhookReady),
      label: "Marcar o webhook como preparado",
    },
    {
      done: Boolean(connected),
      label: "Confirmar que o canal está conectado",
    },
  ];

  const completedCount = items.filter((item) => item.done).length;
  const progress = Math.round((completedCount / items.length) * 100);

  return (
    <section className="rounded-[2rem] border border-[#dce8dd] bg-white p-6 shadow-[0_18px_44px_rgba(26,74,43,0.05)] sm:p-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2d8a4b]">
            Checklist de ativação
          </p>
          <h2 className="display-font mt-3 text-2xl font-semibold tracking-tight text-[#173424]">
            Acompanhe o que falta para o canal ficar pronto.
          </h2>
        </div>
        <div className="rounded-[1.2rem] border border-[#d7e5d8] bg-[#f6fbf6] px-4 py-3 text-sm font-semibold text-[#2d8a4b]">
          {completedCount}/{items.length} concluído • {progress}%
        </div>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#e7f0e8]">
        <div
          className="h-full rounded-full bg-[#2d8a4b] transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className={`rounded-[1.2rem] border p-4 text-sm ${
              item.done
                ? "border-[#d7ead9] bg-[#f5fbf5] text-[#30563d]"
                : "border-[#e5e9e5] bg-[#fbfdfb] text-[#607766]"
            }`}
          >
            <span className="font-semibold">{item.done ? "Concluído" : "Pendente"}</span>{" "}
            • {item.label}
          </div>
        ))}
      </div>
    </section>
  );
}
