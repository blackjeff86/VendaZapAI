"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Mode = "login" | "register";
type SubmitState = "idle" | "submitting" | "error";

type AuthFormProps = {
  description: string;
  mode: Mode;
  switchHref: string;
  switchLabel: string;
  switchText: string;
  title: string;
};

export function AuthForm({
  description,
  mode,
  switchHref,
  switchLabel,
  switchText,
  title,
}: AuthFormProps) {
  const router = useRouter();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload =
      mode === "register"
        ? {
            name: String(formData.get("name") ?? "").trim(),
            storeName: String(formData.get("storeName") ?? "").trim(),
            email: String(formData.get("email") ?? "").trim(),
            password: String(formData.get("password") ?? "").trim(),
          }
        : {
            email: String(formData.get("email") ?? "").trim(),
            password: String(formData.get("password") ?? "").trim(),
          };

    setSubmitState("submitting");
    setMessage("");

    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Nao foi possivel continuar.");
      }

      router.push("/painel");
      router.refresh();
    } catch (error) {
      setSubmitState("error");
      setMessage(
        error instanceof Error ? error.message : "Nao foi possivel continuar.",
      );
    } finally {
      setSubmitState((current) => (current === "error" ? current : "idle"));
    }
  }

  return (
    <div className="glass-card w-full rounded-[2rem] p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-mint">
        VendaZap AI
      </p>
      <h1 className="display-font mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 text-sm leading-7 text-white/68">{description}</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {mode === "register" ? (
          <>
            <input
              name="name"
              type="text"
              placeholder="Seu nome"
              required
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/35"
            />
            <input
              name="storeName"
              type="text"
              placeholder="Nome da loja"
              required
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/35"
            />
          </>
        ) : null}

        <input
          name="email"
          type="email"
          placeholder="Seu e-mail"
          required
          className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/35"
        />
        <input
          name="password"
          type="password"
          placeholder="Sua senha"
          required
          className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/35"
        />

        <button
          type="submit"
          disabled={submitState === "submitting"}
          className="w-full rounded-2xl bg-whatsapp px-5 py-3.5 text-sm font-semibold text-[#041108] transition hover:bg-mint disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitState === "submitting"
            ? "Enviando..."
            : mode === "register"
              ? "Criar minha conta"
              : "Entrar no painel"}
        </button>
      </form>

      {message ? <p className="mt-4 text-sm text-red-300">{message}</p> : null}

      <p className="mt-6 text-sm text-white/62">
        {switchText}{" "}
        <Link href={switchHref} className="font-semibold text-mint">
          {switchLabel}
        </Link>
      </p>
    </div>
  );
}
