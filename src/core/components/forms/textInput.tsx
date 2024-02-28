import { Input, Typography } from "antd";
import styled from "styled-components";
import ErrorText from "./errorText";

const StyledSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface TextInputProps {
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
  label: string;
  value?: string;
  name?: string;
  error?: string | false | undefined;
}

const TextInput: React.FC<TextInputProps> = ({
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
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <ErrorText text={error}></ErrorText>
    </StyledSelectContainer>
  );
};

export default TextInput;
