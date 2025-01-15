import { Product as IProduct, IQuery } from "@/interfaces";
import Product from "./Product";
import useCustomQuery from "@/hooks/use-cutstom-query";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "@/app/slices/ProductsSlice";
import ProductsSkeleton from "./ProductsSkeleton";
import Pagination from "@/components/Pagination";

function ProductsList() {
  const INDEX = Number(sessionStorage.getItem("productsIndex") || 1);
  const PAGE_SIZE = 12;
  const [pageIndex, setPageIndex] = useState(INDEX);

  const { data: products, isLoading } = useCustomQuery<IQuery<IProduct>>({
    url: `/product/get-all-products?pageIndex=${pageIndex}&pageSize=${PAGE_SIZE}`,
    key: ["products", `${pageIndex}`],
  });
  const dispatch = useDispatch();
  const productsListSecion = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (products) {
      dispatch(setProducts(products.data));
    }
  }, [products]);

  useEffect(() => {
    sessionStorage.setItem("productsIndex", pageIndex.toString());
  }, [pageIndex]);

  const scrollToTop = () => {
    productsListSecion.current?.scrollIntoView();
  };

  return (
    <div className="container py-20" ref={productsListSecion}>
      <h2 className="mb-6 text-primary text-4xl font-bold" data-aos="fade-up">
        Our Products
      </h2>
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center [&:hover>:not(&>:hover)_img]:opacity-70">
        {!isLoading ? (
          products?.data?.map((product) => (
            <Product product={product} key={product.id} />
          ))
        ) : (
          <ProductsSkeleton />
        )}
      </div>
      <Pagination
        {...{ data: products, pageIndex, setPageIndex, scrollToTop }}
      />
    </div>
  );
}

export default ProductsList;
