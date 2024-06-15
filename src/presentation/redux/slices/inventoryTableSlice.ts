import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../../domain/entities/product";
import { initialState } from "../state/inventoryTableState";
import { Category } from "../../../domain/entities/category";
import { initializeTable } from "../thunks/inventoryThunks";

const inventoryTableSlice = createSlice({
  name: "inventoryTable",
  initialState,
  reducers: {
    setData(state, payload: PayloadAction<Product[]>) {
      state.data = payload.payload;
      if (state.selectedCategory !== null) {
        state.inventory = state.data.filter(
          (res: Product) => res.category === state.selectedCategory
        );
      }
    },
    setInventory(state, payload: PayloadAction<Product[]>) {
      state.inventory = payload.payload;
    },
    setCategory(state, payload: PayloadAction<Category[]>) {
      const data = payload.payload;
      state.selectedCategory = data[0].id;
      state.category = data;
    },
    filterTable(state, payload: PayloadAction<string>) {
      const categoryId = payload.payload;
      state.selectedCategory = categoryId;
      state.inventory = state.data.filter(
        (res: Product) => res.category === categoryId
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeTable.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeTable.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(initializeTable.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setCategory, setInventory, filterTable, setData } =
  inventoryTableSlice.actions;

export default inventoryTableSlice.reducer;
