import DropDown from "@/components/DropDown";
import Loader from "@/components/Loader";
import { ModeToggle } from "@/components/ModeToggler";
import useSignout from "@/hooks/useSignout";
import { User } from "@/types";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { MenuSquare, UserCircle2 } from "lucide-react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const Navbar = () => {
  const user: User = useAuthUser();
  const { handleSignout, loading } = useSignout();

  const toggleSidebar = () => {
    const sidebar = document.querySelector("#Sidebar");
    sidebar?.classList.toggle("sidebar-hidden");
  };

  if (loading) return <Loader />;

  return (
    <div className="fixed top-0 left-0 right-0 lg:static z-30 flex items-center shadow-lg bg-background py-3 px-4">
      <MenuSquare
        className="block lg:hidden cursor-pointer hover:text-primary duration-200"
        size={24}
        onClick={toggleSidebar}
      />

      <div className="flex items-center gap-2 ms-auto">
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
              <UserCircle2 size={30} className=" cursor-pointer" />
            )
          }
        >
          <DropdownMenuItem
            className="[&:hover]:text-destructive p-1 cursor-pointer outline-none duration-300"
            onClick={handleSignout}
          >
            Logout
          </DropdownMenuItem>
        </DropDown>
      </div>
    </div>
  );
};

export default Navbar;
