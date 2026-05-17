const benefits = [
  {
    title: "Responda antes da venda esfriar",
    copy: "O cliente chama, a IA entende o contexto e responde em segundos para sua loja não perder o timing da conversa.",
  },
  {
    title: "Consulte estoque sem chute",
    copy: "Nada de resposta genérica. O sistema cruza produto, compatibilidade, preço e disponibilidade antes de responder.",
  },
  {
    title: "Atenda mesmo com a equipe ocupada",
    copy: "Sua loja continua tirando dúvidas, filtrando pedidos e levando a conversa para reserva mesmo fora do balcão.",
  },
  {
    title: "Automatize sem parecer robô",
    copy: "Tom natural, perguntas certas e transferência para humano quando a conversa pede atenção comercial.",
  },
];

const proofItems = [
  ["37", "atendimentos respondidos hoje"],
  ["12", "reservas automáticas em andamento"],
  ["< 1 min", "para a primeira resposta"],
];

const steps = [
  {
    index: "01",
    title: "A IA entende o pedido",
    description:
      "Ela identifica intenção, produto procurado e o que ainda falta descobrir antes de responder.",
  },
  {
    index: "02",
    title: "Pergunta só o necessário",
    description:
      "Ano, modelo, cor, voltagem ou compatibilidade. Só o que realmente importa para acertar a oferta.",
  },
  {
    index: "03",
    title: "Consulta e empurra a venda",
    description:
      "Busca estoque, preço e promoção, responde com naturalidade e tenta avançar para reserva ou fechamento.",
  },
];

const niches = [
  {
    name: "Motopeças",
    copy: "Compatibilidade, urgência e alto volume de perguntas pelo WhatsApp.",
  },
  {
    name: "Autopeças",
    copy: "Consultas técnicas e pressão por resposta rápida para não perder a venda.",
  },
  {
    name: "Lojas de celular",
    copy: "Preço, cor, memória, acessórios e disponibilidade em conversas repetitivas.",
  },
  {
    name: "Material de construção",
    copy: "Atendimento consultivo, cotação e confirmação de itens sem travar a operação.",
  },
];

const testimonials = [
  {
    name: "Carlos, motopeças",
    quote:
      "Se isso já responder compatibilidade e separar peça, pra mim deixa de ser ferramenta e vira vendedor.",
  },
  {
    name: "Juliana, loja de celular",
    quote:
      "O diferencial é não parecer automação fria. Parece atendimento de verdade, só que muito mais rápido.",
  },
  {
    name: "Rafael, autopeças",
    quote:
      "O que mais me interessa é não perder cliente por demora. Se levar a conversa até reserva, já faz muito sentido.",
  },
];

const faqs = [
  {
    question: "O VendaZap AI é um chatbot tradicional?",
    answer:
      "Não. O VendaZap AI foi pensado para agir como vendedor, não como robô de menu. Ele entende contexto, faz perguntas e conduz a conversa para a venda.",
  },
  {
    question: "Preciso ter ERP ou integração pronta para começar?",
    answer:
      "Não. No MVP, sua loja já pode começar com cadastro manual de produtos e estoque básico para validar o uso rápido.",
  },
  {
    question: "A IA responde tudo sozinha?",
    answer:
      "Ela responde os casos mais recorrentes com base no catálogo e nas regras da loja. Quando a conversa exige negociação ou atenção humana, o lojista pode assumir.",
  },
  {
    question: "Serve só para motopeças?",
    answer:
      "Motopeças é o foco inicial porque a dor é mais forte, mas a estrutura do produto também atende outros varejos que vendem pelo WhatsApp todos os dias.",
  },
];

export default function Home() {
  return (
    <main className="pb-24">
      <section className="relative overflow-hidden">
        <div className="noise-overlay absolute inset-0 -z-20" />
        <div className="absolute inset-0 -z-10 bg-grid bg-[size:38px_38px] opacity-[0.07]" />
        <div className="absolute left-1/2 top-28 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-whatsapp/12 blur-3xl" />

        <div className="container-shell pt-6 sm:pt-8">
          <div className="glass-card soft-rise flex items-center justify-between rounded-full px-4 py-3 text-xs text-white/68 sm:px-5">
            <div className="flex items-center gap-3">
              <span className="display-font text-sm font-semibold text-white">VendaZap AI</span>
              <span className="hidden h-1.5 w-1.5 rounded-full bg-whatsapp sm:block" />
              <span className="hidden sm:block">Vendedor inteligente para WhatsApp</span>
            </div>
            <span className="rounded-full bg-whatsapp/15 px-3 py-1 text-whatsapp">
              Beta para lojistas brasileiros
            </span>
          </div>

          <div className="grid gap-12 pb-16 pt-10 sm:pb-24 sm:pt-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div>
              <div className="soft-rise inline-flex rounded-full border border-whatsapp/30 bg-whatsapp/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-mint">
                Responda mais rápido. Venda mais. Perca menos clientes.
              </div>
              <h1 className="display-font soft-rise-delay mt-6 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl lg:text-[5.4rem]">
                Transforme seu WhatsApp em um vendedor que responde na hora.
              </h1>
              <p className="soft-rise-delay mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
                O VendaZap AI responde clientes, consulta estoque, tira dúvidas
                e leva a conversa para a reserva sem depender do vendedor estar
                disponível naquele momento.
              </p>

              <div className="soft-rise-delay-2 mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#cta"
                  className="inline-flex items-center justify-center rounded-full bg-whatsapp px-6 py-3.5 text-sm font-semibold text-[#041108] transition hover:scale-[1.01] hover:bg-mint"
                >
                  Quero testar primeiro
                </a>
                <a
                  href="#demo"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/8"
                >
                  Ver como funciona
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {proofItems.map(([value, label]) => (
                  <div key={label} className="rounded-[1.5rem] border border-white/8 bg-white/[0.04] p-4">
                    <p className="display-font text-2xl font-semibold text-white">{value}</p>
                    <p className="mt-2 text-sm leading-6 text-white/60">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3 text-xs text-white/48 sm:text-sm">
                <span className="rounded-full border border-white/10 px-3 py-2">Motopeças</span>
                <span className="rounded-full border border-white/10 px-3 py-2">Autopeças</span>
                <span className="rounded-full border border-white/10 px-3 py-2">Lojas de celular</span>
                <span className="rounded-full border border-white/10 px-3 py-2">Material de construção</span>
              </div>
            </div>

            <div id="demo" className="relative hero-orbit">
              <div className="absolute -right-8 top-8 h-32 w-32 rounded-full border border-lime/25 bg-lime/10 blur-2xl" />
              <div className="absolute -left-10 bottom-10 h-36 w-36 rounded-full border border-sky-300/10 bg-sky-300/10 blur-3xl" />
              <div className="glass-card relative overflow-hidden rounded-[2rem] p-4 shadow-glow sm:p-5">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />
                <div className="relative rounded-[1.6rem] border border-white/8 bg-[#09130f] p-4 sm:p-5">
                  <div className="flex items-center justify-between border-b border-white/8 pb-4">
                    <div>
                      <p className="text-sm font-semibold text-white">Fluxo de venda no WhatsApp</p>
                      <p className="mt-1 text-xs text-white/48">Simulação do atendimento do VendaZap AI</p>
                    </div>
                    <div className="rounded-full bg-whatsapp/15 px-3 py-1 text-xs font-medium text-whatsapp">
                      Ativo agora
                    </div>
                  </div>

                  <div className="space-y-4 py-5 text-sm leading-6">
                    <div className="max-w-[82%] rounded-2xl rounded-bl-md bg-white/8 px-4 py-3 text-white/88">
                      Boa tarde, vocês têm correia da XRE 300?
                    </div>
                    <div className="ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-whatsapp px-4 py-3 text-[#06200f]">
                      Boa tarde 😊 Temos alguns modelos compatíveis com a XRE 300.
                      Você sabe me informar o ano da sua moto?
                    </div>
                    <div className="max-w-[46%] rounded-2xl rounded-bl-md bg-white/8 px-4 py-3 text-white/88">
                      2020
                    </div>
                    <div className="rounded-[1.2rem] border border-white/8 bg-black/20 p-3">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-white/35">
                        Busca interna
                      </p>
                      <p className="mt-2 text-xs text-white/62">
                        Produto compatível encontrado • Estoque: 4 unidades • Promoção PIX ativa
                      </p>
                    </div>
                    <div className="ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-whatsapp px-4 py-3 text-[#06200f]">
                      Temos sim 😊 Correia Gates compatível com XRE 300 2020 por
                      R$189,90. Hoje ela está com 10% OFF no PIX. Posso deixar
                      separada pra retirada?
                    </div>
                    <div className="max-w-[48%] rounded-2xl rounded-bl-md bg-white/8 px-4 py-3 text-white/88">
                      Pode separar
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-[1.25rem] border border-lime/20 bg-lime/10 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-lime">
                        Reserva criada
                      </p>
                      <p className="mt-2 text-sm text-white/84">
                        Item separado, conversa salva e lojista notificado para finalizar o atendimento.
                      </p>
                    </div>
                    <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.03] p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/42">
                        Conversa
                      </p>
                      <p className="mt-2 text-sm text-white/78">Status: reservada</p>
                      <p className="mt-1 text-sm text-white/78">Prioridade: quente</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell mt-8 sm:mt-10">
        <div className="grid gap-4 lg:grid-cols-4">
          {benefits.map((item) => (
            <div key={item.title} className="glass-card rounded-[1.7rem] p-6">
              <p className="display-font text-xl font-semibold text-white">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-white/66">{item.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell mt-24">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <h2 className="section-title">O produto foi desenhado para vender, não só para responder.</h2>
            <p className="section-copy">
              Em vez de devolver respostas frias, o VendaZap AI empurra a
              conversa para frente com lógica comercial: entende a intenção,
              reduz atrito e tenta transformar interesse em reserva.
            </p>
          </div>

          <div className="grid gap-4">
            {steps.map((step) => (
              <div key={step.title} className="glass-card rounded-[1.8rem] p-6">
                <div className="flex items-start gap-4">
                  <span className="display-font rounded-2xl bg-whatsapp/15 px-4 py-3 text-sm font-semibold text-whatsapp">
                    {step.index}
                  </span>
                  <div>
                    <h3 className="display-font text-xl font-semibold text-white">{step.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/68">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell mt-24">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="glass-card rounded-[2rem] p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.6rem] border border-red-400/20 bg-red-400/10 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-red-200">Antes</p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-white/74">
                  <li>Cliente esperando resposta por horas</li>
                  <li>Mensagens esquecidas na correria</li>
                  <li>Atendimento travado em perguntas repetidas</li>
                  <li>Vendas perdidas por demora ou desorganização</li>
                </ul>
              </div>
              <div className="rounded-[1.6rem] border border-whatsapp/20 bg-whatsapp/10 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-mint">Depois</p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-white/80">
                  <li>Respostas rápidas e contextualizadas</li>
                  <li>Consulta de estoque sem depender do vendedor</li>
                  <li>Reserva automática para não esfriar o cliente</li>
                  <li>Humano entra só nos casos que pedem atenção</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="section-title">Seu WhatsApp deixa de ser gargalo e volta a vender.</h2>
            <p className="section-copy">
              Sua loja não precisa de um CRM gigante nem de automação engessada.
              Precisa responder melhor, organizar o atendimento e proteger as
              vendas que hoje se perdem na demora.
            </p>
          </div>
        </div>
      </section>

      <section className="container-shell mt-24">
        <div className="grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
          <div>
            <h2 className="section-title">Perfeito para lojas que dependem do WhatsApp para vender todos os dias.</h2>
            <p className="section-copy">
              Começamos onde a dor é mais forte: varejo com atendimento
              repetitivo, pressão por resposta rápida e catálogo que exige
              contexto.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {niches.map((niche) => (
                <div key={niche.name} className="rounded-[1.6rem] border border-white/8 bg-white/[0.03] p-5">
                  <p className="display-font text-lg font-semibold text-white">{niche.name}</p>
                  <p className="mt-3 text-sm leading-7 text-white/66">{niche.copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-[2rem] p-5 sm:p-6">
            <div className="rounded-[1.6rem] border border-white/8 bg-[#09120f] p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Painel do lojista</p>
                  <p className="mt-1 text-xs text-white/48">Operação enxuta, pensada para usar no celular</p>
                </div>
                <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">
                  Hoje
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/42">Conversas</p>
                  <div className="mt-4 space-y-3">
                    {[
                      ["XRE 300 2020", "Reserva pendente", "Quente"],
                      ["Kit relação Titan", "Aguardando dados", "IA"],
                      ["Capacete Pro Tork", "Em atendimento humano", "Humano"],
                    ].map(([client, status, tag]) => (
                      <div key={client} className="rounded-2xl border border-white/8 px-4 py-3">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-medium text-white">{client}</p>
                          <span className="rounded-full bg-white/8 px-2.5 py-1 text-[11px] text-white/62">
                            {tag}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-white/52">{status}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-[1.25rem] border border-whatsapp/12 bg-whatsapp/10 p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-mint">Atendimentos</p>
                    <p className="display-font mt-3 text-3xl font-semibold text-white">37</p>
                    <p className="mt-1 text-sm text-white/65">respondidos hoje</p>
                  </div>
                  <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/45">Reservas</p>
                    <p className="display-font mt-3 text-3xl font-semibold text-white">12</p>
                    <p className="mt-1 text-sm text-white/65">produtos separados</p>
                  </div>
                  <div className="rounded-[1.25rem] border border-lime/15 bg-lime/10 p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-lime">Destaque</p>
                    <p className="mt-3 text-sm leading-7 text-white/80">
                      A IA já sabe quando precisa pedir ano, modelo, cor ou compatibilidade antes de vender.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell mt-24">
        <h2 className="section-title">Quem vende pelo WhatsApp entende o valor disso na hora.</h2>
        <p className="section-copy">
          Estes depoimentos ainda são ilustrativos, mas refletem exatamente a
          percepção que queremos gerar: utilidade real, tom humano e impacto em
          vendas.
        </p>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="glass-card rounded-[1.75rem] p-6">
              <p className="text-sm leading-7 text-white/76">“{item.quote}”</p>
              <p className="mt-5 text-sm font-semibold text-white">{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="cta" className="container-shell mt-24">
        <div className="relative overflow-hidden rounded-[2rem] border border-whatsapp/20 bg-[radial-gradient(circle_at_top_left,rgba(37,211,102,0.18),transparent_22%),linear-gradient(135deg,#102219_0%,#0a120e_52%,#08100d_100%)] px-6 py-10 sm:px-10 sm:py-12">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-lime/10 blur-3xl" />
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-mint">
                Entre primeiro
              </p>
              <h2 className="display-font mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Sua loja pode começar a vender mais no WhatsApp sem aumentar a equipe.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72 sm:text-base">
                Entre na lista para receber acesso antecipado, demonstração e as
                primeiras condições comerciais do lançamento.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-black/20 px-5 py-4 text-sm text-white/70">
              <p className="text-white">Primeiros nichos</p>
              <p className="mt-2">Motopeças • Autopeças • Lojas de celular</p>
            </div>
          </div>

          <form className="mt-8 grid gap-3 sm:max-w-4xl sm:grid-cols-[1fr_1fr_1fr_auto]">
            <input
              type="text"
              placeholder="Nome"
              className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm text-white outline-none placeholder:text-white/35"
            />
            <input
              type="text"
              placeholder="Nome da loja"
              className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm text-white outline-none placeholder:text-white/35"
            />
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm text-white outline-none placeholder:text-white/35"
            />
            <button
              type="submit"
              className="rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-[#041108] transition hover:bg-mint"
            >
              Quero meu acesso
            </button>
          </form>
        </div>
      </section>

      <section className="container-shell mt-24">
        <div className="max-w-3xl">
          <h2 className="section-title">Perguntas frequentes</h2>
          <p className="section-copy">
            O objetivo aqui é eliminar objeções cedo e deixar claro que o
            produto foi feito para vender mais, não para complicar a operação.
          </p>
        </div>
        <div className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="glass-card rounded-[1.5rem] p-5 sm:p-6">
              <h3 className="text-base font-semibold text-white">{faq.question}</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
