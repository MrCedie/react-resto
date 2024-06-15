import { createAsyncThunk } from "@reduxjs/toolkit";
import { CategoriesRepository } from "../../../domain/repositories/categoriesRepository";
import { GetCategories } from "../../../domain/usecases/categories/getCategories";
import { setCategory } from "../slices/inventoryTableSlice";
import { AppDispatch } from "../store";
import { Category } from "../../../domain/entities/category";

const categoriesRepository = new CategoriesRepository();
const getCategoriesUseCase = new GetCategories(categoriesRepository);

export const getCategories = createAsyncThunk<
  Category[],
  void,
  { dispatch: AppDispatch }
>("category/getCategories", async (_, { dispatch }) => {
  const response = await getCategoriesUseCase.execute();
  dispatch(setCategory(response));
  return response as Category[];
});
