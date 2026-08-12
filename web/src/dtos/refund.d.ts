import type { CATEGORIES } from "../utils/categories";

type RefundAPIResponse = {
  id: string;
  name: string;
  category: keyof typeof CATEGORIES;
  amount: number;
  filename: string;
  user: {
    name: string;
  };
};

type RefundsPaginationAPIResponse = {
  refunds: RefundAPIResponse[];
  pagination: {
    page: number;
    perPage: number;
    totalPages: number;
    totalRecords: number;
  };
};
