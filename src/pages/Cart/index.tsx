import { RootState } from "@/app/store";
import { ShoppingBag } from "lucide-react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { getTotalPrice } from "@/utils/functions";

import { loadStripe } from "@stripe/stripe-js";
import axiosInstance from "@/config/axios.config";
import { useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

function Cart() {
  let { cart } = useSelector((state: RootState) => state.cart);
  const [disabled, setDisabled] = useState(false);

  const handleCheckout = async () => {
    try {
      setDisabled(true);
      const stripe = await stripePromise;

      const { data } = await axiosInstance.post("/checkout", {
        items: cart,
      });

      const { sessionId } = data;

      // Redirect to Stripe checkout
      await stripe?.redirectToCheckout({
        sessionId,
      });
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <main className="relative pt-20 pb-20">
      <img
        className="fixed top-0 w-full h-[200px] z-[-1]"
        src="/imgs/pill-shape.png"
        alt="shape"
        width={100}
        height={200}
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
          className="bg-background mt-16 w-[450px] max-w-full mx-auto p-5 rounded-lg border border-border shadow-lg"
        >
          {cart.length > 0 ? (
            <>
              <h3 className="text-3xl text-center">
                Total Price <br /> ${getTotalPrice(cart)}
              </h3>
              <Button
                className="rounded-lg mt-5"
                fullWidth
                disabled={disabled}
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </>
          ) : (
            <>
              <h3 className="text-3xl text-center">Your Cart is Empty</h3>
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
