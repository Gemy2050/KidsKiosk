import { IProduct } from "@/interfaces";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface IProps {
  product: IProduct;
}

export default function Product({ product }: IProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <div
      data-aos="fade-up"
      className="flex flex-col items-center gap-2 p-5 border-2 border-border rounded-lg [&:hover]:border-primary shadow-xl [&:hover_img]:scale-110 duration-500"
    >
      <Heart
        size={35}
        className={`${
          isFavorite && " bg-foreground text-background"
        } ms-auto cursor-pointer p-2 rounded-full hover:text-red-500 duration-300`}
        onClick={(e) => {
          e.stopPropagation();
          setIsFavorite((prev) => !prev);
        }}
      />

      <Link to={`/product/${product.id}`} className="w-full cursor-pointer">
        <img
          className="w-[250px] h-[200px] max-w-full rounded-lg mx-auto my-3 duration-500"
          src={product.image}
          alt={product.title}
          loading="lazy"
        />
      </Link>
      <h4 className="text-gray-400">{product.category}</h4>
      <Link
        to={`/product/${product.id}`}
        className="line-clamp-2 font-semibold  min-h-[50px] text-center hover:text-primary duration-500 cursor-pointer"
      >
        {product.title}
      </Link>
      <p className="line-clamp-3 min-h-[75px] w-full">{product.description}</p>
      <h3 className="font-bold text-gray-500">${product.price}</h3>
    </div>
  );
}
