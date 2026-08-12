import { useState, type ComponentProps } from "react";
import { formatCurrency } from "../utils/formatCurrency";
import type { RefundAPIResponse } from "../dtos/refund";
import type { CATEGORIES } from "../utils/categories";

type RefundItemProps = Omit<
  RefundAPIResponse & ComponentProps<"a">,
  "id" | "category"
> & {
  id?: string;
  category: (typeof CATEGORIES)[keyof typeof CATEGORIES];
};

export function RefundItem({
  name,
  amount,
  category,
  user,
  href,
}: RefundItemProps) {
  const [amountFormatted] = useState(formatCurrency(Number(amount)));
  return (
    <a
      href={href}
      className="refund w-full flex justify-between p-2 rounded-lg cursor-pointer hover:bg-green-200/15 transition ease-linear"
    >
      <section className="refundName flex gap-3 w-full">
        <img src={category.icon} alt="" className="w-9" />
        <div className="flex flex-col justify-between">
          <span className="font-bold text-sm">{user.name}</span>
          <span className="text-xs text-gray-600">{name}</span>
        </div>
      </section>
      <section className="amount flex items-center">
        <span className="text-gray-600 text-xs font-light">R$</span>
        <span className="text-sm text-gray-100">{amountFormatted}</span>
      </section>
    </a>
  );
}
