import { RootState } from "@/app/store";
import Loader from "@/components/Loader";
import { Slider } from "@/components/Slider";
import { Button } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";
import useCustomQuery from "@/hooks/use-cutstom-query";
import { Product as IProduct, ISize } from "@/interfaces";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import CartGroupButtons from "../Cart/CartGroupButtons";
import { addToCart } from "@/app/slices/CartSlice";

export default function ProductDetails() {
  const [sizeId, setSizeId] = useState<number | string>(0);
  const [availableSizes, setAvailableSizes] = useState<ISize[]>();
  const [colorId, setColorId] = useState<number | undefined>(0);
  const { id } = useParams();
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const existProduct = cart.find((product) => String(product.id) == String(id));

  const { data, isLoading, isFetched } = useCustomQuery<IProduct>({
    key: ["product", `${id}`],
    url: `/product/get-product?id=${id}`,
    options: {
      enabled: !existProduct,
    },
  });

  const product = existProduct || data;

  useEffect(() => {
    if (product && colorId === 0) {
      setColorId(product.variants?.[0].id);
      return;
    }

    if (product) {
      const sizes = product.variants?.find(({ id }) => id === colorId)?.sizes;
      setSizeId(sizes?.[0].size || 0);
      setAvailableSizes(sizes);
    }
  }, [colorId, product]);

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
        width={100}
        height={200}
      />
      <div className="container">
        <img
          className="-mt-[200px] mb-5 w-[350px] h-[280px] max-w-full rounded-lg border border-border shadow-lg mx-auto"
          src={product.imageUrl}
          alt={product.name}
          data-aos="fade-left"
        />

        <div className="px-10 text-center" data-aos="fade-right">
          {Number(product.productImages?.length) > 0 && (
            <Slider className="w-[850px] max-w-full mx-auto mt-8">
              {product.productImages?.map(({ id, imageUrl }) => (
                <CarouselItem
                  key={id}
                  className="basis-[100%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <img
                    src={imageUrl}
                    className="select-none cursor-pointer w-full h-[220px] rounded-lg border border-border shadow-lg"
                    alt={product.name}
                  />
                </CarouselItem>
              ))}
            </Slider>
          )}
        </div>
        <div className="mt-24 flex flex-col md:flex-row justify-between gap-10">
          {/* Left */}
          <div
            className="w-[500px] max-w-full flex flex-col gap-4"
            data-aos="fade-right"
          >
            <h3 className="text-3xl font-semibold flex items-center justify-between gap-4">
              {product.productCategory}
              <div className="font-normal flex gap-2">
                <span className="text-base line-through text-gray-500">
                  ${product.priceBeforeDiscount}
                </span>
                <span className="text-2xl">${product.price}</span>
              </div>
            </h3>
            <h4 className="text-lg">{product.name}</h4>
            <p
              className="text-gray-500"
              dangerouslySetInnerHTML={{ __html: product.description }}
            ></p>
          </div>
          {/* Right */}
          <div className="w-[500px] max-w-full" data-aos="fade-left">
            <h3 className="text-3xl font-semibold mb-4">Colors</h3>
            <div className="mb-8 flex flex-wrap items-center gap-4">
              {product.variants?.map(({ id, color }, i) => (
                <span
                  key={id}
                  onClick={() => setColorId(id)}
                  className={`${
                    (colorId ? colorId === id : i === 0) && "active"
                  } cursor-pointer select-none [&.active]:bg-primary [&.active]:text-white hover:bg-secondary block p-1 rounded-lg border border-border text-center font-semibold text-gray-500`}
                >
                  {color}
                </span>
              ))}
            </div>
            <h3 className="text-2xl font-semibold mb-4">Available Sizes</h3>
            <div className="mb-8 flex flex-wrap items-center gap-4">
              {availableSizes?.map(({ size }, i) => {
                return (
                  <span
                    key={i}
                    onClick={() => setSizeId(size)}
                    className={`${
                      (sizeId ? sizeId === size : i === 0) && "active"
                    } cursor-pointer select-none [&.active]:bg-primary [&.active]:text-white hover:bg-secondary block w-[35px] h-[35px] rounded-lg border border-border text-center font-semibold text-sm leading-9 text-gray-500`}
                  >
                    {size}
                  </span>
                );
              })}
            </div>
            {!product.quantity ? (
              <Button onClick={() => dispatch(addToCart(product))} fullWidth>
                Add To Cart
              </Button>
            ) : (
              <CartGroupButtons
                className="w-[300px] mx-auto"
                product={product}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
