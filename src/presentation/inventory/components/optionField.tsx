import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Typography, Space, Input, Button } from "antd";
import { FieldArray, FormikErrors, FormikTouched } from "formik";
import styled from "styled-components";
import ErrorText from "../../../core/components/forms/errorText";
import _ from "lodash";
import { ProductForm } from "../../../domain/entities/productForm";

const StyledOptionFieldontainer = styled.div`
  display: flex;
  flex-direction: column;

  .option-field-group {
    display: flex;
    flex-direction: column;
  }
`;

interface OptionFieldProps {
  onChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  onBlur: {
    (e: React.FocusEvent<any>): void;
    <T = string | any>(fieldOrEvent: T): T extends string
      ? (e: any) => void
      : void;
  };
  options: { name: string; price: number }[];
  error: FormikErrors<ProductForm>;
  touched: FormikTouched<ProductForm>;
}

const OptionField: React.FC<OptionFieldProps> = ({
  options,
  onChange,
  error,
  onBlur,
  touched,
}) => {
  const optionError = error.options ?? [];
  function handleErr(index: number) {
    const err = optionError[index];
    const value = options[index];
    if (err) {
      // price accepts 0
      const priceValidation = !/^\d+(\.\d+)?$/.test(String(value.price));
      const nameEmpty = _.isEmpty(value.name);
      if (nameEmpty && priceValidation) {
        return "Option name and price is required";
      }
      if (priceValidation) {
        return "Price Option is required";
      }
      if (nameEmpty) {
        return "Name Option is required";
      }
    }
    return null;
  }

  return (
    <StyledOptionFieldontainer>
      <Typography.Text>Options</Typography.Text>
      <FieldArray name="options">
        {({ remove, push }) => (
          <div className="option-container">
            {options.map((item, index) => (
              <div
                className="option-field-group"
                key={"options-field-" + index}
              >
                <Space.Compact key={index}>
                  <Input
                    name={`options[${index}].name`}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={item.name}
                    placeholder="Option Name"
                  />
                  <Input
                    name={`options[${index}].price`}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="Option Price"
                    value={item.price}
                    type="number"
                  />
                  <Button onClick={() => remove(index)}>
                    <DeleteOutlined />
                  </Button>
                </Space.Compact>
                <ErrorText text={handleErr(index)}></ErrorText>
              </div>
            ))}
            <br />
            <Button onClick={() => push({ name: "", price: 0 })}>
              <PlusOutlined /> ADD OPTION
            </Button>
          </div>
        )}
      </FieldArray>
    </StyledOptionFieldontainer>
  );
};

export default OptionField;
