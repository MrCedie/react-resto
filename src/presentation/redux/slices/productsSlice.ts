import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Status } from "../../../data/enum/status";
import {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../thunks/productsThunks";
import { initialState } from "../state/productState";

const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProduct(state, payload: PayloadAction<void>) {
      state.product = null;
      state.getProductStatus = Status.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Products
      .addCase(getProducts.pending, (state) => {
        state.getProductsStatus = Status.LOADING;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.getProductsStatus = Status.SUCCESS;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.getProductsStatus = Status.FAILED;
        state.error = action.error?.message;
      })

      // Get Product By ID
      .addCase(getProduct.pending, (state) => {
        state.getProductStatus = Status.LOADING;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.getProductStatus = Status.SUCCESS;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.getProductsStatus = Status.FAILED;
        state.error = action.error?.message;
      })

      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.createStatus = Status.LOADING;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.createStatus = Status.SUCCESS;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.createStatus = Status.FAILED;
        state.error = action.error?.message;
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.deleteStatus = Status.LOADING;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.deleteStatus = Status.SUCCESS;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.deleteStatus = Status.FAILED;
        state.error = action.error?.message;
      });
  },
});

export const { clearProduct } = productsSlice.actions;
export default productsSlice.reducer;
