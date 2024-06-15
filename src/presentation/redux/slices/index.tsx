import { combineReducers } from "@reduxjs/toolkit";

import inventoryTableSlice from "./inventoryTableSlice";
import productSlice from "./productsSlice";
import categoriesSlice from "./categoriesSlice";

const rootReducer = combineReducers({
  inventory: inventoryTableSlice,
  products: productSlice,
  categories: categoriesSlice,
  // Add other reducers here
});

export default rootReducer;
