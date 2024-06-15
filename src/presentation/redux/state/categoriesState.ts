import { Status } from "../../../data/enum/status";
import { Category } from "../../../domain/entities/category";

export interface CategoriesState {
  category: Category[];
  status: Status;
  error: string | null | undefined;
}

export const initialState: CategoriesState = {
  category: [],
  status: Status.IDLE,
  error: null,
};
