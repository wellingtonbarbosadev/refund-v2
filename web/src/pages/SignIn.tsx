import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useActionState } from "react";
import z, { ZodError } from "zod";
import { AxiosError } from "axios";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";

const signInSchema = z.object({
  email: z.email({ message: "E-mail inválido" }).trim(),
  password: z.string(),
});

type SignInState = {
  message?: string;
};

export function SignIn() {
  const auth = useAuth();

  const [state, formAction, isLoading] = useActionState<SignInState, FormData>(
    onSignIn,
    {},
  );

  async function onSignIn(
    _previousState: SignInState,
    formData: FormData,
  ): Promise<SignInState> {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const data = signInSchema.parse({
        email,
        password,
      });

      const response = await api.post("/sessions", data);

      auth.save(response.data);
      return {};
    } catch (error) {
      if (error instanceof ZodError) {
        return { message: error.issues[0].message };
      }

      if (error instanceof AxiosError) {
        const data = error.response?.data as { message?: string } | undefined;
        return { message: data?.message ?? "Não foi possível entrar" };
      }

      return { message: "Não foi possível entrar" };
    }
  }

  return (
    <form action={formAction} className="w-full gap-4 flex flex-col">
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

      <p className="text-red-700 text-center">{state?.message}</p>

      <Button type="submit" isLoading={isLoading}>
        Entrar
      </Button>

      <a
        href="/signup"
        className="text-sm text-center my-4 hover:text-green-200 transition ease-linear"
      >
        Criar conta
      </a>
    </form>
  );
}
