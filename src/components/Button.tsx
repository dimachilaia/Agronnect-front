import { ComponentProps, forwardRef } from "react";
import styled from "styled-components";

interface Props extends ComponentProps<"button"> {
  title: string;
}

const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { title, ...otherProps } = props;
  return (
    <ButtonContainer {...otherProps} ref={ref}>
      <Title>{title}</Title>
    </ButtonContainer>
  );
});

export default Button;

const ButtonContainer = styled.button`
  background: linear-gradient(135deg, #00ab89 0%, #007c5a 100%);
  color: #fff;
  border: none;
  border-radius: 40px;
  padding: 20px 0;
  width: 100%;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
  }
`;
const Title = styled.span`
  color: #ffffff;
  font-family: "Roboto";
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  text-transform: uppercase;

  @media screen and (max-width: 768px) {
    font-size: 16px;
    line-height: 19px;
  }
`;
