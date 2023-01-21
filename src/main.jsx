import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter} from "react-router-dom"
import { SWRConfig } from "swr";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import CartContextProvider from "./context/CartContext";
import { SWR_CONFIGS } from './config'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SWRConfig value={SWR_CONFIGS}>
        <AuthProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </AuthProvider>
      </SWRConfig>
    </BrowserRouter>
  </React.StrictMode>
);
