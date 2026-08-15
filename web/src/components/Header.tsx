import logoSvg from "../assets/logo.svg";
import logoutSvg from "../assets/logout.svg";
import { useAuth } from "../hooks/useAuth";

export function Header() {
  const auth = useAuth();

  const name = auth.session?.user.name ?? "usuário";

  return (
    <header className="w-full sm:max-w-5xl p-4 flex justify-between m-auto pt-9.5 pb-6.5">
      <img src={logoSvg} alt="Logo" className="w-5.625" />
      <section className="flex font-semibold text-gray-200 w-max items-center gap-4">
        <span className="text-nowrap">Olá, {name}</span>
        <a href="/" onClick={() => auth.remove()}>
          <img src={logoutSvg} alt="LogOut" />
        </a>
      </section>
    </header>
  );
}
