export function NotFound() {
  return (
    <div className="flex flex-col">
      <h1>Ops, essa página não existe.</h1>

      <a
        href="/"
        className="text-center align-bottom mt-4 hover:text-green-500 transition ease-linear"
      >
        Clique aqui para voltar
      </a>
    </div>
  );
}
