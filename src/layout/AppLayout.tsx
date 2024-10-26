import Footer from "@/pages/components/Footer";
import Header from "@/pages/components/Header";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
