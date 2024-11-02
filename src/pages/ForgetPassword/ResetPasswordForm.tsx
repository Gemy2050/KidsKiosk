import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/config/axios.config";
import { useToast } from "@/hooks/use-toast";
import { IAxiosError } from "@/interfaces";
import { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const { password, confirmPassword, otp } = e.currentTarget;
      const email = searchParams.get("email");

      const { data } = await axiosInstance.post(`/Account/resetPassword`, {
        email: email,
        newPassword: password.value,
        confirmedNewPassword: confirmPassword.value,
        otp: otp.value,
      });

      toast({
        title: data.message,
        variant: "success",
      });
      navigate("/login");
    } catch (err) {
      const error = err as AxiosError<IAxiosError>;
      toast({
        title: error.response?.data.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[400px] max-w-full mx-auto md:mx-0"
    >
      <div data-aos="fade-right">
        <h2 className="text-2xl md:text-3xl lg:text-4xl mb-2 font-semibold flex items-center gap-2">
          Forget Password
        </h2>
        <p className="text-gray-400 mb-3">
          Enter the otp code and the new password
        </p>
        <label htmlFor="otp">OTP Code</label>
        <Input
          type="number"
          placeholder="OTP code"
          id="otp"
          className="p-3 mt-1 mb-3"
          maxLength={6}
          minLength={6}
        />
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          placeholder="your Password"
          id="password"
          className="p-3 mt-1 mb-3"
          minLength={8}
          maxLength={18}
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <Input
          type="password"
          placeholder="Confirm Password"
          id="confirmPassword"
          className="p-3 mt-1 mb-3"
          minLength={8}
          maxLength={18}
        />
        <Button fullWidth disabled={isLoading}>
          Submit
        </Button>
      </div>
    </form>
  );
}

export default ResetPasswordForm;
