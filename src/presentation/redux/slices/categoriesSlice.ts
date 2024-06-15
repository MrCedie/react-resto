import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../state/categoriesState";
import { getCategories } from "../thunks/categoriesThunks";
import { Status } from "../../../data/enum/status";

const categoriesSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Categories
      .addCase(getCategories.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.category = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.error?.message;
      });
  },
});

export default categoriesSlice.reducer;
