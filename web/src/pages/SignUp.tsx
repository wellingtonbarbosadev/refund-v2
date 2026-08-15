import { Input } from "../components/Input";
import { Button } from "../components/Button";

import { useActionState } from "react";

import { z, ZodError } from "zod";
import { AxiosError } from "axios";
import { api } from "../services/api";
import { useNavigate } from "react-router";

const signUpSchema = z
  .object({
    name: z.string().trim().min(2, { message: "Informe seu nome" }),
    email: z.email({ error: "E-mail inválido" }),
    password: z
      .string()
      .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "As senhas não são iguais",
    path: ["passwordConfirm"],
  });

type SignUpState = {
  message?: string;
};

export function SignUp() {
  const [state, formAction, isLoading] = useActionState<SignUpState, FormData>(
    onSignUp,
    {},
  );

  const navigate = useNavigate();

  async function onSignUp(
    _previousState: SignUpState,
    formData: FormData,
  ): Promise<SignUpState> {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const passwordConfirm = formData.get("passwordConfirm");

    try {
      const data = signUpSchema.parse({
        name,
        email,
        password,
        passwordConfirm,
      });

      await api.post("/users", data);
      navigate("/");
      return {};
    } catch (error) {
      if (error instanceof ZodError) {
        return { message: error.issues[0].message };
      }

      if (error instanceof AxiosError) {
        const data = error.response?.data as { message?: string } | undefined;
        return { message: data?.message ?? "Não foi possível criar a conta" };
      }

      return { message: "Não foi possível criar a conta" };
    }
  }

  return (
    <form action={formAction} className="w-full gap-4 flex flex-col">
      <Input
        required
        name="name"
        placeholder="Seu nome"
        legend="Nome"
      />

      <Input
        required
        name="email"
        placeholder="seu@email.com"
        legend="E-mail"
        type="email"
      />

      <Input
        required
        name="password"
        placeholder="******"
        legend="Senha"
        type="password"
      />

      <Input
        required
        name="passwordConfirm"
        placeholder="******"
        legend="Confirme a senha"
        type="password"
      />

      <Button type="submit" isLoading={isLoading}>
        Cadastrar
      </Button>

      <p className="text-red-700 text-center">{state.message}</p>

      <a
        href="/"
        className="text-sm text-center my-4 hover:text-green-200 transition ease-linear"
      >
        Já tenho uma conta
      </a>
    </form>
  );
}
