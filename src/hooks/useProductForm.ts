import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProductForm, productForm } from "@/validation";

export function useProductForm() {
  const methods = useForm<ProductForm>({
    resolver: yupResolver(productForm),
    defaultValues: {
      hasDiscount: "No",
      colors: [
        {
          id: 0,
          color: "",
          sizes: [{ id: 0, size: "", quantity: "" }],
        },
      ],
    },
  });

  return methods;
}
