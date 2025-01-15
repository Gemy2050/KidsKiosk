import { addToCart, removeFromCart } from "@/app/slices/CartSlice";
import { setFavorites } from "@/app/slices/FavoritesSlice";
import { RootState } from "@/app/store";
import { useToast } from "@/hooks/use-toast";
import { Product as IProduct } from "@/interfaces";
import { Heart, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

interface IProps {
  product: IProduct;
}

export default function Product({ product }: IProps) {
  const { cart } = useSelector((state: RootState) => state.cart);
  const { favorites } = useSelector((state: RootState) => state.favorites);
  const [isFavorite, setIsFavorite] = useState(
    favorites.some((el) => el.id === product.id)
  );
  const [isInCart, setIsInCart] = useState(
    cart.some((el) => el.id === product.id)
  );
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleCartEvent = () => {
    let message = "Product added to cart";
    if (!isInCart) {
      dispatch(addToCart(product));
    } else {
      message = "Product removed from cart";
      dispatch(removeFromCart(product));
    }
    toast({
      title: message,
      description: "You can see your cart in the navbar",
      variant: "success",
    });
    setIsInCart(!isInCart);
  };

  const removeFromFavorites = (product: IProduct) => {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.id !== product.id
    );
    dispatch(setFavorites(updatedFavorites));
  };

  const addToFavorites = (product: IProduct) => {
    const updatedFavorites = [...favorites, product];
    dispatch(setFavorites(updatedFavorites));
  };

  const handleFavorites = () => {
    if (isFavorite) {
      removeFromFavorites(product);
    } else {
      addToFavorites(product);
    }
    setIsFavorite((prev) => !prev);
  };
  return (
    <div
      data-aos="fade-up"
      className="flex flex-col items-center gap-2 bg-background p-5 border-2 border-border rounded-lg [&:hover]:border-primary shadow-xl [&:hover_img]:scale-110 duration-500"
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
          onClick={handleFavorites}
        />
      </div>

      <Link to={`/product/${product.id}`} className="w-full cursor-pointer">
        <img
          className="w-[250px] h-[200px] max-w-full rounded-lg mx-auto my-3 duration-500"
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          width={250}
          height={200}
        />
      </Link>
      <h4 className="text-gray-400">{product.category}</h4>
      <Link
        to={`/product/${product.id}`}
        className="line-clamp-2 font-semibold  min-h-[50px] text-center hover:text-primary duration-500 cursor-pointer"
      >
        {product.name}
      </Link>
      <p
        className="line-clamp-3 min-h-[75px] w-full"
        dangerouslySetInnerHTML={{ __html: product.description }}
      ></p>
      <div className="flex justify-between items-center w-full">
        <h3 className="font-bold">{product.productCategory}</h3>
        <div className="flex items-center gap-2">
          {product.hasDiscount && (
            <h3 className="text-xs text-gray-400 line-through">
              ${product.priceBeforeDiscount}
            </h3>
          )}
          <h3 className="font-bold text-gray-400">${product.price}</h3>
        </div>
      </div>
    </div>
  );
}
