export interface ProductFormValue {
  category: string | null | undefined;
  name: string;
  price: number;
  cost: number;
  stock: number;
  options: {
    name: string;
    price: number;
  }[];
}
