export function formatCurrency(amount: number) {
  const currency = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return currency.format(amount).replace("R$", "");
}
