import { SelectOptionType } from "../../domain/types/select-option-type";

export const CategorySelectConstant: SelectOptionType<string>[] = [
  { value: "SANDWICH", label: "Sandwich" },
  { value: "DRINKS", label: "Drinks" },
  { value: "CHICKEN", label: "Chicken" },
  { value: "PASTA", label: "Pasta" },
];

export const SandwichOptions: SelectOptionType<string>[] = [
  { value: "ORIGINAL", label: "Original" },
  { value: "SINGLE-PATTY", label: "Single Patty" },
  { value: "DOUBLE-PATTY", label: "Double Patty" },
  { value: "EXTRA-CHEESE", label: "Extra Cheese" },
];

export const DrinksOptions: SelectOptionType<string>[] = [
  { value: "SMALL", label: "small" },
  { value: "MEDIUM", label: "medium" },
  { value: "LARGE", label: "Large" },
];

export const PastaOptions: SelectOptionType<string>[] = [
  { value: "REGULAR", label: "Regular" },
  { value: "EXTRA-CHEESE", label: "Extra Cheese" },
];

export const ChickenOptions: SelectOptionType<string>[] = [
  { value: "ORIGINAL", label: "Original" },
  { value: "SPICY", label: "Spicy" },
];
