import { Route, Routes } from "react-router";
import { NotFound } from "../pages/NotFound";
import { Refund } from "../pages/Refund";
import { RefundSuccess } from "../pages/RefundSuccess";
import { AppLayout } from "../components/AppLayout";

export function EmployeeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Refund />} />
        <Route path="/success" element={<RefundSuccess />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
