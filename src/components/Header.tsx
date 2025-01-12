import DropDown from "@/components/DropDown";
import Logo from "@/components/Logo";
import { ModeToggle } from "@/components/ModeToggler";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Menu, ShoppingCart, UserCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { User } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import axiosInstance from "@/config/axios.config";
import { useToast } from "@/hooks/use-toast";
import Loader from "./Loader";
import { clearCart } from "@/app/slices/CartSlice";
import { clearFavorites } from "@/app/slices/FavoritesSlice";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const signOut = useSignOut();
  const user: User = useAuthUser();
  const dispatch = useDispatch();
  let { cart } = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOpenMenu(false);
  }, [pathname]);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      if (user) {
        await axiosInstance.post("/account/signout", {
          id: user?.id,
          isGoogleProvider: user?.isGoogleUser,
        });
      }
      signOut();
      dispatch(clearCart());
      dispatch(clearFavorites());
      sessionStorage.removeItem("isDemo");
      navigate("/login", { replace: true });
    } catch (error) {
      toast({
        title: "Failed to logout",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <header className="sticky top-0 z-20 bg-background text-foreground shadow-lg py-4 ">
      <div className="px-5 md:px-1 lg:px-5 flex items-center justify-between gap-8">
        <Link to="/" className="min-w-[25%] lg:min-w-[33%] focus:outline-none">
          <Logo className="text-2xl cursor-pointer" />
        </Link>
        <button
          className="md:hidden"
          onClick={() => setOpenMenu((prev) => !prev)}
        >
          <Menu size={30} className="text-primary" />
        </button>
        <div
          className={`${
            openMenu ? "left-0" : "left-[-100%]"
          } fixed w-[380px] py-8 md:py-0 h-full max-w-full bg-background top-[64px] z-10 flex-1 md:static flex flex-col md:flex-row gap-4 md:justify-between duration-300 shadow-lg md:shadow-none`}
        >
          <X
            className="absolute block md:hidden left-2 top-2 cursor-pointer"
            onClick={() => setOpenMenu(false)}
          />
          <div className="flex-col md:flex-row flex items-center gap-5">
            {user?.role == "admin" && (
              <NavLink
                className="[&.active]:text-primary hover:text-primary duration-300"
                to="/admin/dashboard"
              >
                Dashboard
              </NavLink>
            )}
            <NavLink
              className="[&.active]:text-primary hover:text-primary duration-300"
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className="[&.active]:text-primary hover:text-primary duration-300"
              to="/products"
            >
              Products
            </NavLink>
            <NavLink
              className="[&.active]:text-primary hover:text-primary duration-300"
              to="/favorites"
            >
              Favorites
            </NavLink>
            <NavLink
              className="[&.active]:text-primary hover:text-primary duration-300"
              to="/contact"
            >
              Contact
            </NavLink>
          </div>
          <div className="flex items-center justify-center gap-4 md:gap-2 lg:gap-4 mt-5 md:mt-0">
            <ModeToggle />
            <DropDown
              trigger={
                user?.image ? (
                  <img
                    src={user?.image}
                    alt="user"
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                ) : (
                  <UserCircle size={30} className=" cursor-pointer" />
                )
              }
            >
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="[&:hover]:text-destructive cursor-pointer"
                onClick={handleSignOut}
              >
                Logout
              </DropdownMenuItem>
            </DropDown>
            <Link to={"/cart"} className="relative">
              <ShoppingCart size={30} className="text-g-500 cursor-pointer" />
              <span className="absolute text-xs w-5 h-5 rounded-full flex items-center justify-center bg-destructive text-white top-[-13px] left-[9px]">
                {cart.length}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
