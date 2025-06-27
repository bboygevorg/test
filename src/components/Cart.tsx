import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { removeFromCart, clearCart } from "../store/cartSlice";

const Cart: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
    <div>
      <h2>Корзина</h2>
      <ul>
        {cartItems.map((item) => (
          <li
            key={item.id}
            style={{
              marginBottom: "1rem",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              style={{
                marginBottom: "1rem",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            />
            <h4>{item.name}</h4>
            <p>Цена: {item.price}</p>
            <p>Количество: {item.quantity}</p>
            <button onClick={() => dispatch(removeFromCart(item.id))}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
      <h3>Общая сумма: {total.toFixed(2)} ₽</h3>
      <button onClick={() => dispatch(clearCart())}>Очистить корзину</button>
    </div>
  );
};

export default Cart;
