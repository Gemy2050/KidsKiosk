import { Product as IProduct } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  favorites: IProduct[];
}

const favoritesInStorage = JSON.parse(
  localStorage.getItem("favorites") || "[]"
);

const initialState: IInitialState = {
  favorites: favoritesInStorage || [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<IProduct[]>) => {
      state.favorites = action.payload;
      localStorage.setItem("favorites", JSON.stringify(action.payload));
    },
    clearFavorites: (state) => {
      state.favorites = [];
      localStorage.removeItem("favorites");
    },
  },
});

export const { setFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
