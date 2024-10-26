import { IProduct } from "@/interfaces";
import Product from "./Product";
import useCustomQuery from "@/hooks/use-cutstom-query";

function ProductsList() {
  const {
    data: products,
    error,
    isLoading,
  } = useCustomQuery<IProduct[]>({
    url: "https://fakestoreapi.com/products",
    key: ["products"],
  });

  console.log({ products, error, isLoading });

  return (
    <div className="container py-20">
      <h2 className="mb-6 text-primary text-4xl font-bold" data-aos="fade-up">
        Our Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center">
        {products?.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default ProductsList;
