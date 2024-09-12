import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProductCategories, getProducts } from "./productAPI";

export interface AppStateInterface {
  products: any;
  productCategories: any;
  status: "idle" | "loading" | "failed";
}

const initialState: AppStateInterface = {
  products: {},
  productCategories: [],
  status: "idle",
};

export const getProductAsync = createAsyncThunk("ProductList", async (params?: string) => {
  const response = await getProducts(params);
  return response;
});

export const getProductCategoriesAsync = createAsyncThunk("ProductCategoriesList", async () => {
  const response = await getProductCategories();
  return response;
});

export const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {},

  extraReducers: (builder: any) => {
    builder

      // get product list
      .addCase(getProductAsync.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(getProductAsync.fulfilled, (state: any, action: any) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(getProductAsync.rejected, (state: any) => {
        state.status = "failed";
      })

      // get product list
      .addCase(getProductCategoriesAsync.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(getProductCategoriesAsync.fulfilled, (state: any, action: any) => {
        state.status = "idle";
        state.productCategories = action.payload;
      })
      .addCase(getProductCategoriesAsync.rejected, (state: any) => {
        state.status = "failed";
      })


  },
});

export const { } = productSlice.actions;
export const productState = (state: any) => state.product;
export default productSlice.reducer;
