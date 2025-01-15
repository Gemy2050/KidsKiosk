import ErrorMessage from "@/components/ErrorMessage";
import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/config/axios.config";
import { useToast } from "@/hooks/use-toast";
import { IAxiosError } from "@/interfaces";
import { LoginFormData, loginSchema } from "@/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { AxiosError } from "axios";
import { EyeClosed, EyeIcon } from "lucide-react";
import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [passwordType, setPasswordType] = useState("password");
  const [disabled, setDisabled] = useState(false);
  const signIn = useSignIn();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const handleLoginForm: SubmitHandler<LoginFormData> = async (formData) => {
    try {
      const { status, data } = await axiosInstance.post(
        "/account/login",
        formData
      );

      if (status === 200) {
        signIn({
          auth: {
            token: data.token,
            type: "Bearer",
          },
          userState: data,
        });

        navigate("/", { replace: true });
      }
    } catch (err) {
      const error = err as AxiosError<IAxiosError>;

      toast({
        title: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
      if (error.response?.data.message.includes("not confirmed")) {
        axiosInstance.get(`/account/resend-otp?email=${formData.email}`);
        sessionStorage.removeItem("time");
        navigate("/verificationWithOtp", {
          state: { email: formData.email, time: 2 * 60 * 1000 },
        });
      }
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    try {
      setDisabled(true);

      const tokenId = credentialResponse.credential;
      // Send token to backend API to verify and handle login
      const { status, data } = await axiosInstance.post(
        "/account/google-signin",
        { idToken: tokenId }
      );

      if (status === 200) {
        signIn({
          auth: {
            token: data.returnedUser.token,
            type: "Bearer",
          },
          userState: { ...data.returnedUser, isGoogleUser: true },
        });
        navigate("/", { replace: true });
      }
    } catch (error) {
      const axiosError = error as AxiosError<IAxiosError>;
      toast({
        title: axiosError.response?.data.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setDisabled(false);
    }
  };

  const handleGoogleLoginFailure = () => {
    toast({
      title: "Login failed with Google",
      variant: "destructive",
    });
  };

  const togglePasswordType = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  return (
    <form
      className="flex flex-col gap-4 w-[400px] max-w-full mx-auto md:mx-0"
      data-aos="fade-right"
      onSubmit={handleSubmit(handleLoginForm)}
    >
      <div>
        <label htmlFor="email">Email</label>
        <Input
          {...register("email")}
          type="email"
          placeholder="email@example.com"
          id="email"
          className="p-3 mt-1"
        />
        <ErrorMessage message={errors.email?.message} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <div className="relative ">
          <Input
            {...register("password")}
            type={passwordType}
            placeholder="Password"
            id="password"
            className="p-3 pe-[35px] mt-1"
          />
          {passwordType === "password" ? (
            <EyeIcon
              onClick={togglePasswordType}
              className="text-gray-500 absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
            />
          ) : (
            <EyeClosed
              onClick={togglePasswordType}
              className="text-gray-500 absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
            />
          )}
        </div>
        <ErrorMessage message={errors.password?.message} />
      </div>
      <Link to="/forgetPassword" className="ms-auto w-fit">
        Forget Password?
      </Link>
      <Button
        size="lg"
        className="border-[#DADADA] border py-6 mt-1 disabled:opacity-60"
        disabled={isSubmitting || disabled}
      >
        Sign in
      </Button>

      {/* Separator */}
      <div className="mt-4 flex items-center gap-4">
        <hr className="w-full" />
        <span>or</span>
        <hr className="w-full" />
      </div>

      {/* Google Auth */}
      <div className="relative flex items-center justify-center gap-10 rounded-[10px] [&:hover>button]:!bg-secondary duration-300">
        <Button
          variant={"outline"}
          fullWidth
          className="gap-4"
          disabled={isSubmitting || disabled}
        >
          <img
            src="/imgs/google.svg"
            alt="google"
            className="w-6"
            width={24}
            height={24}
          />
          Continue with Google
        </Button>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          {(!isSubmitting || !disabled) && (
            <div className=" absolute top-0 left-0 w-full h-full opacity-0">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginFailure}
                text="continue_with"
                shape="pill"
                size="large"
              />
            </div>
          )}
        </GoogleOAuthProvider>
      </div>
    </form>
  );
}

export default Login;
