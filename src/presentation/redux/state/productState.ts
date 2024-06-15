import { Status } from "../../../data/enum/status";
import { Product } from "../../../domain/entities/product";

export interface ProductsState {
  products: Product[];
  product: Product | null;
  getProductsStatus: Status;
  getProductStatus: Status;
  createStatus: Status;
  updateStatus: Status;
  deleteStatus: Status;
  error: string | null | undefined;
}

export const initialState: ProductsState = {
  products: [],
  product: null,
  getProductsStatus: Status.IDLE,
  getProductStatus: Status.IDLE,
  createStatus: Status.IDLE,
  updateStatus: Status.IDLE,
  deleteStatus: Status.IDLE,
  error: null,
};
