# VendaZap AI

## Visao Geral

O VendaZap AI e uma plataforma SaaS para pequenos e medios lojistas brasileiros venderem mais pelo WhatsApp com ajuda de Inteligencia Artificial.

A proposta central nao e oferecer um chatbot generico nem um sistema complexo de automacao. O produto deve funcionar como um vendedor inteligente, capaz de conversar com naturalidade, entender o que o cliente quer, consultar informacoes da loja e conduzir o atendimento com foco em conversao.

Mensagem principal da marca:

"Venda mais no WhatsApp sem perder clientes."

## Problema Que o Produto Resolve

Muitas lojas no Brasil usam o WhatsApp como principal canal de vendas, mas enfrentam gargalos diarios:

- demora para responder;
- mensagens esquecidas;
- atendentes ocupados;
- perguntas repetitivas;
- perda de vendas por falta de velocidade;
- dificuldade para organizar reservas e retornos;
- atendimento inconsistente entre vendedores.

O VendaZap AI nasce para reduzir esse caos operacional sem obrigar o lojista a aprender uma ferramenta dificil.

## Proposta de Valor

O produto deve permitir que a loja:

- responda clientes mais rapido;
- atenda 24h com mais contexto;
- consulte estoque durante a conversa;
- informe preco e promocao automaticamente;
- faca reserva de produtos;
- encaminhe para humano quando necessario;
- aumente conversao no canal que o cliente ja usa.

## Posicionamento

O VendaZap AI nao deve parecer:

- chatbot barato;
- CRM complicado;
- ERP;
- ferramenta corporativa fria;
- automacao tecnica para especialistas.

O VendaZap AI deve parecer:

- simples;
- humano;
- moderno;
- confiavel;
- orientado a vendas;
- feito para lojistas brasileiros.

## Publico-Alvo Inicial

O foco inicial deve ser em operacoes que dependem fortemente do WhatsApp e recebem muitas perguntas repetitivas.

Prioridade de nichos:

1. Motopecas
2. Autopecas
3. Lojas de celular
4. Material de construcao
5. Informatica
6. Pequenos comercios locais com catalogo consultivo

Motivos para priorizar motopecas:

- alto volume de perguntas tecnicas;
- necessidade frequente de compatibilidade;
- urgencia no atendimento;
- forte uso de WhatsApp como canal comercial;
- boa oportunidade de reserva rapida de itens.

## Como o Produto Deve Funcionar

### Principio central

A IA deve atuar como um vendedor experiente no WhatsApp da loja.

Ela precisa:

- interpretar mensagens recebidas;
- identificar intencao do cliente;
- entender contexto da conversa;
- detectar informacoes faltantes;
- fazer perguntas objetivas;
- consultar estoque;
- responder com naturalidade;
- usar precos e promocoes;
- sugerir reserva;
- transferir para um humano quando fizer sentido.

### Exemplo de fluxo

Cliente pergunta por um produto.

A IA:

1. entende a busca;
2. identifica informacoes faltantes;
3. pergunta o minimo necessario;
4. consulta estoque;
5. responde com disponibilidade, preco e oferta;
6. tenta avancar para reserva ou fechamento;
7. registra a conversa e notifica a loja quando preciso.

## Experiencia Esperada

### Para o cliente final da loja

- conversa natural;
- resposta rapida;
- menos friccao;
- sensacao de atendimento humano;
- clareza sobre disponibilidade e preco.

### Para o lojista

- painel simples;
- pouca curva de aprendizado;
- controle basico de produtos e estoque;
- visao das conversas;
- possibilidade de assumir atendimento;
- mais organizacao operacional;
- uso confortavel no celular.

## Escopo do Produto

### Landing page

Objetivo:

- gerar leads;
- captar interesse;
- validar demanda;
- agendar demos;
- construir autoridade.

### Aplicacao SaaS

Escopo inicial esperado:

- autenticacao;
- onboarding simples;
- ambiente multi-tenant;
- cadastro de produtos;
- estoque basico;
- conexao com WhatsApp;
- painel de conversas;
- regras de reserva;
- operacao assistida por IA.

## Arquitetura de Produto

### Modelo de negocio

- SaaS por assinatura;
- onboarding simples;
- foco em baixo atrito de entrada;
- expansao futura por planos e modulos.

### Estrutura multi-tenant

Cada lojista precisa operar em ambiente isolado, com separacao de:

- usuarios;
- catalogo;
- estoque;
- conversas;
- reservas;
- configuracoes;
- integracoes.

## Stack Tecnologica Base

Frontend:

- Next.js
- React
- Tailwind CSS
- abordagem mobile-first

Backend:

- Next.js API Routes

Banco:

- PostgreSQL
- Supabase

Hospedagem:

- Vercel

IA:

- Gemini API inicialmente
- arquitetura preparada para OpenAI no futuro

Canal:

- Meta WhatsApp Cloud API

## Modulos Principais do Sistema

### 1. Landing page

Responsavel por aquisicao e validacao comercial.

### 2. Autenticacao e acesso

Cadastro, login e organizacao da conta da loja.

### 3. Cadastro de produtos

Entrada manual inicial de catalogo, preco, estoque e dados relevantes.

### 4. Motor de atendimento com IA

Camada que interpreta mensagem, contexto, intencao e proximo passo da conversa.

### 5. Consulta de estoque

Busca dados do produto e ajuda a IA a responder com seguranca.

### 6. Reserva de produtos

Registra interesse do cliente e separacao do item.

### 7. Painel de conversas

Permite acompanhar atendimento, assumir conversa e visualizar historico.

### 8. Configuracoes da loja

Dados basicos da operacao, horarios, politicas e parametros.

## Diretrizes de UX e Marca

O produto deve seguir estas regras:

- linguagem humana;
- interface simples;
- foco em conversao;
- poucos passos por fluxo;
- mobile-first de verdade;
- visual premium, mas acessivel;
- nada com cara de sistema pesado.

### Regra importante de produto

O VendaZap AI deve ser pensado como mobile-first em toda a experiencia do sistema, nao apenas na landing page.

Isso significa:

- painel interno desenhado primeiro para celular;
- acoes principais acessiveis com poucos toques;
- leitura simples em telas menores;
- formularios curtos e objetivos;
- hierarquia visual clara para uso rapido no dia a dia do lojista.

### Referencias visuais

- Linear
- Vercel
- Stripe
- Ramp

Adaptacao:

- mais calor brasileiro;
- mais clareza comercial;
- menos tom corporativo frio.

## Fases do Produto

### MVP Fase 1

- landing page;
- cadastro e login;
- painel simples;
- cadastro manual de produtos;
- estoque basico;
- conexao WhatsApp;
- IA interpretando mensagens;
- IA perguntando informacoes faltantes;
- consulta de estoque;
- resposta automatica;
- reserva de produtos;
- painel de conversas;
- atendimento humano assumir conversa.

### MVP Fase 2

- importacao CSV;
- promocoes automaticas;
- historico de clientes;
- analytics basicos;
- multiplos vendedores;
- notificacoes internas;
- produtos similares;
- fotos de produtos.

### Visao futura

- integracao Tiny ERP;
- integracao Bling;
- integracao Omie;
- pagamentos PIX;
- IA treinada no catalogo da loja;
- recuperacao de carrinho;
- campanhas automaticas;
- upsell e cross-sell;
- dashboard de vendas;
- metricas de conversao;
- multi-loja;
- multi-unidades;
- audio no WhatsApp;
- IA por voz;
- integracao Instagram Direct.

## Criterios de Sucesso

No curto prazo, o projeto deve provar:

- interesse real de lojistas;
- capacidade de gerar leads;
- reducao de tempo de resposta;
- aumento de organizacao no atendimento;
- viabilidade do fluxo de consulta e reserva.

No medio prazo, deve provar:

- ganho de conversao;
- reducao de vendas perdidas;
- recorrencia de uso;
- facilidade de onboarding;
- potencial de expansao por nicho.

## Principios para Tomada de Decisao

Sempre que houver duvida entre complexidade e clareza, priorizar:

1. simplicidade;
2. velocidade de validacao;
3. experiencia mobile;
4. linguagem humana;
5. fluxo comercial;
6. facilidade para o lojista;
7. base escalavel sem excesso de engenharia no inicio.
