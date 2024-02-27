import { combineReducers } from "@reduxjs/toolkit";

import inventoryTableSlice from "./inventoryTableSlice";

const rootReducer = combineReducers({
  inventoryTable: inventoryTableSlice,
  // Add other reducers here
});

export default rootReducer;
