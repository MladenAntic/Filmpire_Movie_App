import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { StyledEngineProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "./app/store.js";
import "./globals.css";
import ToggleColorModeProvider from "./utils/ToggleColorMode.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <ToggleColorModeProvider>
        <React.StrictMode>
          <StyledEngineProvider injectFirst>
            <App />
          </StyledEngineProvider>
        </React.StrictMode>
      </ToggleColorModeProvider>
    </BrowserRouter>
  </Provider>
);
