import DropDown from "@/components/DropDown";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { MenuSquare } from "lucide-react";

const Navbar = () => {
  const toggleSidebar = () => {
    const sidebar = document.querySelector("#Sidebar");
    sidebar?.classList.toggle("sidebar-hidden");
  };

  return (
    <div className="sticky z-30 flex items-center shadow-lg top-0 bg-background py-3 px-4">
      <MenuSquare
        className="block lg:hidden cursor-pointer hover:text-primary duration-200"
        size={24}
        onClick={toggleSidebar}
      />

      <DropDown
        align="end"
        trigger={
          <img
            src="https://picsum.photos/200/300"
            className="ms-auto w-10 h-10 rounded-full cursor-pointer"
            alt="profile"
          />
        }
      >
        <DropdownMenuItem className="[&:hover]:text-destructive">
          Logout
        </DropdownMenuItem>
      </DropDown>
    </div>
  );
};

export default Navbar;
