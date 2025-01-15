import axiosInstance from "@/config/axios.config";

export async function addNewCategory(
  categoryName: string,
  description: string
) {
  const response = await axiosInstance.post(
    `/category/add-category?categoryName=${categoryName}&description=${description}`
  );

  return response;
}

export async function editCategory({
  catId,
  categoryName,
  description,
}: {
  catId: string;
  categoryName: string;
  description: string;
}) {
  const response = await axiosInstance.put(
    `/category/update-category?id=${catId}&categoryName=${categoryName}&description=${description}`
  );

  return response;
}

export async function deleteCategory(id: any) {
  const response = await axiosInstance.delete(
    `/category/delete-category?id=${id}`
  );

  return response;
}
