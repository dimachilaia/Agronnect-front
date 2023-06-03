import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import { useUser } from "../providers/user";

import Input from "../components/Input";
import Button from "../components/Button";

export const MainPage = () => {
  const { user, isLoggedIn, setUser } = useUser();
  const navigate = useNavigate();

  const logOutHandler = () => {
    setUser(null);
    Cookies.remove("token");
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <Container>
      {isLoggedIn ? (
        <>
          <WelcomeMessage>
            Hello, {user?.name} {user?.last_name}
          </WelcomeMessage>
          <Button title="LOG OUT" onClick={logOutHandler} />
        </>
      ) : (
        <Link to="/login">Log in</Link>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const WelcomeMessage = styled.h1`
  margin-bottom: 20px;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
`;
