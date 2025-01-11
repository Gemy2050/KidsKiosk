import { useDispatch, useSelector } from "react-redux";
import useCustomQuery from "./use-cutstom-query";
import { Category } from "@/interfaces";
import { RootState } from "@/app/store";
import { useEffect } from "react";
import { setCategories } from "@/app/slices/categoriesSlice";

function useGetCategories() {
  const { categories: categoriesSlice } = useSelector(
    (state: RootState) => state.categories
  );
  const dispatch = useDispatch();

  const { data, ...rest } = useCustomQuery<Category[]>({
    key: ["getAllCategories"],
    url: "/category/get-all-categories",
    options: {
      enabled: !categoriesSlice.length,
    },
  });

  const categories = categoriesSlice.length ? categoriesSlice : data;

  useEffect(() => {
    if (data && !categoriesSlice.length) {
      dispatch(setCategories(data));
    }
  }, [data]);

  return {
    data: categories,
    ...rest,
  };
}

export default useGetCategories;
