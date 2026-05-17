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
    <section className="dashboard-card rounded-[2rem] p-6 transition duration-200 hover:shadow-[0_16px_32px_rgba(0,0,0,0.05)] sm:p-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2d8a4b]">
            Checklist de ativação
          </p>
          <h2 className="display-font mt-3 text-2xl font-semibold tracking-tight text-[#173424]">
            Acompanhe o que falta para o canal ficar pronto.
          </h2>
        </div>
        <div className="dashboard-chip rounded-[1.2rem] px-4 py-3 text-sm font-semibold text-[#2d8a4b]">
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
        {items.map((item, index) => (
          <div
            key={item.label}
            className={`flex items-start gap-3 rounded-[1.3rem] border p-4 text-sm transition duration-200 hover:-translate-y-0.5 ${
              item.done
                ? "border-[#d7ead9] bg-[linear-gradient(135deg,#effcf1_0%,#e2f7e7_100%)] text-[#30563d]"
                : "border-[#e5e9e5] bg-[rgba(255,255,255,0.82)] text-[#607766]"
            }`}
          >
            <span
              className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                item.done
                  ? "bg-[#d8f1de] text-[#2d8a4b]"
                  : "bg-[#f2f5f2] text-[#6d8271]"
              }`}
            >
              {item.done ? "✓" : `0${index + 1}`}
            </span>
            <div>
              <p className="font-semibold">{item.done ? "Concluído" : "Pendente"}</p>
              <p className="mt-1 leading-6">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
