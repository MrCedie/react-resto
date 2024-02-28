export interface InventoryFormType {
  category: string;
  name: string;
  price: number;
  cost: number;
  stock: number;
  options: {
    name: string;
    price: number;
  }[];
}
