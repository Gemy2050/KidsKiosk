import axiosInstance from "@/config/axios.config";

export async function addProduct(product: FormData) {
  const response = await axiosInstance.post("/product/add-product", product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
}

export async function updateProduct(product: FormData) {
  const response = await axiosInstance.put(`/product/update-product`, product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
}

export async function deleteProduct(id: any) {
  const response = await axiosInstance.delete(
    `/product/delete-product?id=${id}`
  );

  return response;
}
