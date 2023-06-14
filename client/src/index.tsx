import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import configureKonvaEditorStore from "./redux/store";
import "./i18n";
import { BrowserRouter } from "react-router-dom";
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import './assets/scss/mdb-free.scss';

export const store = configureKonvaEditorStore();

const rootElement = document.getElementById("root");
if (rootElement === null) {
  throw Error("rootElement is null");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
