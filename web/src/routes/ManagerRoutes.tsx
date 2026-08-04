import { Route, Routes } from "react-router";

import { AppLayout } from "../components/AppLayout";

import { NotFound } from "../pages/NotFound";
import { Refund } from "../pages/Refund";
import { RefundRequests } from "../pages/RefundRequests";

export function ManagerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<RefundRequests />} />
        <Route path="/refund/:id" element={<Refund />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
