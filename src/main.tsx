import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import VConsole from "vconsole";

if (DEBUG) {
  // const vconsole = new VConsole();
}

window.addEventListener("error", (e) => {
  window.utools.showNotification(e.message);
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
