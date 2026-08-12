import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Upload } from "../components/Upload";

import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories";

import fileSvg from "../assets/file.svg";
import z, { ZodError } from "zod";
import { AxiosError } from "axios";
import { api, baseURL } from "../services/api";
import type { RefundAPIResponse } from "../dtos/refund";

const refundSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome tem que ter no mínimo 3 caracteres" }),
  category: z.string().min(1),
  amount: z.coerce.number().positive({ message: "Informe um número positivo" }),
});

export function Refund() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [urlFile, setUrlFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<null | string>(null);

  const navigate = useNavigate();
  const params = useParams();

  async function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    if (params.id) {
      return navigate("/");
    }

    try {
      setIsLoading(true);

      if (!file) {
        return alert("Selecione um arquivo");
      }

      const fileUploadForm = new FormData();
      fileUploadForm.append("file", file);

      const response = await api.post<{ filename: string }>(
        "/uploads",
        fileUploadForm,
      );

      const data = refundSchema.parse({ name, category, amount });

      await api.post("/refunds", {
        ...data,
        filename: response.data.filename,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return setMessage(error.issues[0].message);
      }
      if (error instanceof AxiosError) {
        return setMessage(error.response.data?.message);
      }

      return setMessage("Ocorreu algum erro");
    } finally {
      setIsLoading(false);
    }

    navigate("/success", { state: { fromSubmit: true } });
  }

  async function onLoadPageWithParam() {
    const { data } = await api.get<RefundAPIResponse>(`/refunds/${params.id}`);
    setName(data.name);
    setCategory(data.category);
    setAmount(data.amount);
    setUrlFile(`${baseURL}/uploads/${data.filename}`);
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const fileName = event.target.files?.[0];

    if (fileName) {
      setFile(fileName);
    }
  }

  if (params.id) {
    useEffect(() => {
      onLoadPageWithParam();
    }, []);
  }

  return (
    <form onSubmit={onSubmit} className="w-full h-full">
      <header className="flex flex-col gap-3 mb-10">
        <h1 className="text-xl font-bold text-gray-100">
          Solicitação de reembolso
        </h1>
        <p className="text-gray-200 text-sm font-light">
          Dados da empresa para solicitar reembolso
        </p>
      </header>

      <main className="flex flex-col gap-6">
        <Input
          required
          legend="Nome da solicitação"
          placeholder="Seu nome"
          value={name}
          disabled={!!params.id}
          onChange={(e) => setName(e.target.value)}
        />

        <section className="flex gap-4">
          <Select
            required
            legend="Categoria"
            value={category}
            disabled={!!params.id}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES_KEYS.map((categoryKey) => (
              <option key={categoryKey} value={categoryKey}>
                {CATEGORIES[categoryKey].name}
              </option>
            ))}
          </Select>

          <Input
            required
            legend="Valor"
            type="number"
            value={amount}
            placeholder="0,00"
            disabled={!!params.id}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </section>

        {params.id ? (
          <a
            href={urlFile}
            target="_blank"
            className="flex justify-center items-center gap-1 text-sm text-center my-4 text-green-100 hover:opacity-70 transition ease-linear"
          >
            <img src={fileSvg} alt="" />
            Abrir comprovante
          </a>
        ) : (
          <Upload
            required
            legend="Comprovante"
            type="file"
            file={file}
            onChange={(e) => e.target.files && handleFileChange(e)}
          />
        )}

        <p className="text-red-700 text-center">{message}</p>

        <Button type="submit" isLoading={isLoading}>
          {!params.id ? "Enviar" : "Voltar"}
        </Button>
      </main>
    </form>
  );
}
