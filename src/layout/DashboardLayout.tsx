import Navbar from "@/pages/Dashboard/Navbar";
import Sidebar from "@/pages/Dashboard/Sidebar";

import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="bg-[#f0f5f8] dark:bg-[#111] overflow-hidden flex-1 min-h-screen max-w-full ">
        <Navbar />
        <div className="p-4 xl:container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
