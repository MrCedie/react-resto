import { Button, Spin } from "antd";
import { Formik } from "formik";
import { useEffect, useState } from "react";

import {
  addFirebase,
  getProductFirebase,
  updateFirebase,
} from "../../../data/api/firebaseService";
import { RootState } from "../../../domain/store/store";
import { useSelector } from "react-redux";
import SelectInput from "../../../core/components/forms/selectInput";
import TextInput from "../../../core/components/forms/textInput";
import NumberInput from "../../../core/components/forms/numberInput";
import OptionField from "./optionField";
import { removeObjectKey } from "../../../core/utils/method";
import { inventoryValidationSchema } from "../../../core/constants/validation-schema-constant";

type InventoryTableState = RootState["inventoryTable"];

const InventoryForm = (props: {
  id: string | null;
  closeModal: Function;
  refreshTable: Function;
}) => {
  const { category } = useSelector<RootState, InventoryTableState>(
    (state: any) => state.inventoryTable
  );
  const [categorySelect, setCategorySelect] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [initialValue, setInitialValue] = useState({
    category: "",
    name: "",
    price: 0,
    cost: 0,
    stock: 0,
    options: [{ name: "", price: 0 }],
  });

  useEffect(() => {
    const handleData = async () => {
      if (props.id) {
        setLoading(true);
        const { categoryId, name, price, cost, stock, options } =
          await getProductFirebase(props.id);

        setCategorySelect(categoryId);
        setInitialValue({
          category: categoryId,
          name,
          price,
          cost,
          stock,
          options: options,
        });
        setLoading(false);
        return;
      }
      return;
    };
    handleData();
  }, []);

  const handleSubmitForm = async (values: any): Promise<void> => {
    let newValue = values;
    newValue.categoryId = values.category;
    newValue = removeObjectKey(newValue, "category");
    setSubmitLoading(true);
    if (props.id) {
      await updateFirebase(props.id, newValue);
      props.closeModal();
      props.refreshTable();
      setSubmitLoading(false);
      return;
    }
    await addFirebase(newValue);
    props.closeModal();
    props.refreshTable();
    setSubmitLoading(false);
  };

  return !loading ? (
    <div style={{ maxHeight: "70vh", overflow: "scroll" }}>
      <Formik
        initialValues={initialValue}
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
              options={values.options}
              error={errors}
            ></OptionField>

            <br />
            <Button
              type="primary"
              loading={submitLoading}
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
