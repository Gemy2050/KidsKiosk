import DropDown from "@/components/DropDown";
import Logo from "@/components/Logo";
import { ModeToggle } from "@/components/ModeToggler";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Menu, ShoppingCart, UserCircle, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { User } from "@/types";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const signOut = useSignOut();
  const user: User = useAuthUser();

  const handleSignOut = () => {
    signOut();
    location.reload();
  };

  return (
    <header className="sticky top-0 z-20 bg-background text-foreground border-b-2 border-border py-4 ">
      <div className="container flex items-center justify-between gap-8">
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
          } fixed w-[300px] py-8 md:py-0 h-full max-w-full bg-background top-[66px] z-10 flex-1 md:static flex flex-col md:flex-row gap-4 md:justify-between duration-300`}
        >
          <X
            className="absolute block md:hidden left-2 top-2 cursor-pointer"
            onClick={() => setOpenMenu(false)}
          />
          <div className="flex-col md:flex-row flex items-center gap-5">
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
          <div className="flex items-center justify-center gap-5 mt-5 md:mt-0">
            <ModeToggle />
            <DropDown
              trigger={
                user?.imageName ? (
                  <img
                    src={user.imageName}
                    alt="user"
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                ) : (
                  <UserCircle size={30} className=" cursor-pointer" />
                )
              }
            >
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem
                className="[&:hover]:text-destructive"
                onClick={handleSignOut}
              >
                Logout
              </DropdownMenuItem>
            </DropDown>
            <ShoppingCart size={30} className="text-g-500 cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
}
