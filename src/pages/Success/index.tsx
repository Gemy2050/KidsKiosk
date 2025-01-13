import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, Navigate, Link } from "react-router-dom";
import { RootState } from "@/app/store";
import { getTotalPrice } from "@/utils/functions";
import { clearCart } from "@/app/slices/CartSlice";
import Loader from "@/components/Loader";
import axiosInstance from "@/config/axios.config";
import { User } from "@/types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function Success() {
  const [searchParams] = useSearchParams();
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const user: User = useAuthUser();
  const sessionId = searchParams.get("session_id");
  const validationRequestRef = useRef(false);

  useEffect(() => {
    if (!validationRequestRef.current) {
      validationRequestRef.current = true;
      validateSession();
    }
  }, [sessionId]);

  const validateSession = async () => {
    if (!sessionId) {
      setLoading(false);
      return <Navigate to="/" replace />;
    }

    try {
      const { data } = await axiosInstance(
        `/validate-session?session_id=${sessionId}`
      );
      const valid = data.valid;
      setIsValid(valid);
      if (valid) {
        await storeOrder();
      }
    } finally {
      setLoading(false);
    }
  };

  const storeOrder = async () => {
    const orderData = {
      sessionId: sessionId || "",
      email: user?.email,
      firstName: user?.firstName,
      secondName: user?.secondName,
      address: user?.address || "",
      items: JSON.stringify(cart),
      totalAmount: getTotalPrice(cart),
      status: "completed",
    };

    const response = await axiosInstance.post("/order", {
      ...orderData,
    });

    if (response.status === 201) {
      dispatch(clearCart());
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!isValid) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <main className="relative min-h-[calc(100dvh-64px)] flex items-center justify-center pt-20 pb-20">
      <img
        src={"/imgs/square.svg"}
        className="w-[150px]  md:block fixed bottom-0 right-[-40px] z-[-1]"
        alt="square shape"
      />
      <img
        src={"/imgs/square.svg"}
        className="w-[150px]  md:block fixed top-0 left-0 z-[-1] rotate-180"
        alt="square shape"
      />
      <div className="container flex items-center justify-center">
        <div
          data-aos="fade-up"
          className="bg-background p-8 rounded-xl shadow-lg border border-border max-w-md w-full text-center"
        >
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />

          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>

          <p className="text-muted-foreground text-lg mb-8">
            Thank you for your purchase. Your order has been successfully placed
            and will be processed soon.
          </p>

          <div className="flex flex-col gap-3">
            <Link to="/products">
              <Button variant="default" className="w-full">
                Continue Shopping
              </Button>
            </Link>

            <Link to="/orders">
              <Button variant="outline" className="w-full">
                View Orders
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Success;
