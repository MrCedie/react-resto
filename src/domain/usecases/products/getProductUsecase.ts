import { Product } from "../../entities/product";
import { IProductRepository } from "../../repositories/productRepository";


export class GetProduct {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(id: string): Promise<Product> {
    return this.productRepository.getProduct(id);
  }
}
