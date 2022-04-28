import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const LoginUserPrivateComponent = () => {
  return (
    <>
      {localStorage.getItem("chat-app-user") ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default LoginUserPrivateComponent;
