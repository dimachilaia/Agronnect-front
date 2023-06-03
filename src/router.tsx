import { BrowserRouter, Route, Routes } from "react-router-dom";
import Button from "./components/Button";
import ImageContainer from "./components/ImageSlider";
import { Login, MainPage } from "./routes";
import GlobasStyle from "./components/GlobalStyles";
import Register from "./routes/Register";
import { UserProvider } from "./providers/user";

export default function Router() {
  return (
    <>
      <UserProvider>
        <GlobasStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}
