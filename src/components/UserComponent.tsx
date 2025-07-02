import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { login, logout, loginAsync } from "../store/userSlice";

const UserComponent = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
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
      {user ? (
        <>
          <p>Привет, {user.name}</p>
          <button onClick={handleLogout}>Выйти</button>
        </>
      ) : (
        <>
        
        </>
      )}
    </div>
  );
};

export default UserComponent;
