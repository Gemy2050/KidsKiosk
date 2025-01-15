import DropDown from "@/components/DropDown";
import Loader from "@/components/Loader";
import Logo from "@/components/Logo";
import { SIDEBAR_LINKS } from "@/data/links";
import useSignout from "@/hooks/useSignout";
import { User } from "@/types";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ChevronDown, UserCircle2 } from "lucide-react";
import { useEffect } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Link, NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const user: User = useAuthUser();
  const { handleSignout, loading } = useSignout();
  const { pathname } = useLocation();
  const hideSidebar = window.innerWidth < 992;

  const handleActiveLink = (isActive: boolean, path: string) => {
    const isMatchingPath = location.pathname.startsWith("/admin" + path);
    return `${
      isActive || isMatchingPath
        ? "border-primary !text-primary font-bold"
        : "border-transparent "
    } flex gap-2 items-center p-3 block text-gray-800 dark:text-gray-300 border-e-4 hover:ps-4 hover:border-primary active:border-primary duration-300`;
  };

  useEffect(() => {
    document.querySelector("#Sidebar")?.classList.add("sidebar-hidden");
  }, [pathname]);

  if (loading) return <Loader />;

  return (
    <div
      id="Sidebar"
      className={`${
        hideSidebar && "sidebar-hidden"
      } flex flex-col flex-shrink-0 w-[200px] bg-background text-foreground py-4 lg:h-screen shadow-2xl fixed top-[64px] lg:sticky lg:top-0 bottom-0 left-0 z-30 duration-200`}
    >
      <Link to={"/"}>
        <Logo className="text-2xl px-3" />
      </Link>

      <ul className="flex flex-col mt-4 ">
        {SIDEBAR_LINKS.map(({ link, name, icon: Icon }) => (
          <li
            key={name}
            className="border-b border-gray-200  dark:border-b-gray-600"
          >
            <NavLink
              to={`/admin${link}`}
              className={({ isActive }) => handleActiveLink(isActive, link)}
            >
              <Icon size={22} />
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="mt-auto w-full flex justify-center items-center gap-2 ms-auto">
        <DropDown
          trigger={
            user?.image ? (
              <div className="flex items-center gap-2  cursor-pointer hover:text-primary duration-200">
                <img
                  src={user?.image}
                  alt="user"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-xs font-medium">
                    {user?.firstName} {user?.secondName}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    @{user?.email.slice(0, user?.email.indexOf("@"))}
                  </p>
                </div>
                <ChevronDown size={16} />
              </div>
            ) : (
              <UserCircle2 size={30} className=" cursor-pointer" />
            )
          }
        >
          <DropdownMenuItem
            className="[&:hover]:text-destructive p-1 cursor-pointer outline-none duration-300 !w-full flex-1"
            onClick={handleSignout}
          >
            Logout
          </DropdownMenuItem>
        </DropDown>
      </div>
    </div>
  );
};

export default Sidebar;
