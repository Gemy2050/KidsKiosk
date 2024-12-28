import ErrorMessage from "@/components/ErrorMessage";
import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/config/axios.config";
import { RESET_FORM } from "@/data";
import { useToast } from "@/hooks/use-toast";
import { IAxiosError } from "@/interfaces";
import { ResetPasswordFormData, resetPasswordSchema } from "@/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const email = searchParams.get("email");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(resetPasswordSchema),
  });

  const handleFormSubmit: SubmitHandler<ResetPasswordFormData> = async (
    formData
  ) => {
    try {
      const { data } = await axiosInstance.post(`/account/resetPassword`, {
        email: email,
        ...formData,
      });
      toast({
        title: data.message,
        variant: "success",
      });
      navigate("/login");
    } catch (err) {
      const error = err as AxiosError<IAxiosError>;
      const errorMessage =
        error.response?.data.message || "Something went wrong";
      toast({
        title: errorMessage,
        variant: "destructive",
      });
    }
  };

  //* Render the form inputs
  const renderInputs = RESET_FORM.map(({ name, placeholder, type }) => (
    <div key={name} className="mb-3">
      <label htmlFor={name}>{placeholder}</label>
      <Input
        type={type}
        placeholder={placeholder}
        id={name}
        className="p-3 mt-1"
        {...register(name)}
      />
      <ErrorMessage message={errors[name]?.message} />
    </div>
  ));

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-[400px] max-w-full mx-auto md:mx-0"
    >
      <div data-aos="fade-right">
        <h2 className="text-2xl md:text-3xl lg:text-4xl mb-2 font-semibold flex items-center gap-2">
          Reset Password
        </h2>
        <p className="text-gray-400 mb-3">
          Enter the otp code and the new password
        </p>
        {renderInputs}
        <Button fullWidth disabled={isSubmitting}>
          Submit
        </Button>
      </div>
    </form>
  );
}

export default ResetPasswordForm;
