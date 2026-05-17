# Roadmap do VendaZap AI

## Objetivo do Roadmap

Este roadmap existe para dar ordem de construcao ao projeto, evitando dispersao e garantindo que cada etapa valide um risco real antes da proxima.

Logica principal:

- primeiro validar interesse;
- depois validar operacao;
- depois validar retencao;
- por fim escalar com integracoes e inteligencia comercial.

## Principios de Priorizacao

Antes de construir qualquer funcionalidade, precisamos perguntar:

1. Isso ajuda a vender o produto?
2. Isso ajuda o lojista a operar melhor?
3. Isso reduz risco do negocio ou do produto?
4. Isso pode esperar ate depois da validacao inicial?

Se algo nao ajudar validacao, conversao ou operacao do MVP, provavelmente nao e prioridade agora.

## Fase 0 - Fundacao e Direcao

Objetivo:

definir claramente o que estamos construindo, para quem e com qual ordem.

Entregas:

- documento de visao do produto;
- roadmap por fases;
- definicao do posicionamento;
- definicao do publico-alvo inicial;
- definicao do stack base;
- definicao dos modulos do MVP;
- diretrizes de UX, copy e marca.

Resultado esperado:

- clareza para tomar decisoes sem reinventar o projeto a cada etapa.

## Fase 1 - Landing Page e Captura de Interesse

Objetivo:

validar interesse comercial e comecar a formar base de leads.

Entregas:

- landing page premium;
- copy focada em dores e beneficios;
- hero forte com proposta clara;
- demonstracao simulada do fluxo no WhatsApp;
- secoes de beneficios, nichos, FAQ e CTA;
- formulario de captura de leads;
- estrutura pronta para analytics basico.

Hipoteses validadas:

- lojistas entendem a proposta rapidamente;
- a mensagem "vender mais no WhatsApp" gera interesse;
- existe curiosidade suficiente para lista de espera ou demo.

Metricas sugeridas:

- taxa de clique no CTA;
- taxa de envio do formulario;
- origem do trafego;
- nicho dos leads captados.

## Fase 2 - Base SaaS e Estrutura Multi-Tenant

Objetivo:

criar a espinha dorsal do sistema sem ainda entrar em integracoes complexas.

Entregas:

- autenticacao;
- onboarding inicial;
- modelagem multi-tenant;
- estrutura de usuarios e lojas;
- painel base;
- configuracoes iniciais da conta;
- protecao de rotas;
- convencoes de projeto e arquitetura.

Hipoteses validadas:

- conseguimos estruturar um produto escalavel desde o inicio;
- o lojista consegue acessar e entender o ambiente sem friccao excessiva.

Metricas sugeridas:

- taxa de conclusao de cadastro;
- tempo medio de onboarding;
- pontos de abandono no primeiro acesso.

## Fase 3 - Catalogo e Estoque Basico

Objetivo:

dar base operacional minima para a IA responder com dados reais.

Entregas:

- cadastro manual de produtos;
- campos essenciais por item;
- controle de estoque basico;
- busca simples por produto;
- status de disponibilidade;
- estrutura inicial para compatibilidade tecnica em nichos como motopecas.

Hipoteses validadas:

- o lojista aceita cadastrar produtos manualmente no inicio;
- o sistema consegue responder consultas com um minimo de confianca.

Metricas sugeridas:

- numero de produtos cadastrados por loja;
- tempo para primeiro catalogo ativo;
- taxa de estoque consultado com sucesso.

## Fase 4 - Conexao WhatsApp e Motor de Conversa

Objetivo:

fazer o produto cumprir sua promessa principal: responder clientes no WhatsApp com inteligencia.

Entregas:

- integracao com Meta WhatsApp Cloud API;
- recebimento de mensagens;
- historico por conversa;
- interpretacao de intencao;
- deteccao de informacoes faltantes;
- fluxo de perguntas complementares;
- respostas com contexto;
- fallback para humano.

Hipoteses validadas:

- a IA consegue conduzir dialogos uteis;
- a loja confia no atendimento automatizado em casos recorrentes;
- o produto reduz tempo de resposta real.

Metricas sugeridas:

- tempo medio de primeira resposta;
- percentual de conversas resolvidas sem humano;
- percentual de conversas transferidas;
- satisfacao qualitativa dos lojistas piloto.

## Fase 5 - Reserva de Produtos e Fluxo Comercial

Objetivo:

transformar atendimento em acao comercial concreta.

Entregas:

- criacao de reserva;
- atualizacao de status da conversa;
- notificacao ao lojista;
- visualizacao de reservas no painel;
- trilha de auditoria basica da interacao.

Hipoteses validadas:

- a automacao gera valor real quando avanca o funil;
- reserva automatica reduz perda de vendas.

Metricas sugeridas:

- numero de reservas geradas;
- taxa de conversao por conversa;
- percentual de reservas atendidas pela loja.

## Fase 6 - Painel Operacional do Lojista

Objetivo:

dar controle simples sobre conversas, reservas e acompanhamento diario.

Entregas:

- lista de conversas;
- filtros por status;
- visualizacao de atendimento em andamento;
- botao para assumir conversa;
- painel simples com indicadores principais;
- historico de interacoes.

Hipoteses validadas:

- o lojista consegue operar sem depender de treinamento intenso;
- o painel melhora organizacao e confianca no sistema.

Metricas sugeridas:

- frequencia de uso do painel;
- tempo para assumir conversa;
- numero de interacoes revisadas por lojista.

## Fase 7 - Validacao Assistida com Clientes Piloto

Objetivo:

rodar com poucos clientes reais para aprender rapido e corrigir os gargalos centrais.

Entregas:

- onboarding assistido;
- selecao de nichos piloto;
- acompanhamento manual das conversas;
- coleta de feedback;
- ajustes de copy, UX e logica de IA;
- definicao dos primeiros planos comerciais.

Hipoteses validadas:

- existe valor percebido suficiente para cobrar;
- o fluxo central funciona no mundo real;
- sabemos o que mais trava a expansao.

Metricas sugeridas:

- taxa de ativacao;
- uso semanal;
- qualidade das conversas;
- interesse em continuar pagando;
- principais objeções dos pilotos.

## Fase 8 - Melhorias do MVP Fase 2

Objetivo:

aumentar utilidade operacional sem perder simplicidade.

Entregas:

- importacao CSV;
- promocoes automaticas;
- historico de clientes;
- analytics basicos;
- multiplos vendedores;
- notificacoes internas;
- produtos similares;
- fotos de produtos.

Hipoteses validadas:

- essas melhorias aumentam adocao e retencao;
- a operacao do lojista fica mais fluida com pouca complexidade extra.

## Fase 9 - Escala e Integracoes

Objetivo:

reduzir trabalho manual e ampliar o valor estrategico do produto.

Entregas:

- integracoes com ERP;
- pagamentos PIX;
- inteligencia comercial;
- campanhas;
- recuperacao de carrinho;
- metricas avancadas;
- multi-loja e multi-unidade.

Hipoteses validadas:

- o produto pode expandir ticket;
- o sistema ganha profundidade sem perder identidade;
- integracoes aumentam barreira competitiva.

## Ordem Recomendada de Execucao Imediata

Para manter logica e foco, a ordem mais saudavel agora e:

1. documentacao do produto;
2. documentacao do roadmap;
3. refinamento da landing page;
4. captura real de leads;
5. modelagem multi-tenant;
6. autenticacao e onboarding;
7. catalogo e estoque;
8. integracao com WhatsApp;
9. motor de conversa com IA;
10. reservas e painel operacional.

## O Que Nao Deve Vir Agora

Itens importantes, mas nao prioritarios para o momento atual:

- integracao com ERP no inicio;
- dashboard complexo;
- automacoes muito avancadas;
- audio e voz;
- multiplas unidades;
- campanhas complexas;
- customizacoes profundas por nicho antes de validar o basico.

## Definicao de Pronto por Etapa

Cada fase deve ser considerada pronta quando:

- a entrega principal funciona de ponta a ponta;
- a UX esta clara o suficiente para teste real;
- o fluxo tem o minimo de confiabilidade;
- existe aprendizado concreto para orientar a proxima fase.

## Riscos Principais do Projeto

### Risco 1 - parecer chatbot barato

Mitigacao:

- copy correta;
- UX premium;
- foco em vendas, nao em automacao generica;
- respostas naturais e contextuais.

### Risco 2 - excesso de complexidade cedo demais

Mitigacao:

- priorizar MVP enxuto;
- evitar integracoes pesadas no comeco;
- validar primeiro com fluxo manual onde necessario.

### Risco 3 - IA responder sem contexto suficiente

Mitigacao:

- exigir perguntas complementares quando faltarem dados;
- limitar automacao em casos ambiguos;
- criar escape facil para atendimento humano.

### Risco 4 - lojista nao conseguir alimentar o sistema

Mitigacao:

- cadastro simples;
- importacao CSV em seguida;
- foco em poucos campos essenciais por produto no inicio.

## Norte de Produto

Se em algum momento surgirem muitas ideias concorrentes, voltar sempre para esta pergunta:

"Isso ajuda a loja a vender mais no WhatsApp sem perder clientes?"

Se a resposta for fraca, provavelmente nao e prioridade agora.
