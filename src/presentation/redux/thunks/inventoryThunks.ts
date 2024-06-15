import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { CategoriesRepository } from "../../../domain/repositories/categoriesRepository";
import { ProductRepository } from "../../../domain/repositories/productRepository";
import { GetCategories } from "../../../domain/usecases/categories/getCategories";
import { GetProducts } from "../../../domain/usecases/products/getProductsUsecase";
import {
  filterTable,
  setCategory,
  setData,
  setInventory,
} from "../slices/inventoryTableSlice";

const productRepository = new ProductRepository();
const getProductsUseCase = new GetProducts(productRepository);

const categoriesRepository = new CategoriesRepository();
const getCategoriesUseCase = new GetCategories(categoriesRepository);

export const initializeTable = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch }
>("product/initialize", async (_, { dispatch }) => {
  const categories = await getCategoriesUseCase.execute();
  dispatch(setCategory(categories));
  const product = await getProductsUseCase.execute();
  dispatch(setInventory([]));
  dispatch(setData(product));
  dispatch(filterTable(categories[0].id));
  return;
});
