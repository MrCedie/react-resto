import axios from "axios";
import { Category } from "../../domain/entities/category";

const baseUrl = process.env.REACT_APP_VERCEL_BASE_URL;

export const getCategories = async (): Promise<Category[]> => {
  const res = await axios.get(`${baseUrl}/categories`);
  return res.data as Category[];
};
