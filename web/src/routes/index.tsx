import { BrowserRouter } from "react-router";

import { Loading } from "../components/Loading";

import { AuthRoutes } from "./AuthRoutes";
import { EmployeeRoutes } from "./EmployeeRoutes";
import { ManagerRoutes } from "./ManagerRoutes";
import { useAuth } from "../hooks/useAuth";


export function Routes() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }


  function Route() {
    switch (session?.user.role) {
      case "employee":
        return <EmployeeRoutes />;
      case "manager":
        return <ManagerRoutes />;

      default:
        return <AuthRoutes />;
    }
  }

  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
}
