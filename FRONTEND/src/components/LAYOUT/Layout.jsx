import { Outlet } from "react-router-dom";
import Header from "./Header";
const Layout = () => {
  return (
    <>
      <Header />
      <main style={{ height: "calc(100vh - 60px)" }} className="flex-1">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
