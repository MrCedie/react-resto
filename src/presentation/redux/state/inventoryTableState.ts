import { Category } from "../../../domain/entities/category";
import { Product } from "../../../domain/entities/product";

export interface InventoryState {
  data: Product[];
  inventory: Product[];
  category: Category[];
  loading: boolean;
  selectedCategory: string | null;
}

export const initialState: InventoryState = {
  data: [],
  inventory: [],
  category: [],
  loading: false,
  selectedCategory: null,
};
