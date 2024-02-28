import rootReducer from "../reducers";
import { configureStore } from "@reduxjs/toolkit";
import { InventoryTableState } from "../reducers/inventoryTableSlice";

export type RootState = {
  inventoryTable: InventoryTableState;
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
