import { addToCart, removeFromCart } from "@/app/slices/CartSlice";
import { RootState } from "@/app/store";
import { useToast } from "@/hooks/use-toast";
import { IProduct } from "@/interfaces";
import { Heart, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

interface IProps {
  product: IProduct;
}

export default function Product({ product }: IProps) {
  const { cart } = useSelector((state: RootState) => state.cart);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInCart, setIsInCart] = useState(
    cart.some((el) => el.id === product.id)
  );
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleCartEvent = () => {
    if (!isInCart) {
      toast({
        title: "Product added to cart",
        description: "You can see your cart in the navbar",
        variant: "success",
      });
      dispatch(addToCart(product));
    } else {
      toast({
        title: "Product removed from cart",
        description: "You can see your cart in the navbar",
        variant: "success",
      });
      dispatch(removeFromCart(product));
    }
    setIsInCart(!isInCart);
  };

  const addToFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <div
      data-aos="fade-up"
      className="flex flex-col items-center gap-2 p-5 border-2 border-border rounded-lg [&:hover]:border-primary shadow-xl [&:hover_img]:scale-110 duration-500"
    >
      <div className="flex justify-between items-center w-full">
        {!isInCart ? (
          <ShoppingCart
            size={30}
            className="cursor-pointer p-1 rounded-full hover:text-green-500 duration-300"
            onClick={handleCartEvent}
          />
        ) : (
          <X
            size={30}
            className="cursor-pointer p-1 rounded-full hover:text-red-500 duration-300"
            onClick={handleCartEvent}
          />
        )}
        <Heart
          size={30}
          className={`${
            isFavorite && " bg-foreground text-background"
          } ms-auto cursor-pointer p-1 rounded-full hover:text-red-500 duration-300`}
          onClick={addToFavorite}
        />
      </div>

      <Link to={`/product/${product.id}`} className="w-full cursor-pointer">
        <img
          className="w-[250px] h-[200px] max-w-full object-contain rounded-lg mx-auto my-3 duration-500"
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
