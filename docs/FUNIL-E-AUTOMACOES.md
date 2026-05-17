# Funil e Automações - MVP VendaZap AI

## Objetivo

Este documento define como o VendaZap AI deve tratar as conversas comerciais no MVP.

Ele existe para alinhar:

- fluxo comercial;
- estados da conversa;
- automações da IA;
- momento de entrada do humano;
- preparação para mensagens em texto e áudio.

## Princípio central

O VendaZap AI não deve funcionar como um chatbot genérico.

Ele deve funcionar como um vendedor operacional dentro do WhatsApp, ajudando a loja a:

- responder rápido;
- entender o que o cliente quer;
- consultar catálogo e estoque;
- avançar a conversa;
- reservar;
- encaminhar para humano quando necessário.

## O que pode iniciar uma conversa

Uma conversa pode começar por:

- mensagem de texto;
- áudio;
- combinação de texto e áudio.

Também precisamos suportar o cenário em que:

- o cliente começa digitando;
- depois manda áudio;
- depois volta para texto.

Ou seja, o sistema precisa ser multimodal desde a lógica do funil, mesmo que a integração completa de áudio venha depois.

## Regra para áudio

Quando o cliente mandar áudio, o comportamento esperado é:

1. receber o evento;
2. identificar que o conteúdo é áudio;
3. transcrever;
4. usar a transcrição como entrada da mesma inteligência usada no texto;
5. manter no histórico que a origem foi áudio;
6. responder normalmente com base no contexto da conversa.

No MVP inicial, o produto pode estar:

- preparado estruturalmente para áudio;
- mesmo antes da transcrição real estar conectada em produção.

## Funil comercial proposto para o MVP

### 1. Novo contato

Cenário:

- cliente acabou de chegar;
- ainda não sabemos claramente o que ele quer;
- pode vir de anúncio, indicação, link do WhatsApp ou retorno de cliente.

Objetivo:

- responder rápido;
- identificar intenção;
- não deixar a conversa esfriar no primeiro contato.

### 2. Qualificação

Cenário:

- já sabemos que existe interesse;
- ainda faltam dados essenciais para responder com segurança.

Exemplos:

- ano da moto;
- modelo;
- versão;
- marca da peça;
- necessidade específica.

Objetivo:

- coletar o mínimo necessário;
- evitar pergunta repetida;
- preparar o terreno para oferta.

### 3. Oferta enviada

Cenário:

- a IA encontrou produto ou alternativa plausível;
- já consegue responder com preço, disponibilidade e contexto.

Objetivo:

- apresentar uma resposta comercial clara;
- gerar confiança;
- puxar o cliente para reserva ou fechamento.

### 4. Negociação

Cenário:

- cliente pediu desconto;
- perguntou entrega, prazo, nota, garantia, condição especial;
- há sensibilidade comercial.

Objetivo:

- impedir promessa errada;
- escalar para humano ou regra comercial;
- manter o cliente aquecido.

### 5. Reserva em andamento

Cenário:

- cliente quer separar o item;
- já existe intenção forte de compra.

Objetivo:

- coletar nome para retirada;
- coletar horário ou janela;
- registrar reserva;
- refletir no painel.

### 6. Fechado

Cenário:

- reserva confirmada;
- pedido concluído;
- conversa comercial resolvida.

Objetivo:

- registrar fechamento;
- deixar base para histórico;
- preparar pós-venda depois.

### 7. Parado

Cenário:

- cliente não respondeu;
- a conversa perdeu tração;
- ficou sem próximo passo claro.

Objetivo:

- permitir follow-up;
- evitar perda silenciosa;
- sinalizar oportunidade fria.

## Automações por status

### Novo contato

Automação:

- classificar intenção inicial;
- marcar urgência;
- gerar primeira resposta;
- criar conversa com dono certo.

### Qualificação

Automação:

- descobrir o dado faltante;
- perguntar apenas o próximo dado necessário;
- não reiniciar a coleta do zero.

### Oferta enviada

Automação:

- sugerir item principal;
- mostrar preço;
- informar estoque;
- sugerir reserva;
- sugerir alternativa quando possível.

### Negociação

Automação:

- marcar conversa como sensível;
- avisar que depende de validação;
- acionar humano quando necessário;
- não conceder desconto automaticamente.

### Reserva em andamento

Automação:

- pedir nome;
- pedir horário;
- registrar item reservado;
- registrar evento na timeline;
- atualizar prioridade.

### Fechado

Automação:

- registrar a conclusão;
- manter histórico pronto para recorrência;
- permitir leitura futura de conversão.

Sinais automáticos aceitos no MVP:

- conversa reservada com mensagem do cliente indicando agradecimento e retirada;
- mensagens com termos claros como `pedido concluído`, `venda concluída`, `pagamento confirmado`, `fechado`.

### Parado

Automação:

- sinalizar que a conversa esfriou;
- deixar pronto para follow-up manual ou automático depois.

Sinal automático aceito no MVP:

- última mensagem enviada pela loja ou pela IA;
- ausência de retorno do cliente por pelo menos 12 horas;
- não estar em reserva nem em atendimento humano.

## Cenários obrigatórios do MVP

- cliente manda texto curto pedindo peça;
- cliente manda texto sem informar ano/modelo;
- cliente manda texto com contexto completo;
- cliente começa com áudio;
- cliente começa com texto e depois manda áudio;
- cliente pede desconto;
- cliente pede reserva;
- cliente pede humano;
- produto existe com estoque normal;
- produto existe com estoque baixo;
- produto existe sem estoque;
- não existe correspondência clara no catálogo;
- cliente some depois da oferta.

## Regras de escalonamento para humano

Encaminhar para humano quando houver:

- pedido explícito por humano;
- desconto;
- garantia;
- entrega;
- boleto;
- nota fiscal;
- caso ambíguo demais;
- necessidade de validação comercial.

## Regra de convivência entre IA e humano

Quando o atendimento humano assumir a conversa:

- a IA para de responder ao cliente;
- a IA pode continuar só como apoio interno;
- novas mensagens do cliente continuam entrando no histórico;
- mas não disparam resposta automática;
- a conversa só volta para a IA quando o vendedor mudar isso dentro do sistema.

## Regra para vendedor respondendo no próprio WhatsApp

Se o vendedor responder o cliente usando o mesmo número conectado à WhatsApp Cloud API, o comportamento desejado é:

1. o sistema identificar que a mensagem saiu do número comercial;
2. a conversa mudar automaticamente para `em_atendimento_humano`;
3. a IA ser pausada naquela conversa;
4. o sistema tentar registrar essa saída como mensagem humana no histórico quando o webhook trouxer o conteúdo;
5. o retorno para IA acontecer apenas por ação manual dentro do painel.

Observação:

isso depende de receber no webhook os eventos de saída do próprio número comercial.

Se a integração disponibilizar esses eventos, o VendaZap AI deve usar essa informação para ativar automaticamente o handoff humano.

## Estrutura mínima de leitura operacional no painel

Cada conversa deve expor:

- estágio da venda;
- urgência;
- foco operacional;
- próxima ação;
- status da conversa;
- histórico;
- se veio por texto ou áudio.

## O que entra agora

- estados comerciais claros;
- leitura operacional por conversa;
- preparação estrutural para entrada de áudio;
- automação por status;
- painel refletindo estágio e urgência.

## O que pode vir depois

- follow-up automático por tempo parado;
- pontuação de lead;
- playbooks por nicho;
- recuperação automática de conversas frias;
- automação de áudio em produção real;
- campanhas com base em estágio do funil.
