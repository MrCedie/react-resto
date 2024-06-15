import * as Yup from "yup";

export const inventoryValidationSchema = Yup.object().shape({
  category: Yup.string().required("Product category is required"),
  name: Yup.string()
    .min(1, "invalid product name")
    .required("Product name is required"),
  cost: Yup.number(),
  price: Yup.number(),
  stock: Yup.number().min(1, "stock should be more than 1").required(),
  options: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Name is required"),
      price: Yup.number().required("Price is required"),
    })
  ),
});
