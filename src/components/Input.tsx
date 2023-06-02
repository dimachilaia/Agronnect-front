import { ComponentProps, forwardRef } from "react";
import styled from "styled-components";

interface Props extends ComponentProps<"input"> {
  label: string;
}

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { label, ...otherProps } = props;
  return (
    <InputContainer>
      <Label>{label}</Label>
      <CustomInput {...otherProps} ref={ref} />
    </InputContainer>
  );
});

export default Input;

const InputContainer = styled.label`
  background: #ffffff;
  border: 0.5px solid #a6a6a6;
  border-radius: 12px;
  padding: 12px 32px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-transform: capitalize;
  color: rgba(79, 79, 79, 0.5);
`;

const CustomInput = styled.input`
  border: 0;
  outline: 0;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #4f4f4f;
`;
