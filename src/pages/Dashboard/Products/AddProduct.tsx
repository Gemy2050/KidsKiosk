import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { CornerUpRight } from "lucide-react";
import { Fragment, useRef, useState } from "react";
import { Editor as TinyMCEEditor } from "tinymce";
import LinkButton from "@/components/LinkButton";
import useCustomQuery from "@/hooks/use-cutstom-query";
import { Category, Colors, IAxiosError, ProductFormData } from "@/interfaces";
import Loader from "@/components/Loader";
import axiosInstance from "@/config/axios.config";
import ColorBox from "@/components/ColorBox";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { ProductsForm } from "@/data";
import { renderField } from "@/utils/FormUtils";
import { useQueryClient } from "@tanstack/react-query";
import Popup from "@/components/Popup";
import { addObjectToFormData } from "@/utils/functions";

function AddProduct() {
  const [productFormData, setProductFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    productCategory: "",
    price: 0,
    hasDiscount: "No",
    discount: 0,
    productCategoryId: 0,
    image: null,
  });

  const [colors, setColors] = useState<Colors[]>([
    { id: 0, color: "", sizes: [{ id: 0, size: "", quantity: "" }] },
  ]);
  const [disabled, setDisabled] = useState(false);
  const editorRef = useRef<TinyMCEEditor>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: categories, isLoading } = useCustomQuery<Category[]>({
    key: ["getAllCategories"],
    url: "/category/get-all-categories",
  });

  // Handle field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;

    if (type === "file") {
      setProductFormData((prevData) => ({
        ...prevData,
        [name]: (e.target as HTMLInputElement).files?.[0],
      }));
      return;
    }

    setProductFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const resetInput = () => {
    setProductFormData({
      name: "",
      description: "",
      productCategory: "",
      price: 0,
      hasDiscount: "No",
      discount: 0,
      productCategoryId: 0,
      image: null,
    });
    setColors([
      { id: 0, color: "", sizes: [{ id: 0, size: "", quantity: "" }] },
    ]);
    editorRef.current?.setContent("");
    const fileInput = document.querySelector("#image") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  async function handleAddProduct() {
    try {
      setDisabled(true);

      const description = editorRef.current?.getContent() || "";
      const productCategory =
        categories?.find((el) => el.id == +productFormData.productCategoryId)
          ?.name || "";

      const sanitizedColors = colors.map(({ id, sizes, ...rest }) => ({
        ...rest,
        sizes: sizes.map(({ id, ...sizeRest }) => sizeRest),
      }));

      const data = {
        ...productFormData,
        description,
        productCategory,
        priceBeforeDiscount: +productFormData.price + +productFormData.discount,
        hasDiscount: productFormData.hasDiscount === "Yes",
        variantsDto: JSON.stringify(sanitizedColors),
      };

      const formData = new FormData();

      addObjectToFormData({ data, formData });

      await axiosInstance.post("/product/add-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Success",
        description: "Product added successfully",
        variant: "success",
      });

      resetInput();
      queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
    } catch (err) {
      const error = err as AxiosError<IAxiosError>;
      toast({
        title: "Error",
        description: error.response?.data.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setDisabled(false);
    }
  }

  const addNewColorBox = () => {
    setColors((prevColors) => [
      ...prevColors,
      {
        id: Date.now(),
        color: "",
        sizes: [{ id: Date.now(), size: "", quantity: "" }],
      },
    ]);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-0">
      <PageTitle>
        <h2 className="text-lg sm:text-2xl">Add Product</h2>
        <LinkButton to="/admin/products" size="sm" className="text-3xl">
          <CornerUpRight size={40} strokeWidth={2.5} />
        </LinkButton>
      </PageTitle>
      {/* Popup */}
      <Popup>
        <img
          src={
            productFormData.image
              ? URL.createObjectURL(productFormData.image)
              : ""
          }
          alt="Product"
          className="object-contain h-full w-full"
        />
      </Popup>
      <div className="mt-2 p-5 pt-7 rounded-lg bg-background">
        {/* Render Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8">
          {ProductsForm.map((field, idx) => (
            <Fragment key={idx}>
              {renderField({
                editorRef,
                handleChange,
                formData: productFormData,
                dynamicOptions: categories,
                field,
              })}
            </Fragment>
          ))}
        </div>

        <div className="my-8">
          <div className="mb-3 flex items-center gap-x-2">
            <h3 className="text-2xl text-gray-400">Product Colors: </h3>
            <Button
              rounded={"full"}
              className="text-2xl w-8 h-8"
              onClick={addNewColorBox}
            >
              +
            </Button>
          </div>

          {/* Render Colors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-8">
            {colors.map((el, idx) => (
              <ColorBox
                key={el.id}
                index={idx}
                colorId={el.id}
                color={el.color}
                colors={colors}
                setColors={setColors}
              />
            ))}
          </div>
        </div>

        <Button
          size={"lg"}
          rounded={"md"}
          className="mt-10 text-base font-bold"
          onClick={handleAddProduct}
          disabled={disabled}
        >
          Add Product
        </Button>
      </div>
    </div>
  );
}

export default AddProduct;
