import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import SideNav from "./SideNav";

const Shell = () => (
  <div className="flex h-screen bg-background">
    <SideNav />
    <div className="flex flex-1 flex-col">
      <TopBar />
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  </div>
);

export default Shell;
