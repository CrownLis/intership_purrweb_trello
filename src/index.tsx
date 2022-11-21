import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { persistor, store } from './store/store'
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';

const GlobalStyle = createGlobalStyle`

body {
  --primary-color:#FFC300;
  --light-color:#FFD240;
  --lightest-color:#FFDE73;
  --dark-color:#BF9E30;
  --darkest-color:#A67F00;
  margin: 0;
  background-color:var(--primary-color);
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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.Fragment>

);
