import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import { REGISTER_FORM } from "@/data";
import { type RegisterFormData, registerSchema } from "@/validation";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "@/components/ErrorMessage";
import axiosInstance from "@/config/axios.config";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { IAxiosError } from "@/interfaces";
import { useToast } from "@/hooks/use-toast";

function Signup() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (formObj) => {
    const bodyData = {
      ...formObj,
      address: {
        street: "0",
        city: "0",
        country: "0",
      },
      redirectUrl: location.origin + "/login",
    };

    const formData = new FormData();

    Object.entries(bodyData).forEach(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        // Handle nested objects
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          formData.append(`${key}[${nestedKey}]`, nestedValue);
        });
      } else {
        formData.append(key, value);
      }
    });

    try {
      const { status } = await axiosInstance.post(
        "/Account/Register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (status == 200) {
        navigate("/login", { replace: true });
        toast({
          title:
            "Account created successfully, please verify your email and login",
          description: "We have sent you an email",
          variant: "success",
        });
      }
    } catch (err) {
      const error = err as AxiosError<IAxiosError>;
      toast({
        title: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const renderSignupForm = REGISTER_FORM.map(({ name, placeholder, type }) => (
    <div key={name}>
      <Input
        type={type}
        key={name}
        placeholder={placeholder}
        {...register(name)}
      />
      <ErrorMessage message={errors[name]?.message} />
    </div>
  ));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 w-[470px] max-w-full mx-auto md:mx-0"
      data-aos="fade-right"
    >
      {renderSignupForm}

      <Button
        size="lg"
        className=" border disabled:cursor-no-drop disabled:opacity-60"
        disabled={isSubmitting}
      >
        Sign up
      </Button>
    </form>
  );
}

export default Signup;
