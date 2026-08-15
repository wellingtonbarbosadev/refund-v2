import { Button } from "../components/Button";
import { Input } from "../components/Input";

import searchSvg from "../assets/search.svg";

import { CATEGORIES } from "../utils/categories";
import { RefundItem } from "../components/RefundItem";

import type React from "react";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Pagination } from "../components/Pagination";
import type {
  RefundAPIResponse,
  RefundsPaginationAPIResponse,
} from "../dtos/refund";

export function RefundRequests() {
  const [search, setSearch] = useState<null | string>(null);
  const [current, setCurrent] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage] = useState(10);
  const [refunds, setRefunds] = useState<null | RefundAPIResponse[]>(null);

  async function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setCurrent(1);
    await onLoadPage(1);
  }

  async function onLoadPage(page = current) {
    const queryParams = [`page=${page}`, `perPage=${perPage}`];

    if (search) queryParams.push(`name=${search}`);

    const response = await api.get<RefundsPaginationAPIResponse>(
      `/refunds?${queryParams.join("&")}`,
    );

    const { pagination }: RefundsPaginationAPIResponse = response.data;
    setRefunds(response.data.refunds);
    setTotalPages(pagination.totalPages);
  }

  useEffect(() => {
    if (search === "") {
      setSearch(null);
    }
    onLoadPage();
  }, [current]);

  function handlePagination(action: "next" | "previous") {
    if (action === "next" && current < totalPages) {
      return setCurrent(current + 1);
    }

    if (action === "previous" && current > 1) {
      return setCurrent(current - 1);
    }

    return current;
  }

  return (
    <section className="flex gap-6 flex-col w-full">
      <h1 className="text-xl font-bold ">Solicitações</h1>
      <form
        onSubmit={onSubmit}
        className="flex gap-3"
      >
        <label className="flex-1">
          <Input
            defaultValue={search ?? ""}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar pelo nome"
          />
        </label>

        <Button type="submit" variant="icon">
          <img src={searchSvg} alt="" className="w-5" />
        </Button>
      </form>
      <div className="divisor" />

      <section className="refunds flex flex-col gap-2">
        {refunds &&
          refunds.map(({ id, ...refund }) => (
            <RefundItem
              key={id}
              {...refund}
              category={CATEGORIES[refund.category]}
              href={`/refund/${id}`}
            />
          ))}
      </section>

      <Pagination
        current={current}
        totalPages={totalPages}
        onNext={() => handlePagination("next")}
        onPrevious={() => handlePagination("previous")}
      />
    </section>
  );
}
