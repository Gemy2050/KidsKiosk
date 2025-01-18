import { removeProduct } from "@/app/slices/CartSlice";
import { Product as IProduct } from "@/interfaces";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartGroupButtons from "./CartGroupButtons";

interface IProps {
  product: IProduct;
}

function CartItem({ product }: IProps) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    document.getElementById(`cart-${product.id}`)?.classList.add("removing");
    setTimeout(() => {
      dispatch(removeProduct(product));
    }, 200);
  };

  return (
    <div
      data-aos="fade-up"
      id={`cart-${product.id}`}
      className={`cart-item relative bg-background flex items-center gap-2 sm:gap-4 px-2 sm:px-5 py-8 shadow-xl rounded-lg border border-border`}
    >
      <X
        size={25}
        className="cursor-pointer hover:text-red-500 duration-300 absolute top-1 right-1"
        onClick={handleRemove}
      />
      <Link to={`/product/${product.id}`} className="shrink-0">
        <img
          src={product.imageUrl}
          alt="product"
          className="rounded-lg sm:w-full w-[120px] h-[120px] sm:h-[150px] aspect-square"
        />
      </Link>
      <div className="flex-1 w-full text-center">
        <Link
          to={`/product/${product.id}`}
          className="text-md font-semibold line-clamp-1 hover:text-primary duration-300"
        >
          {product.name}
        </Link>
        <p className="text-sm text-muted-foreground mt-0">
          {product.productCategory}
        </p>
        {product.color && (
          <div className="flex gap-2 items-center justify-center ">
            <div className="flex items-center gap-1">
              <span
                className="w-[15px] h-[15px] mt-[-1px] rounded-full border"
                style={{ backgroundColor: product.color }}
              ></span>
              <span className="text-sm text-muted-foreground">
                {product.color}
              </span>
            </div>
            <span className="text-muted-foreground">|</span>
            <span className="text-sm text-muted-foreground">
              {product.size}
            </span>
          </div>
        )}
        <div className="flex justify-between items-center gap-3 text-md font-bold mt-6">
          <CartGroupButtons
            className="!text-md w-[100%] h-6"
            product={product}
          />
          <span className="font-semibold text-gray-400">${product.price}</span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
