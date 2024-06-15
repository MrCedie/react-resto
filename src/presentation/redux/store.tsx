import rootReducer from "./slices";
import { configureStore } from "@reduxjs/toolkit";
import { ProductsState } from "./state/productState";
import { InventoryState } from "./state/inventoryTableState";
import { CategoriesState } from "./state/categoriesState";

export type RootState = {
  products: ProductsState;
  inventory: InventoryState;
  categories: CategoriesState;
};

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export default store;
