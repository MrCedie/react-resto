import { Typography, Select } from "antd";
import ErrorText from "./errorText";
import styled from "styled-components";
import { SelectOption } from "../../../domain/interfaces/selectOption";

const StyledSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface SelecInputProps<T> {
  onChange: (value: string) => void;
  value?: any;
  options: SelectOption<T>[];
  error?: string | false | undefined | null;
}

const SelectInput: React.FC<SelecInputProps<string>> = ({
  onChange,
  value,
  options,
  error,
}) => {
  return (
    <StyledSelectContainer>
      <Typography.Text>Category</Typography.Text>
      <Select onChange={onChange} value={value}>
        {options.map((res, i) => (
          <Select.Option key={`option-category-${i}`} value={res.value}>
            {res.label}
          </Select.Option>
        ))}
      </Select>
      <ErrorText text={error}></ErrorText>
    </StyledSelectContainer>
  );
};

export default SelectInput;
