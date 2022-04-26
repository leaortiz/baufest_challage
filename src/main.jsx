import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";

const store = configureStore();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
