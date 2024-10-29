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
      if (error.status === 401) {
        axiosInstance.get(`/Account/resend-otp?email=${formData.email}`);
        sessionStorage.removeItem("time");
        navigate("/verificationWithOtp", {
          state: { email: formData.email, time: 2 * 60 * 1000 },
        });
      }
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    const tokenId = credentialResponse.credential;

    try {
      // Send token to backend API to verify and handle login
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
      const axiosError = error as AxiosError<IAxiosError>;
      toast({
        title: axiosError.response?.data.message || "Something went wrong",
        variant: "destructive",
      });
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

  //* Only For Demo.. Remove it Later
  const BrowseDemo = () => {
    signIn({
      auth: {
        token:
          "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJtbzI3MjAzNTJAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6Ik1vaGFtZWQiLCJleHAiOjE3MzAzMzIwODQsImlzcyI6Imh0dHA6Ly9raWRza2lvc2sucnVuYXNwLm5ldCIsImF1ZCI6Ik15c2VjdXJpdHlLZXkifQ.x6Ui0qiLOBl9MbAHcwhuJONVGdWzfSACopF9hETw2Mo",
        type: "Bearer",
      },
      userState: {
        id: "1",
        email: "email@example.com",
        name: "John Doe",
        role: "user",
        token: "token",
      },
    });
    navigate("/", { replace: true });
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
          <img src="/imgs/google.svg" alt="google" className="w-6" />
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
      <Button type="button" onClick={BrowseDemo}>
        Browse Demo
      </Button>
    </form>
  );
}

export default Login;
