import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type LeadInput = {
  email: string;
  name: string;
  niche: string;
  phone?: string;
  storeName: string;
};

type StoredLead = LeadInput & {
  createdAt: string;
  source: "landing-page";
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function resolveLeadsFilePath() {
  const customPath = process.env.LEADS_FILE_PATH?.trim();

  if (customPath) {
    return path.resolve(customPath);
  }

  return path.join(process.cwd(), "data", "leads.json");
}

export function validateLeadInput(input: LeadInput) {
  const normalized = {
    name: input.name.trim(),
    storeName: input.storeName.trim(),
    email: input.email.trim().toLowerCase(),
    niche: input.niche.trim(),
    phone: input.phone?.trim() || "",
  };

  if (!normalized.name || normalized.name.length < 2) {
    throw new Error("Informe um nome valido.");
  }

  if (!normalized.storeName || normalized.storeName.length < 2) {
    throw new Error("Informe o nome da loja.");
  }

  if (!EMAIL_REGEX.test(normalized.email)) {
    throw new Error("Informe um e-mail valido.");
  }

  if (!normalized.niche) {
    throw new Error("Selecione o nicho da sua loja.");
  }

  return normalized;
}

async function readExistingLeads(filePath: string) {
  try {
    const fileContent = await readFile(filePath, "utf8");
    const parsed = JSON.parse(fileContent) as StoredLead[];
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

export async function saveLead(input: LeadInput) {
  const normalized = validateLeadInput(input);
  const filePath = resolveLeadsFilePath();

  await mkdir(path.dirname(filePath), { recursive: true });

  const leads = await readExistingLeads(filePath);
  const newLead: StoredLead = {
    ...normalized,
    createdAt: new Date().toISOString(),
    source: "landing-page",
  };

  leads.push(newLead);
  await writeFile(filePath, JSON.stringify(leads, null, 2), "utf8");

  return newLead;
}
