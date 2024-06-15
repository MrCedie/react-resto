import { Input, Typography } from "antd";
import styled from "styled-components";
import ErrorText from "./errorText";

const StyledSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface NumberInputProps {
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
  value?: number;
  name?: string;
  label: string;
  error?: string | false | undefined;
}

const NumberInput: React.FC<NumberInputProps> = ({
  name,
  error,
  value,
  onChange,
  onBlur,
  label,
}) => {
  return (
    <StyledSelectContainer>
      <Typography.Text>{label}</Typography.Text>
      <Input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <ErrorText text={error}></ErrorText>
    </StyledSelectContainer>
  );
};

export default NumberInput;
