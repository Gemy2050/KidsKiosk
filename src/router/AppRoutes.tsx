import Loader from "@/components/Loader";
import ForgetPassword from "@/pages/ForgetPassword/ForgetPassword";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const ProtectedRoutes = lazy(() => import("@/auth/ProtectedRoutes"));
const AppLayout = lazy(() => import("@/layout/AppLayout"));
const RegisterLayout = lazy(() => import("@/layout/RegisterLayout"));
const Cart = lazy(() => import("@/pages/Cart"));
const Favorites = lazy(() => import("@/pages/Favorites"));
const Home = lazy(() => import("@/pages/Home"));
const ProductDetails = lazy(() => import("@/pages/Products/ProductDetails"));
const ProductsList = lazy(() => import("@/pages/Products/ProductsList"));
const Login = lazy(() => import("@/pages/Register/Login"));
const OTPForm = lazy(() => import("@/pages/Register/OTPForm"));
const Signup = lazy(() => import("@/pages/Register/Signup"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const AppRoutes = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      <Route element={<RegisterLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Route>

      <Route path="/verificationWithOtp" element={<OTPForm />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
