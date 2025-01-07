import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import { REGISTER_FORM } from "@/data";
import { type RegisterFormData, registerSchema } from "@/validation";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "@/components/ErrorMessage";
import axiosInstance from "@/config/axios.config";
import { AxiosError } from "axios";
import { IAxiosError, IUser } from "@/interfaces";
import { useToast } from "@/hooks/use-toast";
import InputGroup from "@/components/InputGroup";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Popup from "@/components/Popup";

function Profile() {
  const { toast } = useToast();
  // const [user, setUser] = useState<IUser | null>(null);
  const { firstName, secondName, email, phone, address, image }: IUser =
    useAuthUser()!;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName,
      secondName,
      email,
      phone: phone || "",
      address: address || "",
      image,
    },
  });

  const imageValue = watch("image");

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       const { data } = await axiosInstance.get("/account/profile");
  //       setUser(data);
  //       reset({
  //         firstName: data.firstName,
  //         secondName: data.secondName,
  //         email: data.email,
  //         phone: data.phone || "",
  //         address: data.address || "",
  //       });
  //     } catch (err) {
  //       const error = err as AxiosError<IAxiosError>;
  //       toast({
  //         title: error.response?.data?.message || "Failed to fetch profile",
  //         variant: "destructive",
  //       });
  //     }
  //   };
  //   fetchUserProfile();
  // }, [reset, toast]);

  const onSubmit: SubmitHandler<RegisterFormData> = async (formObj) => {
    const formData = new FormData();

    Object.entries(formObj).forEach(([key, value]) => {
      if (key === "image" && value instanceof FileList) {
        formData.append(key, value[0]);
        return;
      }

      if (typeof value === "object" && value !== null) {
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          formData.append(`${key}[${nestedKey}]`, String(nestedValue));
        });
      } else {
        formData.append(key, String(value));
      }
    });

    try {
      const { status } = await axiosInstance.put("/account/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if ([200, 201].includes(status)) {
        // setUser(data);
        toast({
          title: "Profile updated successfully",
          variant: "success",
        });
      }
    } catch (err) {
      const error = err as AxiosError<IAxiosError>;
      toast({
        title: error.response?.data?.message || "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const renderProfileForm = REGISTER_FORM.filter(
    (field) => field.name !== "confirmedPassword" && field.name !== "password"
  ).map(({ name, placeholder, type }) => (
    <div
      key={name}
      className={`${
        ["firstName", "secondName"].includes(name)
          ? "w-full sm:w-[47.5%]"
          : "w-full"
      }`}
    >
      <InputGroup
        {...(type === "file" && {
          imageUrl: image,
          image: imageValue instanceof FileList ? imageValue[0] : null,
        })}
      >
        <label htmlFor={name}>{placeholder}</label>
        <Input type={type} placeholder={placeholder} {...register(name)} />
      </InputGroup>
      <ErrorMessage message={errors[name]?.message} />
    </div>
  ));

  return (
    <div className="container min-h-[calc(100dvh-72px)] relative mx-auto py-8">
      <h1
        className="text-[28px] sm:text-[40px] text-center md:text-start font-semibold mb-8"
        data-aos="fade-right"
      >
        Profile Settings
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-between flex-wrap gap-5 w-[470px] max-w-full mx-auto md:mx-0"
        data-aos="fade-right"
      >
        {renderProfileForm}

        <Button
          size="lg"
          className="border disabled:cursor-no-drop disabled:opacity-60 w-full"
          disabled={isSubmitting}
        >
          Update Profile
        </Button>
      </form>
      {/* Popup */}
      <Popup>
        <img
          src={
            imageValue instanceof FileList
              ? URL.createObjectURL(imageValue[0])
              : image
          }
          alt="Product"
          className="object-contain h-full w-full"
        />
      </Popup>
      <img
        src={"/imgs/circle.svg"}
        className="hidden md:block w-[120px] fixed top-32 right-0 z-[-1]"
        alt="circle"
        width={120}
        height={185}
      />
      <img
        src={"/imgs/square.svg"}
        className="hidden md:block md:w-[200px] fixed bottom-0 right-0 z-[-1]"
        alt="square shape"
        width={200}
        height={215}
      />
    </div>
  );
}

export default Profile;
