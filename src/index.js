import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserProvider } from "./context/UserProvider";

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
