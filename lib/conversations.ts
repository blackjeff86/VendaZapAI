import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { resolveDataFilePath } from "@/lib/storage-path";

export type ConversationStatus =
  | "nova"
  | "aguardando_dados"
  | "respondida_pela_ia"
  | "aguardando_humano"
  | "em_atendimento_humano"
  | "reservada";

export type MessageAuthor = "cliente" | "ia" | "humano" | "sistema";

export type StoredMessage = {
  author: MessageAuthor;
  content: string;
  id: string;
  timestamp: string;
};

export type StoredConversation = {
  clientName: string;
  clientPhone: string;
  id: string;
  messages: StoredMessage[];
  priorityLabel: "Quente" | "Médio" | "Humano";
  reservedProduct?: string;
  reservedPickupName?: string;
  reservedPickupWindow?: string;
  status: ConversationStatus;
  updatedAt: string;
  userId: string;
};

export type ConversationMessageInput = {
  author: MessageAuthor;
  content: string;
  userId: string;
};

export type ConversationReservationInput = {
  pickupName: string;
  pickupWindow: string;
  productName: string;
  userId: string;
};

function resolveConversationsFilePath() {
  return resolveDataFilePath(
    process.env.CONVERSATIONS_FILE_PATH,
    "conversations.json",
  );
}

async function readConversations(): Promise<StoredConversation[]> {
  const filePath = resolveConversationsFilePath();

  try {
    const fileContent = await readFile(filePath, "utf8");
    const parsed = JSON.parse(fileContent) as StoredConversation[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    const code =
      typeof error === "object" && error && "code" in error
        ? String((error as { code?: string }).code)
        : "";

    if (code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

async function writeConversations(conversations: StoredConversation[]) {
  const filePath = resolveConversationsFilePath();
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(conversations, null, 2), "utf8");
}

function buildSeedConversations(userId: string): StoredConversation[] {
  const now = new Date();
  const minutesAgo = (minutes: number) =>
    new Date(now.getTime() - minutes * 60_000).toISOString();

  return [
    {
      id: randomUUID(),
      userId,
      clientName: "Carlos XRE 300",
      clientPhone: "11987654321",
      status: "reservada",
      priorityLabel: "Quente",
      reservedProduct: "Correia Gates XRE 300 2020",
      updatedAt: minutesAgo(6),
      messages: [
        {
          id: randomUUID(),
          author: "cliente",
          content: "Boa tarde, vocês têm correia da XRE 300?",
          timestamp: minutesAgo(12),
        },
        {
          id: randomUUID(),
          author: "ia",
          content: "Boa tarde 😊 Você sabe me informar o ano da moto?",
          timestamp: minutesAgo(11),
        },
        {
          id: randomUUID(),
          author: "cliente",
          content: "2020",
          timestamp: minutesAgo(10),
        },
        {
          id: randomUUID(),
          author: "ia",
          content:
            "Temos sim 😊 Correia Gates compatível com XRE 300 2020 por R$189,90. Posso deixar separada?",
          timestamp: minutesAgo(8),
        },
      ],
    },
    {
      id: randomUUID(),
      userId,
      clientName: "Juliana Titan",
      clientPhone: "11999887766",
      status: "aguardando_dados",
      priorityLabel: "Médio",
      updatedAt: minutesAgo(18),
      messages: [
        {
          id: randomUUID(),
          author: "cliente",
          content: "Tem kit relação pra Titan?",
          timestamp: minutesAgo(20),
        },
        {
          id: randomUUID(),
          author: "ia",
          content: "Temos algumas opções 😊 Você consegue me dizer o ano da moto?",
          timestamp: minutesAgo(18),
        },
      ],
    },
    {
      id: randomUUID(),
      userId,
      clientName: "Rafael Capacete",
      clientPhone: "11995554433",
      status: "em_atendimento_humano",
      priorityLabel: "Humano",
      updatedAt: minutesAgo(35),
      messages: [
        {
          id: randomUUID(),
          author: "cliente",
          content: "Consegue melhorar no preço desse capacete?",
          timestamp: minutesAgo(40),
        },
        {
          id: randomUUID(),
          author: "sistema",
          content: "Conversa direcionada para atendimento humano.",
          timestamp: minutesAgo(35),
        },
      ],
    },
  ];
}

async function ensureSeedConversations(userId: string) {
  const conversations = await readConversations();
  const hasUserConversation = conversations.some((item) => item.userId === userId);

  if (hasUserConversation) {
    return conversations;
  }

  const seeded = [...conversations, ...buildSeedConversations(userId)];
  await writeConversations(seeded);
  return seeded;
}

export async function listConversationsByUserId(userId: string) {
  const seeded = await ensureSeedConversations(userId);
  return seeded
    .filter((conversation) => conversation.userId === userId)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getConversationById(conversationId: string, userId: string) {
  const seeded = await ensureSeedConversations(userId);
  return (
    seeded.find(
      (conversation) =>
        conversation.id === conversationId && conversation.userId === userId,
    ) ?? null
  );
}

function inferPriorityFromStatus(status: ConversationStatus) {
  if (status === "em_atendimento_humano") {
    return "Humano" as const;
  }

  if (status === "reservada") {
    return "Quente" as const;
  }

  return "Médio" as const;
}

export async function appendConversationMessage(
  conversationId: string,
  input: ConversationMessageInput,
) {
  const normalizedContent = input.content.trim();

  if (normalizedContent.length < 2) {
    throw new Error("Informe a mensagem da conversa.");
  }

  const conversations = await readConversations();
  const conversationIndex = conversations.findIndex(
    (item) => item.id === conversationId && item.userId === input.userId,
  );

  if (conversationIndex === -1) {
    throw new Error("Conversa não encontrada.");
  }

  const currentConversation = conversations[conversationIndex];
  const nextStatus: ConversationStatus =
    currentConversation.status === "reservada"
      ? "reservada"
      : input.author === "cliente"
        ? "nova"
        : input.author === "ia"
          ? "respondida_pela_ia"
          : input.author === "humano"
            ? "em_atendimento_humano"
            : currentConversation.status;

  const updatedConversation: StoredConversation = {
    ...currentConversation,
    status: nextStatus,
    priorityLabel: inferPriorityFromStatus(nextStatus),
    updatedAt: new Date().toISOString(),
    messages: [
      ...currentConversation.messages,
      {
        id: randomUUID(),
        author: input.author,
        content: normalizedContent,
        timestamp: new Date().toISOString(),
      },
    ],
  };

  conversations[conversationIndex] = updatedConversation;
  await writeConversations(conversations);

  return updatedConversation;
}

export async function reserveConversationProduct(
  conversationId: string,
  input: ConversationReservationInput,
) {
  const normalizedProductName = input.productName.trim();
  const normalizedPickupName = input.pickupName.trim();
  const normalizedPickupWindow = input.pickupWindow.trim();

  if (!normalizedProductName) {
    throw new Error("Produto inválido para reserva.");
  }

  if (normalizedPickupName.length < 2) {
    throw new Error("Informe o nome para retirada.");
  }

  if (normalizedPickupWindow.length < 2) {
    throw new Error("Informe o horário ou período de retirada.");
  }

  const conversations = await readConversations();
  const conversationIndex = conversations.findIndex(
    (item) => item.id === conversationId && item.userId === input.userId,
  );

  if (conversationIndex === -1) {
    throw new Error("Conversa não encontrada.");
  }

  const currentConversation = conversations[conversationIndex];
  const timestamp = new Date().toISOString();

  const updatedConversation: StoredConversation = {
    ...currentConversation,
    reservedProduct: normalizedProductName,
    reservedPickupName: normalizedPickupName,
    reservedPickupWindow: normalizedPickupWindow,
    status: "reservada",
    priorityLabel: "Quente",
    updatedAt: timestamp,
    messages: [
      ...currentConversation.messages,
      {
        id: randomUUID(),
        author: "sistema",
        content: `Reserva criada para ${normalizedProductName} em nome de ${normalizedPickupName}.`,
        timestamp,
      },
      {
        id: randomUUID(),
        author: "ia",
        content:
          `Perfeito 😊 Já deixei separado por aqui no nome de ${normalizedPickupName} para ${normalizedPickupWindow}.`,
        timestamp,
      },
    ],
  };

  conversations[conversationIndex] = updatedConversation;
  await writeConversations(conversations);

  return updatedConversation;
}

export async function findConversationByClientPhone(clientPhone: string, userId: string) {
  const seeded = await ensureSeedConversations(userId);
  const normalizedPhone = clientPhone.trim();

  return (
    seeded.find(
      (conversation) =>
        conversation.userId === userId &&
        conversation.clientPhone.trim() === normalizedPhone,
    ) ?? null
  );
}

export async function createIncomingConversation(params: {
  clientName?: string;
  clientPhone: string;
  content: string;
  userId: string;
}) {
  const normalizedPhone = params.clientPhone.trim();
  const normalizedContent = params.content.trim();

  if (!normalizedPhone || !normalizedContent) {
    throw new Error("Dados inválidos para criar a conversa.");
  }

  const conversations = await ensureSeedConversations(params.userId);
  const timestamp = new Date().toISOString();

  const newConversation: StoredConversation = {
    id: randomUUID(),
    userId: params.userId,
    clientName: params.clientName?.trim() || normalizedPhone,
    clientPhone: normalizedPhone,
    status: "nova",
    priorityLabel: "Médio",
    updatedAt: timestamp,
    messages: [
      {
        id: randomUUID(),
        author: "cliente",
        content: normalizedContent,
        timestamp,
      },
    ],
  };

  const updatedConversations = [...conversations, newConversation];
  await writeConversations(updatedConversations);

  return newConversation;
}

export async function updateConversationHandoff(
  conversationId: string,
  userId: string,
  humanActive: boolean,
) {
  const conversations = await readConversations();
  const conversationIndex = conversations.findIndex(
    (item) => item.id === conversationId && item.userId === userId,
  );

  if (conversationIndex === -1) {
    throw new Error("Conversa não encontrada.");
  }

  const currentConversation = conversations[conversationIndex];
  const newStatus: ConversationStatus = humanActive
    ? "em_atendimento_humano"
    : currentConversation.reservedProduct
      ? "reservada"
      : "respondida_pela_ia";

  const updatedConversation: StoredConversation = {
    ...currentConversation,
    priorityLabel: humanActive ? "Humano" : currentConversation.priorityLabel,
    status: newStatus,
    updatedAt: new Date().toISOString(),
    messages: [
      ...currentConversation.messages,
      {
        id: randomUUID(),
        author: "sistema",
        content: humanActive
          ? "Atendimento assumido manualmente pela loja."
          : "Atendimento devolvido para o fluxo assistido.",
        timestamp: new Date().toISOString(),
      },
    ],
  };

  conversations[conversationIndex] = updatedConversation;
  await writeConversations(conversations);

  return updatedConversation;
}
