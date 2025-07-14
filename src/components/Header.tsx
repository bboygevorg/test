import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav style={{ padding: "1rem", background: "#eee" }}>
      <Link to="/" style={{ marginRight: "1rem" }}>
        Главная
      </Link>
      <Link to="/catalog" style={{ marginRight: "1rem" }}>
        Каталог
      </Link>
      <Link to="/cart">Корзина</Link>
    </nav>
  );
};

export default Header;
