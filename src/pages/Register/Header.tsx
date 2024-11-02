import Logo from "@/components/Logo";
import { Link, useLocation } from "react-router-dom";

function RegisterHeader() {
  const location = useLocation();
  return (
    <header className="sticky top-0 z-20 bg-background text-foreground py-[17px] border-b border-border">
      <div className="container flex justify-between items-center">
        <Link to="/">
          <Logo className="text-[20px] sm:text-2xl" />
        </Link>
        <div>
          {location.pathname === "/login" ? (
            <>
              No account?{" "}
              <Link to="/signup" className="text-primary font-bold">
                Sign up
              </Link>
            </>
          ) : (
            <>
              Have an account?{" "}
              <Link to="/login" className="text-primary font-bold">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default RegisterHeader;
