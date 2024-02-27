export interface TableInventoryType {
  key: string;
  id: string;
  name: string;
  category: "SANDWICH" | "DRINKS" | "CHICKEN" | "PASTA";
  price: number;
  cost: number;
  stock: number;
}
