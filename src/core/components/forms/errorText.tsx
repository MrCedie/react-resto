import React from "react";
import styled from "styled-components";

const StyledText = styled.div`
  color: #ff0000;
`;

interface ErrorTextProps {
  text?: string | null | false | undefined;
}

const ErrorText: React.FC<ErrorTextProps> = ({ text }) => {
  return <StyledText>{text}</StyledText>;
};

export default ErrorText;
