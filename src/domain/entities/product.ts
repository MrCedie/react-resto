export interface Product {
  id?: string;
  name: string;
  category: string;
  cost: number;
  price: number;
  stock: number;
  options: ProductOption[];
}

export interface ProductOption {
  name: string;
  price: number;
}
