import { Navigate, useNavigate, useLocation } from "react-router";

import { Button } from "../components/Button";

import okSvg from "../assets/ok.svg";

export function RefundSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state?.fromSubmit) {
    return Navigate({ to: "/" });
  }

  return (
    <section className="flex flex-col gap-10">
      <article className="w-full flex flex-col justify-center items-center gap-6">
        <h1 className="text-2xl text-green-600 font-bold text-center">
          Solicitação enviada!
        </h1>
        <img src={okSvg} alt="" className="w-28" />
        <p className="text-gray-200 text-sm">
          Agora é apenas aguardar! Sua solicitação será analisada e, em breve, o
          setor financeiro irá entrar em contato com você.
        </p>
      </article>

      <Button onClick={() => navigate("/")}>Nova solicitação</Button>
    </section>
  );
}
