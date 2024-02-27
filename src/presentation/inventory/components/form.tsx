import { Button, Input, Select, Typography } from "antd";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import {
  CategorySelectConstant,
  ChickenOptions,
  DrinksOptions,
  PastaOptions,
  SandwichOptions,
} from "../../../core/constants/category-constant";
import { SelectOptionType } from "../../../domain/types/select-option-type";
import {
  addFirebase,
  getItemDataFirebase,
  updateFirebase,
} from "../../../data/api/firebaseService";

const InventoryForm = (props: {
  id: string | null;
  closeModal: Function;
  refreshTable: Function;
}) => {
  const [category, setCategory] = useState<string | null>(null);
  const [option, setOption] = useState<SelectOptionType<String>[]>([]);
  const [optionValue, setOptionValue] = useState<string | null>(null);
  const [initializeForm, setInitializeForm] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialValue, setInitialValue] = useState({
    category: "",
    name: "",
    price: 0,
    cost: 0,
    stock: "",
    option: "",
  });

  useEffect(() => {
    const handleData = async () => {
      if (props.id) {
        setInitializeForm(false);
        const { category, name, price, cost, option, stock } =
          await getItemDataFirebase(props.id);
        handleOptionSelection(category);
        setOptionValue(option);
        setInitialValue({
          category,
          name,
          price,
          cost,
          stock,
          option,
        });
        setInitializeForm(true);
        return;
      }
      return;
    };
    handleData();
  }, []);

  const handleOptionSelection = (value: string) => {
    let optionSelect: SelectOptionType<string>[] = [];
    setCategory(value);

    switch (value) {
      case "SANDWICH":
        optionSelect = SandwichOptions;
        break;
      case "DRINKS":
        optionSelect = DrinksOptions;
        break;
      case "PASTA":
        optionSelect = PastaOptions;
        break;
      case "CHICKEN":
        optionSelect = ChickenOptions;
        break;
      default:
        optionSelect = [];
        break;
    }
    setOption(optionSelect);
    setOptionValue(null);
  };

  const handleSubmitForm = async (values: any): Promise<void> => {
    setLoading(true);
    values.category = category ?? "";
    values.option = optionValue ?? "";

    if (props.id) {
      await updateFirebase(props.id, values);
      props.closeModal();
      props.refreshTable();
      return;
    }
    await addFirebase(values);
    props.closeModal();
    props.refreshTable();
  };

  return initializeForm ? (
    <>
      <Formik initialValues={initialValue} onSubmit={handleSubmitForm}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
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
            <Typography.Text>Category</Typography.Text>
            <Select
              onChange={(value) => handleOptionSelection(value)}
              value={category}
            >
              {CategorySelectConstant.map((res, i) => (
                <Select.Option key={`option-category-${i}`} value={res.value}>
                  {res.label}
                </Select.Option>
              ))}
            </Select>
            {errors.category && touched.category && errors.category}

            {category ? (
              <>
                <br />
                {/* PRODUCT NAME */}
                <Typography.Text>Product Name</Typography.Text>
                <Input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name && errors.name}

                <br />
                {/* OPTIONS */}
                <Typography.Text>OPTIONS</Typography.Text>
                <Select
                  onChange={(value) => setOptionValue(value)}
                  value={optionValue}
                >
                  {option.map((res, i) => (
                    <Select.Option key={`option-${i}`} value={res.value}>
                      {res.label}
                    </Select.Option>
                  ))}
                </Select>
                {errors.category && touched.category && errors.category}

                <br />
                {/* PRODUCT PRICE */}
                <Typography.Text>Product Price</Typography.Text>
                <Input
                  type="number"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.price && touched.price && errors.price}

                <br />
                {/* PRODUCT COST */}
                <Typography.Text>Product Cost</Typography.Text>
                <Input
                  type="number"
                  name="cost"
                  value={values.cost}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.cost && touched.cost && errors.cost}

                <br />
                {/* STOCK */}
                <Typography.Text>Product Stock</Typography.Text>
                <Input
                  type="number"
                  name="stock"
                  value={values.stock}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.stock && touched.stock && errors.stock}

                <br />
                <Button
                  type="primary"
                  loading={loading}
                  onClick={() => handleSubmit()}
                >
                  Submit
                </Button>
              </>
            ) : (
              ""
            )}
          </form>
        )}
      </Formik>
    </>
  ) : (
    <></>
  );
};

export default InventoryForm;
