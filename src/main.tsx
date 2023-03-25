import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import VConsole from "vconsole";

const vconsole = new VConsole();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
