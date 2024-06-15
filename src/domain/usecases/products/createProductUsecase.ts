import { IProductRepository } from "../../repositories/productRepository";
import { Product } from "../../entities/product";
import { ProductForm } from "../../entities/productForm";

export class CreateProduct {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(form: ProductForm): Promise<Product> {
    return this.productRepository.createProduct(form);
  }
}
