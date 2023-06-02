import styled from "styled-components";
import ImageSlider from "../components/ImageSlider";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { FormEvent, useEffect, useState } from "react";
import SelectInput from "../components/SelectInput";
import axios from "axios";
import Button from "../components/Button";
import Cookies from "js-cookie";
import { useUser } from "../providers/user";

interface ICountry {
  id: number;
  name: string;
  code: string;
  created_at: Date;
  updated_at: Date;
}

interface IZone {
  time_zone: string;
}

interface Option {
  value: string;
  label: string;
}

const Register = () => {
  const location = useLocation();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [countries, setCountries] = useState<Option[]>([]);
  const [zones, setZones] = useState<Option[]>([]);
  const [countryValue, setCountryValue] = useState<Option | null>(null);
  const [zoneValue, setZoneValue] = useState<Option | null>(null);
  const { setUser, isLoggedIn } = useUser();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    (async () => {
      const countriesPromise = axios.get(
        "https://api.agronnect.dev/api/country"
      );
      const zonesPromise = axios.get("https://api.agronnect.dev/api/zone");

      const [{ data: countriesData }, { data: zonesData }] = await Promise.all([
        countriesPromise,
        zonesPromise,
      ]);

      setCountries(
        countriesData.data.map((country: ICountry) => {
          return {
            label: country.name,
            value: country.name,
          };
        })
      );

      setZones(
        zonesData.data.map((zone: IZone) => {
          return {
            label: zone.time_zone,
            value: zone.time_zone,
          };
        })
      );
    })();
  }, []);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (password !== repeatPassword) {
    //   setErrorMessage("Passwords don't match!");
    //   return;
    // }

    try {
      const res = await axios.post("https://api.agronnect.dev/api/register", {
        name,
        last_name: lastName,
        email,
        password,
        country: countryValue?.value,
        user_types: location.state?.type || "farmer",
        time_zone: zoneValue?.value,
        locale: zoneValue?.value,
      });

      if (res.data.status === "success") {
        const { token, user } = res.data;

        Cookies.set("token", token);
        setUser(user);
      }
    } catch (e: any) {
      console.log(e);
      setErrorMessage(e.response.data.message);
    }
  };

  return (
    <Container>
      <ImageSlider />
      <FormContainer onSubmit={submit}>
        <HeadingInfo>
          <Heading>
            Register as <span>{location.state?.type || "Farmer"}</span>
          </Heading>
          <Paragraph>
            Please fill out information to create your consultation room
          </Paragraph>
          {errorMessage && (
            <ErrorMessage>
              {errorMessage}
              <XIcon onClick={() => setErrorMessage("")}>X</XIcon>
            </ErrorMessage>
          )}
        </HeadingInfo>
        <InputContainer>
          <Input
            label="First Name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Last Name"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label="Repeat Password"
            type="password"
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <SelectInput
            options={countries}
            setValue={setCountryValue}
            value={countryValue}
            placeholder="Select your country"
          />
          <SelectInput
            options={zones}
            setValue={setZoneValue}
            value={zoneValue}
            placeholder="Select your time-zone"
          />
        </InputContainer>
        <Button title="NEXT" type="submit" />
      </FormContainer>
    </Container>
  );
};

export default Register;

const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const FormContainer = styled.form`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  max-width: 500px;
  padding: 85px 0;
`;

const HeadingInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const Heading = styled.h1`
  font-weight: 500;
  font-size: 48px;
  line-height: 56px;
  text-align: center;
  color: #000000;
  margin-bottom: 25px;

  span {
    text-transform: capitalize;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
`;

const Paragraph = styled.p`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 150.19%;
  text-align: center;
  color: #000000;
`;

const ErrorMessage = styled.span`
  background: red;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-align: center;
  position: relative;
`;

const XIcon = styled.span`
  top: 8px;
  right: 12px;
  position: absolute;
  cursor: pointer;
`;
