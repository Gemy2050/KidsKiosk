import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "@/layout/DashboardLayout";
import Images from "@/pages/Dashboard/Images";
import Profile from "@/pages/Profile/Profile";
import Contact from "@/pages/Contact/Contact";
import Customers from "@/pages/Dashboard/users";
import Success from "@/pages/Success";
import Orders from "@/pages/Orders";

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
const ForgetPassword = lazy(() => import("@/pages/ForgetPassword"));
const Loader = lazy(() => import("@/components/Loader"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Products = lazy(() => import("@/pages/Dashboard/Products"));
const AddProduct = lazy(() => import("@/pages/Dashboard/Products/AddProduct"));
const EditProduct = lazy(
  () => import("@/pages/Dashboard/Products/EditProduct")
);
const AddImages = lazy(() => import("@/pages/Dashboard/Images/AddImages"));

const Categories = lazy(() => import("@/pages/Dashboard/Categories"));
const AddCategory = lazy(
  () => import("@/pages/Dashboard/Categories/AddCategory")
);
const EditCategory = lazy(
  () => import("@/pages/Dashboard/Categories/EditCategory")
);

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

      {/* Dashboard Routes */}
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
          <Route path="edit/:productId" element={<EditCategory />} />
        </Route>
        <Route path="customers" element={<Customers />} />
      </Route>

      <Route path="/verificationWithOtp" element={<OTPForm />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
