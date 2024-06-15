import axios from "axios";
import { Category } from "../../domain/entities/category";

const baseUrl = "http://localhost:3000";

export const getCategories = async (): Promise<Category[]> => {
  const res = await axios.get(`${baseUrl}/categories`);
  return res.data as Category[];
};
