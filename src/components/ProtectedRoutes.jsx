import React from "react";
import { Outlet } from "react-router-dom";
import { Register } from "../pages/register/register";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const useAuth = () => {
  const [user] = useAuthState(auth);
  return user;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Register />;
};

export default ProtectedRoutes;
