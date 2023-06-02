import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useUser } from "../providers/user";
import styled from "styled-components";
import Button from "../components/Button";
import Cookies from "js-cookie";
import { useEffect } from "react";

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
          <h1>
            User is logged in: {user?.name} {user?.last_name}
          </h1>
          <Button title="LOG OUT" onClick={logOutHandler} />
        </>
      ) : (
        <Link to="/login">Log in</Link>
      )}
    </Container>
  );
};

const Container = styled.div``;
