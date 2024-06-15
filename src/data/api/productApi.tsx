import axios from "axios";
import { Product } from "../../domain/entities/product";
import { ProductForm } from "../../domain/entities/productForm";

const baseUrl = process.env.REACT_APP_VERCEL_BASE_URL;

export const getProducts = async (): Promise<Product[]> => {
  const res = await axios.get(`${baseUrl}/product`);
  return res.data as Product[];
};

export const getProduct = async (id: string): Promise<Product> => {
  const res = await axios.get(`${baseUrl}/product/${id}`);
  return res.data as Product;
};

export const createProduct = async (form: ProductForm): Promise<Product> => {
  const res = await axios.post(`${baseUrl}/product`, form);
  return res.data as Product;
};

export const updateProduct = async (
  id: string,
  form: ProductForm
): Promise<Product> => {
  const res = await axios.put(`${baseUrl}/product/${id}`, form);
  return res.data as Product;
};
