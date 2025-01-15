import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "@/components/Loader";

// Eagerly loaded layouts and critical components
import DashboardLayout from "@/layout/DashboardLayout";
import ProtectDashboard from "@/auth/ProtectDashboard";

// Lazy loaded components
const ProtectedRoutes = lazy(() => import("@/auth/ProtectedRoutes"));
const AppLayout = lazy(() => import("@/layout/AppLayout"));
const RegisterLayout = lazy(() => import("@/layout/RegisterLayout"));

// Lazy load pages
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Register/Login"));
const Signup = lazy(() => import("@/pages/Register/Signup"));
const Cart = lazy(() => import("@/pages/Cart"));
const Favorites = lazy(() => import("@/pages/Favorites"));
const ProductDetails = lazy(() => import("@/pages/Products/ProductDetails"));
const ProductsList = lazy(() => import("@/pages/Products/ProductsList"));
const Profile = lazy(() => import("@/pages/Profile/Profile"));
const Contact = lazy(() => import("@/pages/Contact/Contact"));
const Success = lazy(() => import("@/pages/Success"));
const Orders = lazy(() => import("@/pages/Orders"));
const OTPForm = lazy(() => import("@/pages/Register/OTPForm"));
const ForgetPassword = lazy(() => import("@/pages/ForgetPassword"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Lazy load dashboard pages
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Products = lazy(() => import("@/pages/Dashboard/Products"));
const AddProduct = lazy(() => import("@/pages/Dashboard/Products/AddProduct"));
const EditProduct = lazy(
  () => import("@/pages/Dashboard/Products/EditProduct")
);
const Images = lazy(() => import("@/pages/Dashboard/Images"));
const AddImages = lazy(() => import("@/pages/Dashboard/Images/AddImages"));
const Categories = lazy(() => import("@/pages/Dashboard/Categories"));
const AddCategory = lazy(
  () => import("@/pages/Dashboard/Categories/AddCategory")
);
const EditCategory = lazy(
  () => import("@/pages/Dashboard/Categories/EditCategory")
);
const Users = lazy(() => import("@/pages/Dashboard/users"));
const DashboardOrders = lazy(() => import("@/pages/Dashboard/orders"));

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
          <Route path="/success" element={<Success />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Route>

      <Route element={<ProtectDashboard />}>
        <Route element={<DashboardLayout />} path="/admin">
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products">
            <Route index element={<Products />} />
            <Route path="add" element={<AddProduct />} />
            <Route path="edit/:productId" element={<EditProduct />} />
            <Route path="images/:productId" element={<Images />} />
            <Route path="images/:productId/add" element={<AddImages />} />
          </Route>
          <Route path="categories">
            <Route index element={<Categories />} />
            <Route path="add" element={<AddCategory />} />
            <Route path="edit/:catId" element={<EditCategory />} />
          </Route>
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<DashboardOrders />} />
        </Route>
      </Route>

      <Route path="/verificationWithOtp" element={<OTPForm />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
