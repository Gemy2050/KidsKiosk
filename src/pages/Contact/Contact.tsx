import ErrorMessage from "@/components/ErrorMessage";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/config/axios.config";
import { CONTACT_FORM } from "@/data";
import { useToast } from "@/hooks/use-toast";
import { addObjectToFormData } from "@/utils/functions";
import { ContactFormData, contactSchema } from "@/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Facebook, Github, Linkedin, Phone } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({ resolver: yupResolver(contactSchema) });
  const { toast } = useToast();

  const onSubmit: SubmitHandler<ContactFormData> = async (formObj) => {
    try {
      const formData = new FormData();
      addObjectToFormData({ data: formObj, formData });
      await axiosInstance.post("/contact", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast({
        title: "Message Sent Successfully",
        variant: "success",
      });
      reset();
    } catch (error) {
      toast({
        title: "Failed to send message",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen  items- justify-center">
      <div className="container  flex-col md:flex-row justify-center gap-8 p-4">
        <h1
          className="text-[28px] w-full flex-1 flex-shrink-0 sm:text-[40px] text-center font-semibold mb-8"
          data-aos="fade-left"
        >
          Contact Us
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10 w-full max-w-">
          <div
            className="flex w-[450px] md:w-auto max-w-full flex-row md:flex-col gap-5 justify-between aos-init aos-animate"
            data-aos="zoom-in-left"
          >
            <a
              className="[&:hover>svg]:rotate-[360deg] flex justify-center items-center w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-md bg-background  border border-gray-300  hover:border-primary hover:ring-2 hover:ring-primary hover:shadow-xl hover:shadow-primary duration-300"
              href="https://www.facebook.com/profile.php?id=100013438807065"
              target="_blank"
            >
              <Facebook size={30} className="duration-500" />
            </a>
            <a
              className="[&:hover>svg]:rotate-[360deg] flex justify-center items-center w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-md bg-background  border border-gray-300 hover:border-primary  hover:ring-2 hover:ring-primary hover:shadow-xl hover:shadow-primary duration-300"
              href="https://wa.me/201021595806"
              target="_blank"
            >
              <Phone size={30} className="duration-500" />
            </a>
            <a
              className="[&:hover>svg]:rotate-[360deg] flex justify-center items-center w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-md bg-background  border border-gray-300 hover:border-primary  hover:ring-2 hover:ring-primary hover:shadow-xl hover:shadow-primary duration-300"
              href="https://www.linkedin.com/in/mohamed-gamal-18a006225"
              target="_blank"
            >
              <Linkedin size={30} className="duration-500" />
            </a>
            <a
              className="[&:hover>svg]:rotate-[360deg] flex justify-center items-center w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-md bg-background  border border-gray-300 hover:border-primary  hover:ring-2 hover:ring-primary hover:shadow-xl hover:shadow-primary duration-300"
              href="https://github.com/gemy2050"
              target="_blank"
            >
              <Github size={30} className="duration-500" />
            </a>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 w-[450px] max-w-full"
            data-aos="fade-right"
          >
            {CONTACT_FORM.map(({ name, placeholder, type }) =>
              type === "textarea" ? (
                <div key={name}>
                  <Textarea
                    placeholder={placeholder}
                    {...register(name)}
                  ></Textarea>
                  <ErrorMessage message={errors[name]?.message} />
                </div>
              ) : (
                <div key={name}>
                  <Input
                    placeholder={placeholder}
                    type={type}
                    {...register(name)}
                  />
                  <ErrorMessage message={errors[name]?.message} />
                </div>
              )
            )}
            <Button type="submit" disabled={isSubmitting} size="lg" fullWidth>
              Send Message
            </Button>
          </form>
        </div>
      </div>
      <img
        src={"/imgs/square.svg"}
        className="w-[150px] md:w-[200px] fixed bottom-0 right-[-40px] z-[-1]"
        alt="square shape"
      />
      <img
        src={"/imgs/square.svg"}
        className="w-[150px] md:w-[200px] hidden md:block fixed top-0 left-0 z-[-1] rotate-180"
        alt="square shape"
      />
    </div>
  );
};

export default Contact;
