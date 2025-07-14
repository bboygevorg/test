import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserComponent from "./components/UserComponent";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <h1>Интернет-магазин одежды</h1>
      <Header />
      <div style={{ padding: "1rem" }}>
        <UserComponent />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
