import { Outlet } from "react-router";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="pt-4 px-8 flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </div>
  )
}
