# Backlog de Execucao - MVP VendaZap AI

## Objetivo do Documento

Este backlog transforma a estrategia do produto em frentes praticas de execucao.

Ele deve ajudar a responder:

- o que precisa ser feito agora;
- o que vem depois;
- o que depende de outra etapa;
- o que ja pode ser tratado como backlog futuro.

## Como Ler Este Backlog

Prioridades:

- P0 = essencial para o MVP funcionar
- P1 = importante para fortalecer o MVP
- P2 = importante para a evolucao comercial e operacional

Status sugeridos:

- nao iniciado
- em andamento
- pronto para fazer
- bloqueado
- concluido

## Bloco 1 - Aquisicao e Validacao Comercial

### P0 - Landing page de conversao

- headline final e copy principal
- CTA funcional
- simulacao do fluxo no WhatsApp
- secoes de beneficios
- FAQ
- captura de leads

### P0 - Captura real de leads

- formulario conectado a banco ou ferramenta
- armazenamento de nome, email, loja e nicho
- mensagem de confirmacao
- resolver bloqueio atual do Supabase antes da persistencia real
- criar tabela de leads no Supabase
- conectar o formulario da landing ao banco quando a infraestrutura estiver liberada

### P1 - Estrutura comercial inicial

- pagina ou mensagem de lista de espera
- definicao de nichos prioritarios
- roteiro basico para conversar com leads

## Bloco 2 - Fundacao do SaaS

### P0 - Estrutura do projeto

- base Next.js organizada
- convencoes de pastas
- configuracoes de ambiente
- preparacao para deploy

### P0 - Autenticacao

- cadastro
- login
- logout
- protecao de rotas

### P0 - Multi-tenant

- entidade loja
- relacao usuario x loja
- isolamento de dados por tenant

### P1 - Onboarding inicial

- nome da loja
- nicho
- dados basicos
- fluxo de primeiro acesso

## Bloco 3 - Catalogo e Estoque

### P0 - Cadastro manual de produtos

- criar produto
- editar produto
- listar produtos
- excluir ou inativar produto

### P0 - Estoque basico

- quantidade disponivel
- atualizacao de estoque
- status de disponibilidade

### P1 - Busca e filtros

- busca por nome
- busca por categoria
- busca por compatibilidade

### P1 - Estrutura para nicho motopecas

- campo de compatibilidade
- observacoes tecnicas
- base para ano e modelo

## Bloco 4 - WhatsApp e Conversas

### P0 - Conexao com WhatsApp Cloud API

- configuracao de credenciais
- webhook
- recebimento de mensagens
- validacao basica da integracao

### P0 - Registro de conversas

- criar conversa por cliente
- armazenar mensagens
- manter historico minimo
- status da conversa

### P1 - Painel de conversas

- lista de conversas
- status visivel
- historico
- ordenacao por prioridade

## Bloco 5 - Motor de IA

### P0 - Interpretacao inicial

- detectar intencao
- identificar pedido de produto
- detectar falta de informacao

### P0 - Perguntas complementares

- pedir ano, modelo, cor, voltagem ou contexto quando necessario
- evitar respostas sem base

### P0 - Consulta de estoque

- buscar produto relevante
- validar disponibilidade
- retornar preco e contexto

### P0 - Resposta automatica

- tom natural
- resposta objetiva
- tentativa de avancar a conversa

### P1 - Regras de seguranca

- evitar alucinacao
- fallback para humano
- limitar resposta em casos ambiguos

## Bloco 6 - Reserva e Fluxo Comercial

### P0 - Criacao de reserva

- vincular produto
- vincular conversa
- quantidade
- status da reserva

### P0 - Atualizacao do painel

- exibir reserva no painel
- exibir conversa reservada
- registrar data e status

### P1 - Notificacao ao lojista

- aviso interno
- destaque de conversa quente

## Bloco 7 - Operacao do Lojista

### P0 - Assumir atendimento humano

- botao para assumir conversa
- interrupcao da IA naquela conversa
- historico preservado

### P1 - Painel inicial

- resumo de conversas
- resumo de reservas
- atalhos rapidos

### P1 - Melhorias mobile

- fluxo rapido no celular
- leitura simples
- acoes principais acessiveis

## Bloco 8 - Validacao com Pilotos

### P0 - Selecao de pilotos

- definir quantidade inicial
- definir nicho principal
- priorizar lojas com uso real de WhatsApp

### P0 - Onboarding assistido

- cadastrar primeiros clientes
- acompanhar configuracao
- observar uso real

### P0 - Coleta de feedback

- principais dores
- erros da IA
- dificuldade de uso
- valor percebido

### P1 - Ajustes rapidos

- corrigir gargalos da IA
- corrigir gargalos de UX
- simplificar onboarding

## Bloco 9 - Fortalecimento do Produto

### P1 - Importacao CSV

- modelo de planilha
- upload
- validacao de campos
- importacao de produtos

### P1 - Historico de clientes

- consolidar conversas por cliente
- mostrar interacoes anteriores

### P1 - Produtos similares

- sugerir alternativa
- melhorar continuidade da venda

### P1 - Fotos de produtos

- anexar imagem
- usar imagem no painel e no futuro na conversa

### P1 - Interpretacao de audio no WhatsApp

- receber audio enviado pelo cliente
- transcrever audio para texto
- usar a transcricao no mesmo fluxo de interpretacao da IA
- identificar pedido de produto, contexto e informacoes faltantes
- mostrar no painel que a mensagem original foi audio

### P1 - Notificacoes internas

- destaque de atendimento
- alerta de reserva
- alerta de conversa aguardando humano

## Bloco 10 - Comercial e Precificacao

### P0 - Definicao da oferta inicial

- texto comercial do MVP
- promessa principal
- o que nao prometer

### P0 - Faixa de preco piloto

- decidir valor inicial
- decidir se havera setup
- decidir condicoes beta

### P1 - Estrutura de planos

- piloto
- basico
- pro
- avancado

### P1 - Materiais de venda

- pagina de planos
- argumento de valor
- roteiro de demonstracao

## Ordem Recomendada de Execucao

1. landing page e captura real
2. autenticacao
3. multi-tenant
4. onboarding inicial
5. cadastro de produtos
6. estoque basico
7. painel de conversas
8. integracao WhatsApp
9. motor de IA
10. reserva
11. assumir atendimento humano
12. pilotos
13. importacao CSV
14. historico de clientes
15. planos comerciais

## Definicao de MVP Pronto

O MVP estara pronto quando uma loja piloto conseguir:

1. criar conta;
2. cadastrar produtos;
3. conectar o WhatsApp;
4. receber mensagens reais;
5. deixar a IA responder casos simples;
6. consultar estoque dentro do fluxo;
7. gerar reserva;
8. assumir atendimento humano;
9. perceber valor real no uso.

## Proxima Camada de Backlog

Depois deste backlog, o passo natural e quebrar cada bloco em:

- epicos;
- historias de usuario;
- tarefas tecnicas;
- criterios de aceite.
