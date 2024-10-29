import { RootState } from "@/app/store";
import Loader from "@/components/Loader";
import { Slider } from "@/components/Slider";
import { Button } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";
import useCustomQuery from "@/hooks/use-cutstom-query";
import { IProduct } from "@/interfaces";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export default function ProductDetails() {
  const [size, setSize] = useState(0);
  const { id } = useParams();
  const { products } = useSelector((state: RootState) => state.products);

  const { data, isLoading, isFetched } = useCustomQuery<IProduct>({
    key: ["product", `${id}`],
    url: `https://fakestoreapi.com/products/${id}`,
    options: {
      enabled: !products.length,
    },
  });

  const existProduct = products.find((product) => product.id === +id!);
  const product = existProduct || data;

  if (!product && isFetched) {
    return <Navigate to="/products" replace />;
  }
  if (!product || isLoading) return <Loader />;

  return (
    <main className="relative pt-60 pb-20 overflow-x-hidden">
      <img
        className="absolute top-0 w-full h-[200px] z-[-1]"
        src="/imgs/pill-shape.png"
        alt="shape"
      />
      <div className="container">
        <img
          className="-mt-[200px] mb-5 w-[350px] h-[280px] max-w-full rounded-lg border border-border shadow-lg mx-auto"
          src={product.image}
          alt={product.title}
          data-aos="fade-left"
        />

        <div className="px-10 text-center" data-aos="fade-right">
          <Slider className="w-[850px] max-w-full mx-auto mt-8">
            {Array.from({ length: 10 }).map((_, i) => (
              <CarouselItem
                key={i}
                className="basis-[100%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <img
                  src={product.image}
                  className="object-contain select-none cursor-pointer w-full h-[220px] rounded-lg border border-border shadow-lg"
                  alt={product.title}
                />
              </CarouselItem>
            ))}
          </Slider>
        </div>
        <div className="mt-24 flex flex-col md:flex-row justify-between gap-10">
          {/* Left */}
          <div
            className="w-[500px] max-w-full flex flex-col gap-4"
            data-aos="fade-right"
          >
            <h3 className="text-3xl font-semibold flex items-center justify-between gap-4">
              {product.category}
              <span className="font-normal text-2xl ">${product.price}</span>
            </h3>
            <h4 className="text-lg">{product.title}</h4>
            <p className="text-gray-500">{product.description}</p>
          </div>
          {/* Right */}
          <div className="w-[500px] max-w-full" data-aos="fade-left">
            <h3 className="text-3xl font-semibold mb-4">Size</h3>
            <div className="mb-8 flex flex-wrap items-center gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  onClick={() => setSize(i + 20)}
                  className={`${
                    size === i + 20 && "active"
                  } cursor-pointer select-none [&.active]:bg-primary [&.active]:text-white hover:bg-secondary block w-[35px] h-[35px] rounded-lg border border-border text-center font-semibold text-sm leading-9 text-gray-500`}
                >
                  {i + 20}
                </span>
              ))}
            </div>
            <Button fullWidth>Add To Cart</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
