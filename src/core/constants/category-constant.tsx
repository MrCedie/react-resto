import { SelectOption } from "../../domain/interfaces/selectOption";

export const CategorySelectConstant: SelectOption<string>[] = [
  { value: "SANDWICH", label: "Sandwich" },
  { value: "DRINKS", label: "Drinks" },
  { value: "CHICKEN", label: "Chicken" },
  { value: "PASTA", label: "Pasta" },
];

export const SandwichOptions: SelectOption<string>[] = [
  { value: "ORIGINAL", label: "Original" },
  { value: "SINGLE-PATTY", label: "Single Patty" },
  { value: "DOUBLE-PATTY", label: "Double Patty" },
  { value: "EXTRA-CHEESE", label: "Extra Cheese" },
];

export const DrinksOptions: SelectOption<string>[] = [
  { value: "SMALL", label: "small" },
  { value: "MEDIUM", label: "medium" },
  { value: "LARGE", label: "Large" },
];

export const PastaOptions: SelectOption<string>[] = [
  { value: "REGULAR", label: "Regular" },
  { value: "EXTRA-CHEESE", label: "Extra Cheese" },
];

export const ChickenOptions: SelectOption<string>[] = [
  { value: "ORIGINAL", label: "Original" },
  { value: "SPICY", label: "Spicy" },
];
