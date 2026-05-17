import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  AUTH_COOKIE_NAME,
  decodeSession,
  updateWhatsappConfig,
} from "@/lib/auth";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = decodeSession(cookieStore.get(AUTH_COOKIE_NAME)?.value);

  if (!session) {
    return NextResponse.json({ message: "Sessão inválida." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      accessTokenHint?: string;
      businessPhoneId?: string;
      connected?: boolean;
      displayNumber?: string;
      webhookReady?: boolean;
    };

    const user = await updateWhatsappConfig({
      userId: session.userId,
      accessTokenHint: body.accessTokenHint ?? "",
      businessPhoneId: body.businessPhoneId ?? "",
      connected: Boolean(body.connected),
      displayNumber: body.displayNumber ?? "",
      webhookReady: Boolean(body.webhookReady),
    });

    return NextResponse.json(
      {
        message: "Configuração do WhatsApp salva com sucesso.",
        user,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível salvar a configuração do WhatsApp.",
      },
      { status: 400 },
    );
  }
}
