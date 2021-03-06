import { createGlobalStyle } from 'styled-components';
import theme from '../constants/theme';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    width: 100vw;
    min-height: 100vh;
    background-color: ${theme.BG_COLOR_5};
    color: ${theme.COLOR_GRAY};
    font-size: 16px;
  }

  #root {
    display: grid;
    grid-template-rows: 50px calc(100vh - 50px);
    grid-template-columns: 320px 1fr;
    grid-template-areas: "header header"
                        "nav    main"
                        "nav    main";
  }

  header {
    grid-area: header;
    background-color: ${theme.BG_COLOR_4};
  }

  nav {
    display: grid;
    grid-template-rows: 14em;
    grid-area: nav;
    background-color: ${theme.BG_COLOR_3};
  }

  main {
    box-sizing: border-box;
    grid-area: main;
    padding: 35px;
    background-color: ${theme.BG_COLOR_5};
  }

  Meeting-main {
    display: grid;
    grid-template-columns: 48em 20em;
    grid-area: main;
    background-color: ${theme.BG_COLOR_5};
  }

  * {
    box-sizing: border-box;
    font-family: 'Ubuntu', sans-serif;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
    color: ${theme.COLOR_WHITE};
  }

  a, a:link, a:visited {
    margin: 0 1rem;
    color: ${theme.COLOR_WHITE};
    text-decoration: none;
  }

  a:hover {
    color: ${theme.COLOR_BLUE};
    transition: all 0.3s;
  }
`;

export default GlobalStyle;
