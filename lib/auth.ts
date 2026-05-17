import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export const AUTH_COOKIE_NAME = "vendazap_session";

type StoredUser = {
  createdAt: string;
  email: string;
  id: string;
  niche?: string;
  name: string;
  onboardingCompleted?: boolean;
  passwordHash: string;
  phone?: string;
  storeName: string;
  whatsappAccessTokenHint?: string;
  whatsappBusinessPhoneId?: string;
  whatsappConnected?: boolean;
  whatsappDisplayNumber?: string;
  whatsappWebhookReady?: boolean;
  whatsappNumber?: string;
};

type SessionPayload = {
  email: string;
  name: string;
  storeName: string;
  userId: string;
};

export type RegisterInput = {
  email: string;
  name: string;
  password: string;
  storeName: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type StoreProfileInput = {
  niche: string;
  phone?: string;
  storeName: string;
  userId: string;
  whatsappNumber?: string;
};

export type WhatsappConfigInput = {
  accessTokenHint?: string;
  businessPhoneId?: string;
  connected?: boolean;
  displayNumber?: string;
  webhookReady?: boolean;
  userId: string;
};

function resolveUsersFilePath() {
  const customPath = process.env.USERS_FILE_PATH?.trim();

  if (customPath) {
    return path.resolve(customPath);
  }

  return path.join(process.cwd(), "data", "users.json");
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, storedHash: string) {
  const [salt, originalHash] = storedHash.split(":");

  if (!salt || !originalHash) {
    return false;
  }

  const hashBuffer = Buffer.from(originalHash, "hex");
  const candidateBuffer = scryptSync(password, salt, 64);

  return (
    hashBuffer.length === candidateBuffer.length &&
    timingSafeEqual(hashBuffer, candidateBuffer)
  );
}

async function readUsers(): Promise<StoredUser[]> {
  const filePath = resolveUsersFilePath();

  try {
    const fileContent = await readFile(filePath, "utf8");
    const parsed = JSON.parse(fileContent) as StoredUser[];
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

async function writeUsers(users: StoredUser[]) {
  const filePath = resolveUsersFilePath();
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(users, null, 2), "utf8");
}

export function validateRegisterInput(input: RegisterInput) {
  const normalized = {
    email: normalizeEmail(input.email),
    name: input.name.trim(),
    password: input.password.trim(),
    storeName: input.storeName.trim(),
  };

  if (normalized.name.length < 2) {
    throw new Error("Informe seu nome.");
  }

  if (normalized.storeName.length < 2) {
    throw new Error("Informe o nome da loja.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.email)) {
    throw new Error("Informe um e-mail valido.");
  }

  if (normalized.password.length < 6) {
    throw new Error("A senha precisa ter pelo menos 6 caracteres.");
  }

  return normalized;
}

export function validateLoginInput(input: LoginInput) {
  const normalized = {
    email: normalizeEmail(input.email),
    password: input.password.trim(),
  };

  if (!normalized.email) {
    throw new Error("Informe seu e-mail.");
  }

  if (!normalized.password) {
    throw new Error("Informe sua senha.");
  }

  return normalized;
}

export async function registerUser(input: RegisterInput) {
  const normalized = validateRegisterInput(input);
  const users = await readUsers();

  const alreadyExists = users.some((user) => user.email === normalized.email);

  if (alreadyExists) {
    throw new Error("Ja existe uma conta com este e-mail.");
  }

  const newUser: StoredUser = {
    id: randomUUID(),
    email: normalized.email,
    name: normalized.name,
    storeName: normalized.storeName,
    passwordHash: hashPassword(normalized.password),
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  await writeUsers(users);

  return {
    email: newUser.email,
    name: newUser.name,
    storeName: newUser.storeName,
    userId: newUser.id,
  } satisfies SessionPayload;
}

export async function loginUser(input: LoginInput) {
  const normalized = validateLoginInput(input);
  const users = await readUsers();

  const user = users.find((item) => item.email === normalized.email);

  if (!user || !verifyPassword(normalized.password, user.passwordHash)) {
    throw new Error("E-mail ou senha invalidos.");
  }

  return {
    email: user.email,
    name: user.name,
    storeName: user.storeName,
    userId: user.id,
  } satisfies SessionPayload;
}

export async function getUserById(userId: string) {
  const users = await readUsers();
  return users.find((user) => user.id === userId) ?? null;
}

export async function getUserByWhatsappBusinessPhoneId(businessPhoneId: string) {
  const normalizedId = businessPhoneId.trim();

  if (!normalizedId) {
    return null;
  }

  const users = await readUsers();
  return (
    users.find((user) => user.whatsappBusinessPhoneId === normalizedId) ?? null
  );
}

export function validateStoreProfileInput(input: StoreProfileInput) {
  const normalized = {
    niche: input.niche.trim(),
    phone: input.phone?.trim() || "",
    storeName: input.storeName.trim(),
    userId: input.userId.trim(),
    whatsappNumber: input.whatsappNumber?.trim() || "",
  };

  if (!normalized.userId) {
    throw new Error("Usuário inválido.");
  }

  if (normalized.storeName.length < 2) {
    throw new Error("Informe o nome da loja.");
  }

  if (normalized.niche.length < 2) {
    throw new Error("Selecione o nicho da loja.");
  }

  return normalized;
}

export async function updateStoreProfile(input: StoreProfileInput) {
  const normalized = validateStoreProfileInput(input);
  const users = await readUsers();
  const userIndex = users.findIndex((user) => user.id === normalized.userId);

  if (userIndex === -1) {
    throw new Error("Usuário não encontrado.");
  }

  const updatedUser: StoredUser = {
    ...users[userIndex],
    niche: normalized.niche,
    onboardingCompleted: true,
    phone: normalized.phone,
    storeName: normalized.storeName,
    whatsappNumber: normalized.whatsappNumber,
  };

  users[userIndex] = updatedUser;
  await writeUsers(users);

  return updatedUser;
}

export function validateWhatsappConfigInput(input: WhatsappConfigInput) {
  const normalized = {
    accessTokenHint: input.accessTokenHint?.trim() || "",
    businessPhoneId: input.businessPhoneId?.trim() || "",
    connected: Boolean(input.connected),
    displayNumber: input.displayNumber?.trim() || "",
    userId: input.userId.trim(),
    webhookReady: Boolean(input.webhookReady),
  };

  if (!normalized.userId) {
    throw new Error("Usuário inválido.");
  }

  return normalized;
}

export async function updateWhatsappConfig(input: WhatsappConfigInput) {
  const normalized = validateWhatsappConfigInput(input);
  const users = await readUsers();
  const userIndex = users.findIndex((user) => user.id === normalized.userId);

  if (userIndex === -1) {
    throw new Error("Usuário não encontrado.");
  }

  const updatedUser: StoredUser = {
    ...users[userIndex],
    whatsappAccessTokenHint: normalized.accessTokenHint || undefined,
    whatsappBusinessPhoneId: normalized.businessPhoneId || undefined,
    whatsappConnected: normalized.connected,
    whatsappDisplayNumber: normalized.displayNumber || undefined,
    whatsappWebhookReady: normalized.webhookReady,
  };

  users[userIndex] = updatedUser;
  await writeUsers(users);

  return updatedUser;
}

export function encodeSession(session: SessionPayload) {
  return Buffer.from(JSON.stringify(session), "utf8").toString("base64url");
}

export function decodeSession(rawValue: string | undefined) {
  if (!rawValue) {
    return null;
  }

  try {
    const decoded = Buffer.from(rawValue, "base64url").toString("utf8");
    const parsed = JSON.parse(decoded) as SessionPayload;

    if (!parsed?.userId || !parsed?.email) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}
