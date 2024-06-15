import { Category } from "../../entities/category";
import { ICategoriesRepository } from "../../repositories/categoriesRepository";

export class GetCategories {
  private categoriesRepository: ICategoriesRepository;

  constructor(categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute(): Promise<Category[]> {
    return this.categoriesRepository.getCategories();
  }
}
