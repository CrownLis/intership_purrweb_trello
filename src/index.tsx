import React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import App from './App';

const GlobalStyle = createGlobalStyle`

body {
  margin: 0;
}

main {
  display: block;
}

h1,h2,h3,h4,h5,h6 {
  font-size: 2em;
  margin: 0;
}

span {
  margin:0;
}
`

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.Fragment>
    <GlobalStyle />
    <App />
  </React.Fragment>

);
