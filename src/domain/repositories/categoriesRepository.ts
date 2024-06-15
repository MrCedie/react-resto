import { getCategories } from "../../data/api/categoriesApi";
import { Category } from "../entities/category";

export interface ICategoriesRepository {
  getCategories(): Promise<Category[]>;
}

export class CategoriesRepository implements ICategoriesRepository {
  async getCategories(): Promise<Category[]> {
    return getCategories();
  }
}
