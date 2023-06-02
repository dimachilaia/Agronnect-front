import { BrowserRouter, Route, Routes } from "react-router-dom";
import Button from "./components/Button";
import ImageContainer from "./components/ImageSlider";
import { Login, MainPage } from "./routes";
import GlobasStyle from "./components/GlobalStyles";

export default function Router() {
  return (
    <>
      <GlobasStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dima" element={<Button title="Dima" />} />
          <Route path="/image" element={<ImageContainer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
