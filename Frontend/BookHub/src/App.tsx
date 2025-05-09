import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
