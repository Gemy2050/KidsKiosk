import useCustomQuery from "./use-cutstom-query";
import { IQuery, Product } from "@/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useEffect } from "react";
import { setProducts } from "@/app/slices/ProductsSlice";

function useGetProducts({
  pageIndex,
  pageSize,
}: {
  pageIndex?: number;
  pageSize?: number;
}) {
  const { products: productsSlice } = useSelector(
    (state: RootState) => state.products
  );
  const dispatch = useDispatch();

  const { data, ...rest } = useCustomQuery<IQuery<Product>>({
    key: ["getAllProducts"],
    url: `/product/get-all-products?pageSize=${pageSize}&pageIndex=${pageIndex}`,
    options: {
      enabled: !productsSlice.length,
    },
  });

  const products = productsSlice.length ? productsSlice : data;

  useEffect(() => {
    if (data && !productsSlice.length) {
      dispatch(setProducts(data.data));
    }
  }, [data]);

  return {
    data: { ...data, data: products },
    ...rest,
  };
}

export default useGetProducts;
