import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { logout, loginAsync } from "../store/userSlice";

const UserComponent = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("password");

  const handleLogin = () => {
    dispatch(loginAsync({ email, password }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {userState.user ? (
        <>
          <p>Привет, {userState.user.name}</p>
          <button onClick={handleLogout}>Выйти</button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Войти</button>
          {userState.status === "loading" && <p>Загрузка...</p>}
          {userState.error && <p style={{ color: "red" }}>{userState.error}</p>}
        </>
      )}
    </div>
  );
};

export default UserComponent;
