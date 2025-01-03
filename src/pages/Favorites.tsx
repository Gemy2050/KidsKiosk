import Product from "./Products/Product";
import { Product as IProduct } from "@/interfaces";
import useCustomQuery from "@/hooks/use-cutstom-query";
import { Heart } from "lucide-react";

export default function Favorites() {
  const { data: products } = useCustomQuery<IProduct[]>({
    url: "/product/get-all-products",
    key: ["getAllProducts", "favorites"],
  });
  return (
    <main className="relative pt-32  pb-20">
      <img
        className="fixed top-0 w-full h-[200px] z-[-1]"
        src="/imgs/pill-shape.png"
        alt="shape"
        width={100}
        height={200}
      />
      <div className="container py-10 sm:px-10 bg-secondary rounded-lg">
        <h2
          data-aos="fade-up"
          className="text-2xl sm:text-4xl mb-8 font-semibold flex items-center gap-2"
        >
          Favorites <Heart size={30} />
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center">
          {products?.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
