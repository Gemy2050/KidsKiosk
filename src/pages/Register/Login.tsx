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
import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { SubmitHandler, useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [passwordType, setPasswordType] = useState("password");
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
        "/Account/login",
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
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    const tokenId = credentialResponse.credential;
    console.log(credentialResponse);

    try {
      // Send token to your backend API to verify and handle login
      const { status, data } = await axiosInstance.post(
        "/Account/google-signin",
        {
          idToken: tokenId,
          clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          redirectUrl: location.origin,
        }
      );

      if (status === 200) {
        signIn({
          auth: {
            token: data.returnedUser.token,
            type: "Bearer",
          },
          userState: data.returnedUser,
        });
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Login failed", error);
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
          <img
            src="../../../public/icons/eye.svg"
            alt="eye"
            className="absolute right-3 w-5 top-[50%] translate-y-[-45%] cursor-pointer"
            onClick={togglePasswordType}
          />
        </div>
        <ErrorMessage message={errors.password?.message} />
      </div>
      <Link to="#" className="ms-auto w-fit">
        Forget Password?
      </Link>
      <Button
        size="lg"
        className="border-[#DADADA] border py-6 mt-1 disabled:opacity-60"
        disabled={isSubmitting}
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
          disabled={isSubmitting}
        >
          <img src="../../../public/imgs/google.svg" alt="" className="w-6" />
          Continue with Google
        </Button>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          {!isSubmitting && (
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
