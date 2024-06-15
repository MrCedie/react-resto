import { Product } from "../../entities/product";
import { IProductRepository } from "../../repositories/productRepository";

export class GetProducts {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(): Promise<Product[]> {
    return this.productRepository.getProducts();
  }
}
