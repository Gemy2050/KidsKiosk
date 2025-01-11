import useCustomQuery from "./use-cutstom-query";
import { Product } from "@/interfaces";

interface IQuery {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: Product[];
}

function useGetProducts({ pageIndex = 1, pageSize = 10 }) {
  const productsMethods = useCustomQuery<IQuery>({
    key: ["getAllProducts", `${pageIndex}`],
    url: `/product/get-all-products?pageSize=${pageSize}&pageIndex=${pageIndex}`,
  });

  return {
    ...productsMethods,
  };
}

export default useGetProducts;
