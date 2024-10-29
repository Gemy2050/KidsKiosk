import { RootState } from "@/app/store";
import { ShoppingBag } from "lucide-react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

function Cart() {
  let { cart } = useSelector((state: RootState) => state.cart);
  console.log({ cart });

  return (
    <main className="relative pt-20 pb-20">
      <img
        className="fixed top-0 w-full h-[200px] z-[-1]"
        src="/imgs/pill-shape.png"
        alt="shape"
      />
      <div className=" container py-10 sm:px-10 rounded-lg">
        <h2
          data-aos="fade-up"
          className="text-2xl sm:text-4xl mb-8 font-semibold flex items-center gap-2"
        >
          My Cart <ShoppingBag size={30} />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 justify-center">
          {cart.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </div>

        <div
          data-aos="fade-up"
          data-aos-offset="0"
          className="bg-background mt-16 w-[350px] max-w-full mx-auto p-5 rounded-lg border border-border shadow-lg"
        >
          {cart.length > 0 ? (
            <>
              <h3 className="text-3xl">Total Price: $300</h3>
              <Button className=" rounded-lg mt-5" fullWidth>
                Checkout
              </Button>
            </>
          ) : (
            <>
              <h3 className="text-3xl">Your Cart is Empty</h3>
              <Link
                className={`${cn(
                  buttonVariants({ fullWidth: true, variant: "default" })
                )} rounded-lg mt-5`}
                to="/products"
              >
                Browse Products
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Cart;
