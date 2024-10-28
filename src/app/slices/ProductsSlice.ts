import { IProduct } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  products: IProduct[];
}

const initialState: IInitialState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
