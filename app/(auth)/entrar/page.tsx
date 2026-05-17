import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AuthForm } from "@/components/auth-form";
import { AUTH_COOKIE_NAME, decodeSession } from "@/lib/auth";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const session = decodeSession(cookieStore.get(AUTH_COOKIE_NAME)?.value);

  if (session) {
    redirect("/painel");
  }

  return (
    <main className="container-shell flex min-h-screen items-center py-12">
      <div className="grid w-full gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-mint">
            Acesso da loja
          </p>
          <h2 className="display-font mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Entre para acompanhar conversas, reservas e atendimento em um só painel.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/68">
            O VendaZap AI foi pensado para ser simples no uso diario. Seu time
            entra, acompanha as conversas quentes e assume o atendimento quando
            precisar.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/54">
            <span className="rounded-full border border-white/10 px-4 py-2">
              Painel mobile-first
            </span>
            <span className="rounded-full border border-white/10 px-4 py-2">
              Conversas organizadas
            </span>
            <span className="rounded-full border border-white/10 px-4 py-2">
              Reserva e atendimento humano
            </span>
          </div>
          <p className="mt-8 text-sm text-white/52">
            Ainda nao tem conta?{" "}
            <Link href="/criar-conta" className="font-semibold text-mint">
              Criar conta da loja
            </Link>
          </p>
        </div>

        <AuthForm
          mode="login"
          title="Entrar no painel"
          description="Acesse sua area da loja para acompanhar o atendimento e preparar o restante do MVP."
          switchText="Ainda nao tem acesso?"
          switchLabel="Criar conta"
          switchHref="/criar-conta"
        />
      </div>
    </main>
  );
}
