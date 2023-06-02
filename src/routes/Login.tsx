import { useState } from "react";
import Input from "../components/Input";
import styled from "styled-components";
import ImageSlider from "../components/ImageSlider";

export const Login = () => {
  const [activeType, setActiveType] = useState<"specialist" | "farmer">(
    "specialist"
  );

  return (
    <Container>
      <ImageSlider />
      <FormContainer>
        <Heading>Sign In Agronnect</Heading>
        <Switcher>
          <SwitcherItem
            $isActive={activeType === "specialist"}
            onClick={() => setActiveType("specialist")}
          >
            Specialist
          </SwitcherItem>
          <SwitcherItem
            $isActive={activeType === "farmer"}
            onClick={() => setActiveType("farmer")}
          >
            Farmer
          </SwitcherItem>
        </Switcher>
        <Input label="Email" type="email" required />
        <button type="submit">Submit</button>
      </FormContainer>
    </Container>
  );
};

const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const FormContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;

const Heading = styled.h1`
  font-weight: 500;
  font-size: 48px;
  line-height: 56px;
  text-align: center;
  color: #000000;
`;

const Switcher = styled.div`
  filter: drop-shadow(2px 4px 9px rgba(0, 0, 0, 0.05));
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.2)
    ),
    #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 40px;
`;

const SwitcherItem = styled.div<{ $isActive: boolean }>`
  background: ${({ $isActive }) => ($isActive ? "#00ab89" : "transparent")};
  color: ${({ $isActive }) => ($isActive ? "#FFFFFF" : "#00AB89")};
  border-radius: 40px;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  text-transform: capitalize;
`;
