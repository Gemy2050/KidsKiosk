import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/config/axios.config";
import { useToast } from "@/hooks/use-toast";
import { IAxiosError } from "@/interfaces";
import { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function EmailForm() {
  const [, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const email = e.currentTarget.email.value;
      const { data } = await axiosInstance.post(
        `/Account/forgotPassword?email=${email}`
      );
      setSearchParams({ form: "resetPassword", email });
      toast({
        title: data.message,
        variant: "success",
      });
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
        <h2 className="text-2xl md:text-3xl lg:text-4xl my-2 font-semibold flex items-center gap-2">
          Forget Password
        </h2>
        <p className="text-gray-400 mb-3">
          Enter you email to recover password
        </p>
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          placeholder="your email"
          id="email"
          className="p-3 mt-1 mb-3"
          required
        />
        <Button fullWidth disabled={isLoading}>
          Submit
        </Button>
      </div>
    </form>
  );
}
