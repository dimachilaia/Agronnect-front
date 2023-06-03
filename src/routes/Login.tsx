import { FormEvent, useEffect, useState } from "react";
import Input from "../components/Input";
import styled from "styled-components";
import ImageSlider from "../components/ImageSlider";
import Button from "../components/Button";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useUser } from "../providers/user";
import Cookies from "js-cookie";
import Loading from "../components/Loading/Loading";

const types = ["specialist", "farmer"];
export const Login = () => {
  const [activeType, setActiveType] = useState("specialist");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, isLoggedIn } = useUser();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post("https://api.agronnect.dev/api/login", {
        email,
        password,
      });
      if (res.data.status === "success") {
        const { token, user } = res.data;

        Cookies.set("token", token);
        setUser(user);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      setErrorMessage("Please provide correct mail and password to authorize");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
  };

  return (
    <Container>
      <ImageSlider />
      <FormContainer onSubmit={submit}>
        <Heading>Sign In Agronnect</Heading>
        {errorMessage && (
          <ErrorMessage>
            {errorMessage} <XIcon onClick={() => setErrorMessage("")}>X</XIcon>
          </ErrorMessage>
        )}
        <Switcher>
          {types.map((type) => {
            return (
              <SwitcherItem
                key={type}
                $isActive={activeType === type}
                onClick={() => setActiveType(type)}
              >
                {type}
              </SwitcherItem>
            );
          })}
        </Switcher>
        <InputsContainer>
          <Input
            label="email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputsContainer>
        <BottomContainer>
          <Link self to="#">
            Forgot Your Password?
          </Link>
          <Button type="submit" title="SIGN IN" />
          <span>
            Don’t have an account?{" "}
            <Link to="/register" state={{ type: activeType }}>
              Create One.
            </Link>
          </span>
        </BottomContainer>
        {isLoading && <Loading />}{" "}
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
  width: 100%;

  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    gap: 20px;
  }
`;

const FormContainer = styled.form`
  max-width: 500px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;

  @media screen and (max-width: 1024px) {
    background: #ffffff;
    transform: translateY(-50px);
    position: relative;
    z-index: 5;
    width: 100%;
    max-width: unset;
    padding: 51px 50px;
    box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.08);
    border-radius: 20px;
    gap: 20px;
  }
`;

const Heading = styled.h1`
  font-weight: 500;
  font-size: 48px;
  line-height: 56px;
  text-align: center;
  color: #000000;
  @media screen and (max-width: 768px) {
    font-size: 24px;
    line-height: 28px;
  }
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
  padding: 8px;
  gap: 4px;
  justify-content: space-between;
  width: 100%;
  display: flex;
  align-items: center;
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
  width: 100%;
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: 14px;
  user-select: none;
  @media screen and (max-width: 768px) {
    font-family: "Roboto";
    font-style: normal;
    font-size: 16px;
    line-height: 19px;
  }
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  width: 100%;
`;

const Link = styled(RouterLink)<{ self?: boolean }>`
  align-self: ${({ self }) => (self ? "end" : "unset")};
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #2596ff;
  text-decoration: none;
`;
const ErrorMessage = styled.span`
  background: red;
  color: white;
  padding: 12px 34px;
  border-radius: 8px;
  font-size: 20px;
  height: 100px;
  position: relative;
`;

const XIcon = styled.span`
  top: 10px;
  right: 12px;
  position: absolute;
  cursor: pointer;
  font-weight: bold;
`;
