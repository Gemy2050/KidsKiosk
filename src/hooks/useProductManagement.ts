import { useRef } from "react";
import { Editor as TinyMCEEditor } from "tinymce";
import { useToast } from "@/hooks/use-toast";
import { addProduct, updateProduct } from "@/services/product";
import { addObjectToFormData } from "@/utils/functions";
import { Category, IAxiosError } from "@/interfaces";
import { ProductForm } from "@/validation";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import useCustomQuery from "./use-cutstom-query";
import { useProductForm } from "./useProductForm";

export function useProductManagement() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const productFormMethods = useProductForm();
  const { setValue, watch } = productFormMethods;
  const productFormData = watch();

  const { data: categories, isLoading: categoryLoading } = useCustomQuery<
    Category[]
  >({
    key: ["getAllCategories"],
    url: "/category/get-all-categories",
  });

  const addNewColorBox = () => {
    const colors = productFormData.colors || [];
    const updatedColors = [...colors];

    updatedColors.push({
      id: Date.now(),
      color: "",
      sizes: [{ id: Date.now(), size: "", quantity: "" }],
    });

    // Remove the separate setState call since setValue will handle the form state
    setValue("colors", updatedColors);
  };

  const handleAddProduct = async (productFormData: ProductForm) => {
    try {
      const productCategory =
        categories?.find((el) => el.id == productFormData.productCategoryId)
          ?.name || "";

      const description = editorRef.current?.getContent() || "";

      const image =
        productFormData.image instanceof FileList
          ? productFormData.image[0]
          : productFormData.image;

      const data = {
        ...productFormData,
        image,
        description,
        productCategory,
        priceBeforeDiscount:
          +productFormData.price + Number(productFormData.discount || 0),
        hasDiscount:
          productFormData.hasDiscount === "Yes" &&
          Number(productFormData.discount) > 0,
        variantsDto: JSON.stringify(productFormData.colors),
      };

      const formData = new FormData();

      addObjectToFormData({ data, formData });

      // Add Product
      await addProduct(formData);

      toast({
        title: "Product added successfully",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
      return true;
    } catch (error) {
      toast({
        title: "Failed to add product",
        variant: "destructive",
      });
      return false;
    }
  };

  async function handleEditProduct(
    productId: string,
    productFormData: ProductForm
  ) {
    try {
      const description = editorRef.current?.getContent() || "";
      const productCategory =
        categories?.find((el) => el.id == productFormData.productCategoryId)
          ?.name || "";

      const data = {
        ...productFormData,
        id: productId,
        description,
        productCategory,
        variantsDto: JSON.stringify(productFormData.colors),
        priceBeforeDiscount:
          +productFormData.price + Number(productFormData.discount || 0),
        hasDiscount:
          productFormData.hasDiscount === "Yes" &&
          Number(productFormData.discount) > 0,
        image:
          (productFormData.image as FileList).length > 0
            ? (productFormData.image as FileList)[0]
            : undefined,
      };

      const formData = new FormData();

      addObjectToFormData({ formData, data });

      // update Product
      await updateProduct(formData);

      toast({
        title: "Success",
        description: "Product updated successfully",
        variant: "success",
      });

      queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
      queryClient.invalidateQueries({ queryKey: ["getProduct"] });
      navigate("/admin/products");
      return true;
    } catch (err) {
      const error = err as AxiosError<IAxiosError>;
      toast({
        title: "Error",
        description: error.response?.data.message || "Something went wrong",
        variant: "destructive",
      });
      return false;
    }
  }

  return {
    editorRef,
    categories,
    categoryLoading,
    productFormMethods,
    handleAddProduct,
    handleEditProduct,
    addNewColorBox,
  };
}
