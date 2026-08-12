import { Input } from "../components/Input";
import { Button } from "../components/Button";

import { useActionState } from "react";

import { z, ZodError } from "zod";
import { AxiosError } from "axios";
import { api } from "../services/api";
import { useNavigate } from "react-router";

const signUpSchema = z
  .object({
    name: z.string(),
    email: z.email({ error: "E=mail inválido" }),
    password: z.string(),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Os senhas não são iguais",
    path: ["passwordConfirm"],
  });

export function SignUp() {
  const [state, formAction, isLoading] = useActionState(onSignup, null);

  const navigate = useNavigate();

  async function onSignup(_: any, formData: FormData) {
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

      return confirm(
        "Usuário cadastrado com sucesso, deseja ir para tela de login?",
      )
        ? navigate("/")
        : null;
    } catch (error) {
      if (error instanceof ZodError) {
        return alert(error.issues[0].message);
      }

      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }
    } finally {
    }
  }

  return (
    <form action={formAction} className="w-full gap-4 flex flex-col">
      <Input
        required
        name="name"
        defaultValue={state?.name}
        placeholder="Seu nome"
        legend="Nome"
      />

      <Input
        required
        name="email"
        defaultValue={state?.email}
        placeholder="seu@email.com"
        legend="E-mail"
        type="email"
      />

      <Input
        required
        name="password"
        defaultValue={state?.password}
        placeholder="******"
        legend="Senha"
        type="password"
      />

      <Input
        required
        name="passwordConfirm"
        defaultValue={state?.passwordConfirm}
        placeholder="******"
        legend="Confirme a senha"
        type="password"
      />

      <Button type="submit" isLoading={isLoading}>
        Cadastrar
      </Button>

      <a
        href="/"
        className="text-sm text-center my-4 hover:text-green-200 transition ease-linear"
      >
        Já tenho uma conta
      </a>
    </form>
  );
}
