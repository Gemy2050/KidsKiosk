import { Product as IProduct } from "@/interfaces";
import Product from "./Product";
import useCustomQuery from "@/hooks/use-cutstom-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "@/app/slices/ProductsSlice";
import ProductsSkeleton from "./ProductsSkeleton";

interface IQuery {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IProduct[];
}

function ProductsList() {
  const { data: products, isLoading } = useCustomQuery<IQuery>({
    url: "/product/get-all-products?pageIndex=1&pageSize=24",
    key: ["products"],
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center">
        {!isLoading ? (
          products?.data?.map((product) => (
            <Product product={product} key={product.id} />
          ))
        ) : (
          <ProductsSkeleton />
        )}
      </div>
    </div>
  );
}

export default ProductsList;
