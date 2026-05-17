import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AuthForm } from "@/components/auth-form";
import { AUTH_COOKIE_NAME, decodeSession } from "@/lib/auth";

export default async function RegisterPage() {
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
            Primeiro acesso
          </p>
          <h2 className="display-font mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Crie a base da sua loja para começar a montar o VendaZap AI.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/68">
            Nesta etapa, estamos estruturando o acesso inicial da operacao. O
            objetivo e deixar o caminho pronto para onboarding, catalogo e
            painel do lojista nas proximas entregas.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/54">
            <span className="rounded-full border border-white/10 px-4 py-2">
              1 loja por conta
            </span>
            <span className="rounded-full border border-white/10 px-4 py-2">
              Base para multi-tenant
            </span>
            <span className="rounded-full border border-white/10 px-4 py-2">
              Pronto para onboarding
            </span>
          </div>
          <p className="mt-8 text-sm text-white/52">
            Ja tem conta?{" "}
            <Link href="/entrar" className="font-semibold text-mint">
              Entrar agora
            </Link>
          </p>
        </div>

        <AuthForm
          mode="register"
          title="Criar conta da loja"
          description="Cadastre o acesso inicial da operacao. Depois vamos evoluir isso para o onboarding completo."
          switchText="Ja tem uma conta?"
          switchLabel="Entrar"
          switchHref="/entrar"
        />
      </div>
    </main>
  );
}
