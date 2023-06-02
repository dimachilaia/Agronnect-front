import { createGlobalStyle } from "styled-components";

const GlobasStyle = createGlobalStyle`
  *, 
  *::after,
  *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Roboto', sans-serif;
  }
`;

export default GlobasStyle;
