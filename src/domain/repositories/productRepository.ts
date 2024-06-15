import {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../../data/api/productApi";
import { Product } from "../entities/product";
import { ProductForm } from "../entities/productForm";

export interface IProductRepository {
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product>;
  createProduct(form: ProductForm): Promise<Product>;
  updateProduct(id: string, form: ProductForm): Promise<Product>;
}

export class ProductRepository implements IProductRepository {
  getProduct(id: string): Promise<Product> {
    return getProduct(id);
  }
  createProduct(form: ProductForm): Promise<Product> {
    return createProduct(form);
  }
  updateProduct(id: string, form: ProductForm): Promise<Product> {
    return updateProduct(id, form);
  }

  getProducts(): Promise<Product[]> {
    return getProducts();
  }
}
