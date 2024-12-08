import Logo from "@/components/Logo";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      id="Sidebar"
      className="w-[200px] bg-background text-foreground py-4 h-screen fixed top-[64px] lg:sticky lg:top-0 bottom-0 left-0 z-30 duration-200"
    >
      <Logo className="text-2xl px-3" />
      <ul className="flex flex-col mt-4">
        <li className="border-b border-gray-200 ">
          <Link
            to="dashboard"
            className="p-3 block text-gray-800 border-e-4 border-transparent hover:ps-4 hover:border-primary duration-300"
          >
            Home
          </Link>
        </li>
        <li className="border-b border-gray-200">
          <Link
            to="products"
            className="p-3 block text-gray-800 border-e-4 border-transparent hover:ps-4 hover:border-primary duration-300"
          >
            Products
          </Link>
        </li>
        <li className="border-b border-gray-200">
          <Link
            to="products"
            className="p-3 block text-gray-800 border-e-4 border-transparent hover:ps-4 hover:border-primary duration-300"
          >
            Categories
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
