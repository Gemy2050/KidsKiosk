import { useSearchParams } from "react-router-dom";
import EmailForm from "./EmailForm";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ForgetPassword() {
  const [searchParams] = useSearchParams();
  return (
    <main className="relative pt-32 pb-10">
      <img
        className="fixed top-0 w-full h-[150px] z-[-1]"
        src="/imgs/pill-shape.png"
        alt="shape"
        width={100}
        height={200}
      />
      <div className="container pt-8 pb-5 rounded-lg">
        <div className="mt-5 flex flex-col md:flex-row justify-center items-center gap-10 lg:gap-28">
          {searchParams.get("form") === "resetPassword" ? (
            <ResetPasswordForm />
          ) : (
            <EmailForm />
          )}
          <img
            src="/imgs/forget-password.png"
            alt="forget password"
            className="hidden md:block md:w-[350px] xl:w-[400px] max-w-full mx-auto md:mx-0"
            width={400}
            height={200}
          />
        </div>
      </div>
    </main>
  );
}
