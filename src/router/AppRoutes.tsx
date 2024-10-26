import ProtectedRoutes from "@/auth/ProtectedRoutes";
import AppLayout from "@/layout/AppLayout";
import RegisterLayout from "@/layout/RegisterLayout";
import Home from "@/pages/Home";
import ProductsList from "@/pages/Products/ProductsList";
import Login from "@/pages/Register/Login";
import Signup from "@/pages/Register/Signup";
import { Route, Routes } from "react-router-dom";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<RegisterLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsList />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
