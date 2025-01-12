import { Product as IProduct } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  cart: IProduct[];
}

const productsInStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")!)
  : null;

const initialState: IInitialState = {
  cart: productsInStorage || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const product = action.payload;
      const quantity = product.quantity || 0;
      const productFound = state.cart.find((el) => el.id === product.id);

      if (productFound) {
        state.cart = state.cart.map((el) =>
          el.id === product.id ? { ...el, quantity: quantity + 1 } : el
        );
      } else {
        state.cart = [...state.cart, { ...product, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      const product = action.payload;
      const quantity = product.quantity;
      if (quantity! > 1) {
        state.cart = state.cart.map((el) =>
          el.id === product.id ? { ...el, quantity: quantity! - 1 } : el
        );
      } else {
        state.cart = state.cart.filter((el) => el.id !== product.id);
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeProduct: (state, action: PayloadAction<IProduct>) => {
      const product = action.payload;
      state.cart = state.cart.filter((el) => el.id !== product.id);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, removeProduct, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
