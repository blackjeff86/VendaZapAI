import { NextResponse } from "next/server";
import { saveLead } from "@/lib/leads";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      name?: string;
      niche?: string;
      phone?: string;
      storeName?: string;
      website?: string;
    };

    if ((body.website ?? "").trim()) {
      return NextResponse.json(
        { message: "Lead salvo com sucesso." },
        { status: 201 },
      );
    }

    const lead = await saveLead({
      name: body.name ?? "",
      storeName: body.storeName ?? "",
      email: body.email ?? "",
      niche: body.niche ?? "",
      phone: body.phone ?? "",
    });

    return NextResponse.json(
      {
        message: "Lead salvo com sucesso.",
        lead,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Nao foi possivel salvar o lead.",
      },
      { status: 400 },
    );
  }
}
