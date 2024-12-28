import Input from "@/components/Input";
import LinkButton from "@/components/LinkButton";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/config/axios.config";
import { useToast } from "@/hooks/use-toast";
import { IAxiosError } from "@/interfaces";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CornerUpRight } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddImages() {
  const [images, setImages] = useState<File[]>([]);
  const [disabled, setDisabled] = useState(false);
  const { toast } = useToast();
  const { productId } = useParams();
  const navigate = useNavigate();
  const QyeryClient = useQueryClient();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages((prev) => [...prev, ...Array.from(files)]);
    }
  };

  async function addProductImages() {
    try {
      setDisabled(true);

      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images", image);
      });
      formData.append("productId", String(productId));

      await axiosInstance.post("/productImage/add-many-images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setImages([]);
      QyeryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
      toast({
        title: "Product Images Added Successfully",
        variant: "success",
      });
    } catch (err) {
      const error = err as AxiosError<IAxiosError>;

      toast({
        title: error.response?.data.message || "Something went wrong",
        description: "Failed to add product images",
        variant: "destructive",
      });
      navigate("/admin/products", { replace: true });
    } finally {
      setDisabled(false);
    }
  }

  const deleteImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <PageTitle>
        <h2 className="text-lg sm:text-2xl">Add Product Images</h2>
        <LinkButton size="sm" to="/admin/products">
          <CornerUpRight size={40} strokeWidth={2.5} />
        </LinkButton>
      </PageTitle>
      <div className="mt-2 p-5 pt-7 rounded-lg bg-background">
        <div className=" mb-5">
          <label
            htmlFor="imageInput"
            className="bg-gray-500 w-[100px] h-[100px] text-[50px] flex items-center justify-center text-white cursor-pointer rounded-sm"
          >
            +
          </label>
          <Input
            id="imageInput"
            type="file"
            className="hidden"
            multiple
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt="product"
                className=" h-[150px] w-full rounded-sm"
              />
              <button
                onClick={() => deleteImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 flex items-center justify-center p-1 rounded-full"
              >
                x
              </button>
            </div>
          ))}
        </div>

        <Button
          size={"lg"}
          rounded={"md"}
          className="mt-10 text-base font-bold"
          disabled={disabled}
          onClick={addProductImages}
        >
          Add Images
        </Button>
      </div>
    </div>
  );
}

export default AddImages;
