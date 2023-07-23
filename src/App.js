import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/app.scss";
import CommonLayout from "./pages/layout/CommonLayout";
import Products from "./pages/products/Products";
import ShoppingCart from "./pages/shopping-cart/ShoppingCart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CommonLayout />}>
          <Route index element={<Products />} />
          <Route path="shopping-cart" element={<ShoppingCart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
