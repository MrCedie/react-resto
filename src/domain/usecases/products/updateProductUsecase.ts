import { Product } from "../../entities/product";
import { ProductForm } from "../../entities/productForm";
import { IProductRepository } from "../../repositories/productRepository";

export class UpdateProduct {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(id: string, form: ProductForm): Promise<Product> {
    return this.productRepository.updateProduct(id, form);
  }
}
