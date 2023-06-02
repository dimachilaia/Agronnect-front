import React from "react";
import styled from "styled-components";

interface ButtonProps {
  title?: string;
}

const Button = ({ title }: ButtonProps) => {
  return (
    <ButtonContainer>
      <Title>{title}</Title>
    </ButtonContainer>
  );
};

export default Button;

const ButtonContainer = styled.button`
  background: linear-gradient(135deg, #00ab89 0%, #007c5a 100%);
  color: #fff;
  border: none;
  border-radius: 40px;
  padding: 20px 0;
  width: 100%;
  cursor: pointer;
`;

const Title = styled.span`
  color: #ffffff;
  font-family: "Roboto";
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  text-transform: uppercase;
`;
