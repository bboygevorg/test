import Cart from "./components/Cart";
import ProductFilter from "./components/ProductFilter";
import ProductsList from "./components/ProductsList";
import UserComponent from "./components/UserComponent";

function App() {
  return (
    <div style={{ padding: "1rem" }}>
      <UserComponent />
      <h1>Интернет-магазин одежды</h1>
      <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
        <div style={{ flex: "2" }}>
          <ProductFilter />
          <ProductsList />
        </div>
        <div style={{ flex: "1" }}>
          <Cart />
        </div>
      </div>
    </div>
  );
}

export default App;
