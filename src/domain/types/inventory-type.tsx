export interface InvetoryForm {
  id: string;
  name: string;
  category: "SANDWICH" | "DRINKS" | "CHICKEN" | "PASTA";
  option:
    | "SMALL"
    | "MEDIUM"
    | "LARGE"
    | "REGULAR"
    | "LESS"
    | "MORE"
    | "ORIGINAL"
    | "SPICY"
    | "SINGLE-PATTY"
    | "DOUBLE-PATTY"
    | "EXTRA-CHEESE"
    | null;
  price: number;
  cost: number;
  stock: number;
}
