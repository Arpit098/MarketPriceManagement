import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Store from "./store/reducer.js";
import { Provider } from "react-redux";
import { SidebarProvider } from "./Components/Navigation/SidebarContext.jsx";
createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <SidebarProvider>
    <App />
    </SidebarProvider>
  </Provider>
);
