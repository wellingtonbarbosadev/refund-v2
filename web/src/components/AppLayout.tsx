import { Outlet } from "react-router";
import { Header } from "./Header";

export function AppLayout() {
  return (
    <div className="w-screen h-screen bg-gray-400 flex flex-col">
      <Header />

      <main className=" h-full mx-4 flex items-center">
        <div className="bg-gray-500 p-8 rounded-md flex flex-col items-center m-auto w-full sm:max-w-5xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
