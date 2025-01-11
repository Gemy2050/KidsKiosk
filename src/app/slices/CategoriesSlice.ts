import { Category } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  categories: Category[];
}

const initialState: IInitialState = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const { id, name, description } = action.payload;
      const category = state.categories.find((category) => category.id === id);
      if (category) {
        category.name = name;
        category.description = description;
      }
    },
  },
});

export const { setCategories, addCategory, deleteCategory, updateCategory } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
