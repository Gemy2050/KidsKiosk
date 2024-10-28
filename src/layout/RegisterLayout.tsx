import Logo from "@/components/Logo";
import RegisterHeader from "@/pages/Register/Header";
import { User } from "@/types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Navigate, Outlet } from "react-router-dom";

function RegisterLayout() {
  const authUser: User = useAuthUser();

  if (authUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="min-h-screen flex flex-col">
      <RegisterHeader />
      <main className="relative container pt-8 pb-3 h-full">
        <h2
          className="text-[28px] sm:text-[40px] text-center md:text-start font-semibold mb-5"
          data-aos="fade-right"
        >
          Welcome to <Logo />
        </h2>
        <Outlet />
      </main>
      <img
        src={"/imgs/circle.svg"}
        className="hidden md:block w-[120px] fixed top-32 right-0 z-[-1]"
        alt="circle"
      />
      <img
        src={"/imgs/square.svg"}
        className="w-[150px] md:w-[200px] fixed bottom-0 right-0 z-[-1]"
        alt="square shape"
      />
    </section>
  );
}

export default RegisterLayout;
