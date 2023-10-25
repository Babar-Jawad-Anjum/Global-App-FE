import React from "react";
import jwt_decode from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

const Auth = () => {
  const token = localStorage.getItem("token");
  // const decodedToken = jwt_decode(token);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default Auth;
