import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />;
    </CartProvider>
  );
}

export default App;
