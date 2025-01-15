import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import { PROFILE_FORM } from "@/data/forms";
import { type ProfileFormData, profileSchema } from "@/validation";
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
import { getImagePreviewUrl } from "@/utils/imageUtils";
import { addObjectToFormData } from "@/utils/functions";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { Navigate } from "react-router-dom";

function Profile() {
  const { toast } = useToast();
  const signIn = useSignIn();
  const user: IUser = useAuthUser()!;

  if (!user) {
    toast({
      title: "Cannot access profile page in guest mode",
      variant: "destructive",
    });
    return <Navigate to="/" replace />;
  }

  const {
    id,
    firstName,
    secondName,
    phone,
    address,
    image,
    token,
    isGoogleUser,
  } = user;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      firstName,
      secondName,
      phone: phone || "",
      address: address || "",
      image,
    },
  });

  const imageValue = watch("image");

  const onSubmit: SubmitHandler<ProfileFormData> = async (
    formObj: ProfileFormData
  ) => {
    const sameData = Object.entries(formObj).every(
      ([key, value]) => value === user[key as keyof IUser]
    );

    if (sameData) {
      toast({
        title: "No Change in Your Information",
        variant: "success",
      });
      return;
    }

    const formData = new FormData();

    addObjectToFormData({ formData, data: { id, isGoogleUser, ...formObj } });

    try {
      const { data, status } = await axiosInstance.put(
        "/account/update-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if ([200, 201].includes(status)) {
        signIn({
          auth: {
            token: token,
            type: "Bearer",
          },
          userState: { ...user, ...data },
        });

        setValue("image", data.image);

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

  const renderProfileForm = PROFILE_FORM.map(({ name, placeholder, type }) => (
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
    <div className="container min-h-[calc(100dvh-64px)] md:min-h-[calc(100dvh-72px)] relative mx-auto py-8">
      <h1
        className="text-[28px] sm:text-[40px] text-center md:text-start font-semibold mb-8"
        data-aos="fade-left"
      >
        Profile Info
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
              ? getImagePreviewUrl(imageValue[0])
              : image
          }
          alt="user image"
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
