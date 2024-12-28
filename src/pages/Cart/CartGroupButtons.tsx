import { Button } from "@/components/ui/button";
import { addToCart, removeFromCart } from "@/app/slices/CartSlice";
import { Product as IProduct } from "@/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useEffect, useState } from "react";

interface IProps {
  product: IProduct;
  className?: string;
}

export default function CartGroupButtons({ product: el, className }: IProps) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.cart);
  const [product, setProduct] = useState(el);

  useEffect(() => {
    if (cart) {
      setProduct(cart.find((product) => product.id == el.id)!);
    } else {
      setProduct(el);
    }
  }, [cart]);

  if (!product) {
    return;
  }
  return (
    <div
      className={`rounded-full h-10 w-full max-w-full bg-primary text-white flex items-center gap-2 ${className}`}
    >
      <Button
        onClick={() => dispatch(removeFromCart(product))}
        className="w-full !h-[100%] text-lg"
        size="sm"
      >
        -
      </Button>
      <span className="w-full text-center leading-tight">
        {product.quantity || 0}
      </span>
      <Button
        onClick={() => dispatch(addToCart(product))}
        className="w-full !h-[100%] text-lg"
        size="sm"
      >
        +
      </Button>
    </div>
  );
}
