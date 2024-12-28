import Navbar from "@/pages/Dashboard/Navbar";
import Sidebar from "@/pages/Dashboard/Sidebar";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light"); // Force light theme on the dashboard
    return () => setTheme("system"); // Reset to system/default theme when leaving
  }, [setTheme]);
  return (
    <div className="flex">
      <Sidebar />
      <div className="bg-[#f0f5f8] flex-1 min-h-screen max-w-full w-full">
        <Navbar />
        <div className="p-4 xl:container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
