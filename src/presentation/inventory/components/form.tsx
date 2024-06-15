import { Button, Spin } from "antd";
import { Formik } from "formik";
import { useEffect, useState } from "react";

import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import SelectInput from "../../../core/components/forms/selectInput";
import TextInput from "../../../core/components/forms/textInput";
import NumberInput from "../../../core/components/forms/numberInput";
import OptionField from "./optionField";
import { removeObjectKey } from "../../../core/utils/method";
import { inventoryValidationSchema } from "../../../core/constants/validation-schema-constant";
import { ProductsState } from "../../redux/state/productState";
import { Status } from "../../../data/enum/status";
import { CategoriesState } from "../../redux/state/categoriesState";
import { InventoryState } from "../../redux/state/inventoryTableState";
import {
  createProduct,
  updateProduct,
} from "../../redux/thunks/productsThunks";
import { ProductForm } from "../../../domain/entities/productForm";
import { ProductFormValue } from "../../../domain/interfaces/productFormValue";

const InventoryForm = (props: {
  closeModal: Function;
  refreshTable: Function;
}) => {
  // const { category } = useSelector<RootState, InventoryTableState>(
  //   (state: any) => state.inventoryTable
  // );
  const dispatch: AppDispatch = useDispatch();

  const [categorySelect, setCategorySelect] = useState<string | null>(null);

  const { product, getProductStatus, updateStatus, createStatus } = useSelector<
    RootState,
    ProductsState
  >((state) => state.products);

  const { category } = useSelector<RootState, InventoryState>(
    (state) => state.inventory
  );

  useEffect(() => {
    if (product != null) {
    }
    // const handleData = async () => {
    //   if (props.id) {
    //     setLoading(true);
    //     const { categoryId, name, price, cost, stock, options } =
    //       await getProductFirebase(props.id);
    //     setCategorySelect(categoryId);
    //     setInitialValue({
    //       category: categoryId,
    //       name,
    //       price,
    //       cost,
    //       stock,
    //       options: options ?? [],
    //     });
    //     setLoading(false);
    //     return;
    //   }
    //   return;
    // };
    // handleData();
  }, []);

  useEffect(() => {
    if (getProductStatus == Status.SUCCESS && product !== null) {
      setCategorySelect(product.category);
    }
  }, [getProductStatus]);

  const handleSubmitForm = async (values: ProductFormValue): Promise<void> => {
    if (createStatus != Status.LOADING && updateStatus != Status.LOADING) {
      let newValue = values as ProductForm;
      newValue.category = categorySelect!;

      if (product != null && product.id != null) {
        const id = product.id;
        await dispatch(
          updateProduct({
            id,
            form: newValue,
          })
        );
        props.closeModal();
        return;
      }
      await dispatch(createProduct(newValue));
      props.closeModal();
    }
    // let newValue = values;
    // newValue.categoryId = values.category;
    // newValue = removeObjectKey(newValue, "category");
    // setSubmitLoading(true);
    // if (props.id) {
    //   await updateFirebase(props.id, newValue);
    //   props.closeModal();
    //   props.refreshTable();
    //   setSubmitLoading(false);
    //   return;
    // }
    // await addFirebase(newValue);
    // props.closeModal();
    // props.refreshTable();
    // setSubmitLoading(false);
  };

  return getProductStatus !== Status.LOADING ? (
    <div style={{ maxHeight: "70vh", overflow: "scroll" }}>
      <Formik
        initialValues={{
          category: product?.category,
          name: product?.name ?? "",
          price: product?.price ?? 0,
          cost: product?.cost ?? 0,
          stock: product?.stock ?? 0,
          options: product?.options ?? [],
        }}
        onSubmit={handleSubmitForm}
        validationSchema={inventoryValidationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setTouched,
          setValues,
        }) => (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "30px 0",
            }}
          >
            {/* CATEGORY */}
            <SelectInput
              value={categorySelect}
              onChange={(value) => {
                setCategorySelect(value);
                setTouched({ ...touched, category: true });
                setValues({ ...values, category: value });
              }}
              error={errors.category && touched.category && errors.category}
              options={category.map((res) => ({
                value: res.id,
                label: res.name,
              }))}
            ></SelectInput>

            <br />
            {/* PRODUCT NAME */}
            <TextInput
              label="Product Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name && touched.name && errors.name}
            ></TextInput>

            <br />
            {/* PRODUCT PRICE */}
            <NumberInput
              label="Product Price"
              name="price"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.price && touched.price && errors.price}
            ></NumberInput>

            <br />
            {/* PRODUCT COST */}
            <NumberInput
              label="Product Cost"
              name="cost"
              value={values.cost}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.cost && touched.cost && errors.cost}
            ></NumberInput>

            <br />
            {/* STOCK */}
            <NumberInput
              label="Product stock"
              name="stock"
              value={values.stock}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.stock && touched.stock && errors.stock}
            ></NumberInput>

            <br />
            {/* OPTION */}
            <OptionField
              onChange={handleChange}
              onBlur={handleBlur}
              options={values.options}
              error={errors}
              touched={touched}
            ></OptionField>

            <br />
            <Button
              type="primary"
              loading={
                createStatus == Status.LOADING || updateStatus == Status.LOADING
              }
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </div>
  ) : (
    <center>
      <Spin />
    </center>
  );
};

export default InventoryForm;
