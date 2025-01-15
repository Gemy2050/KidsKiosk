import { clearCart } from "@/app/slices/CartSlice";
import { clearFavorites } from "@/app/slices/FavoritesSlice";
import axiosInstance from "@/config/axios.config";
import { User } from "@/types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useDispatch } from "react-redux";
import { useToast } from "./use-toast";
import { useState } from "react";

const useSignout = () => {
  const [loading, setLoading] = useState(false);

  const user: User = useAuthUser();
  const signOut = useSignOut();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleSignout = async () => {
    try {
      setLoading(true);
      if (user) {
        await axiosInstance.post("/account/signout", {
          id: user?.id,
          isGoogleProvider: user?.isGoogleUser,
        });
      }
      signOut();
      dispatch(clearCart());
      dispatch(clearFavorites());
      sessionStorage.removeItem("isDemo");
      window.location.href = "/login";
    } catch (error) {
      setLoading(false);
      toast({
        title: "Failed to logout",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return {
    handleSignout,
    loading,
  };
};

export default useSignout;
