import Logo from "@/components/Logo";
import { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const hideSidebar = window.innerWidth < 992;
  const { pathname } = useLocation();

  const handleActiveLink = (isActive: boolean, path: string) => {
    const isMatchingPath = location.pathname.startsWith(path);
    return `${
      isActive || isMatchingPath ? "border-primary" : "border-transparent "
    } p-3 block text-gray-800 border-e-4 hover:ps-4 hover:border-primary active:border-primary duration-300`;
  };

  useEffect(() => {
    document.querySelector("#Sidebar")?.classList.add("sidebar-hidden");
  }, [pathname]);

  return (
    <div
      id="Sidebar"
      className={`${
        hideSidebar && "sidebar-hidden"
      } w-[200px] bg-background text-foreground py-4 h-screen shadow-2xl fixed top-[64px] lg:sticky lg:top-0 bottom-0 left-0 z-30 duration-200`}
    >
      <Link to={"/"}>
        <Logo className="text-2xl px-3" />
      </Link>
      <ul className="flex flex-col mt-4">
        <li className="border-b border-gray-200 ">
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              handleActiveLink(isActive, "/admin/dashboard")
            }
          >
            Home
          </NavLink>
        </li>
        <li className="border-b border-gray-200">
          <NavLink
            to="products"
            className={({ isActive }) =>
              handleActiveLink(isActive, "/admin/products")
            }
          >
            Products
          </NavLink>
        </li>
        <li className="border-b border-gray-200">
          <NavLink
            to="categories"
            className={({ isActive }) =>
              handleActiveLink(isActive, "/admin/categories")
            }
          >
            Categories
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
