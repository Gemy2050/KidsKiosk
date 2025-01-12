import { configureStore } from "@reduxjs/toolkit";
import ProductsSlice from "./slices/ProductsSlice";
import cartSlice from "./slices/CartSlice";
import categoriesSlice from "./slices/CategoriesSlice";
import favoritesSlice from "./slices/FavoritesSlice";

export const store = configureStore({
  reducer: {
    products: ProductsSlice,
    cart: cartSlice,
    categories: categoriesSlice,
    favorites: favoritesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
