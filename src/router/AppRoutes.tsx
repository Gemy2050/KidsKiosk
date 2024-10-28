import ProtectedRoutes from "@/auth/ProtectedRoutes";
import AppLayout from "@/layout/AppLayout";
import RegisterLayout from "@/layout/RegisterLayout";
import Favorites from "@/pages/Favorites";
import Home from "@/pages/Home";
import ProductDetails from "@/pages/Products/ProductDetails";
import ProductsList from "@/pages/Products/ProductsList";
import Login from "@/pages/Register/Login";
import OTPForm from "@/pages/Register/OTPForm";
import Signup from "@/pages/Register/Signup";
import { Route, Routes } from "react-router-dom";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<RegisterLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verificationWithOtp" element={<OTPForm />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Route>
      </Route>
      <Route path="*" element={<h1 className="text-4xl">Not Found</h1>} />
    </Routes>
  );
}

export default AppRoutes;
