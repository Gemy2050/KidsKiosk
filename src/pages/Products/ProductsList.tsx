import { Product as IProduct } from "@/interfaces";
import Product from "./Product";
import useCustomQuery from "@/hooks/use-cutstom-query";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "@/app/slices/ProductsSlice";
import ProductsSkeleton from "./ProductsSkeleton";
import Pagination from "@/components/Pagination";

interface IQuery {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IProduct[];
}

function ProductsList() {
  const INDEX = sessionStorage.getItem("pageIndex")
    ? Number(sessionStorage.getItem("pageIndex"))
    : 1;
  const PAGE_SIZE = 12;
  const [pageIndex, setPageIndex] = useState(INDEX);

  const { data: products, isLoading } = useCustomQuery<IQuery>({
    url: `/product/get-all-products?pageIndex=${pageIndex}&pageSize=${PAGE_SIZE}`,
    key: ["products", `${pageIndex}`],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (products) {
      dispatch(setProducts(products.data));
    }
  }, [products]);

  return (
    <div className="container py-20">
      <h2 className="mb-6 text-primary text-4xl font-bold" data-aos="fade-up">
        Our Products
      </h2>
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center">
        {!isLoading ? (
          products?.data?.map((product) => (
            <Product product={product} key={product.id} />
          ))
        ) : (
          <ProductsSkeleton />
        )}
      </div>
      <Pagination {...{ data: products, pageIndex, setPageIndex }} />
    </div>
  );
}

export default ProductsList;
