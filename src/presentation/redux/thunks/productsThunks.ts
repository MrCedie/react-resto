import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../../domain/entities/product";
import { ProductRepository } from "../../../domain/repositories/productRepository";
import { setData } from "../slices/inventoryTableSlice";
import { AppDispatch } from "../store";
import { CreateProduct } from "../../../domain/usecases/products/createProductUsecase";
import { ProductForm } from "../../../domain/entities/productForm";
import { GetProducts } from "../../../domain/usecases/products/getProductsUsecase";
import { GetProduct } from "../../../domain/usecases/products/getProductUsecase";
import { UpdateProduct } from "../../../domain/usecases/products/updateProductUsecase";

const productRepository = new ProductRepository();
const getProductsUseCase = new GetProducts(productRepository);
const getProductUseCase = new GetProduct(productRepository);
const createProductUseCase = new CreateProduct(productRepository);
const updateProductUseCase = new UpdateProduct(productRepository);

export const getProducts = createAsyncThunk<
  Product[],
  void,
  { dispatch: AppDispatch }
>("product/getProducts", async (_, { dispatch }) => {
  const response = await getProductsUseCase.execute();
  dispatch(setData(response));
  return response as Product[];
});

export const getProduct = createAsyncThunk<Product, string>(
  "product/getProduct",
  async (id: string) => {
    const response = await getProductUseCase.execute(id);
    return response as Product;
  }
);

export const createProduct = createAsyncThunk<
  Product,
  ProductForm,
  { dispatch: AppDispatch }
>("product/createProduct", async (form: ProductForm, { dispatch }) => {
  const response = await createProductUseCase.execute(form);
  await dispatch(getProducts());
  return response as Product;
});

export const updateProduct = createAsyncThunk<
  Product,
  { id: string; form: ProductForm },
  { dispatch: AppDispatch }
>("product/updateProduct", async ({ id, form }, { dispatch }) => {
  const response = await updateProductUseCase.execute(id, form);
  await dispatch(getProducts());
  return response as Product;
});
