import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const getCurrentUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      return JSON.parse(atob(token.split(".")[1]));
    }
    return null;
  };
  const user = getCurrentUser();
  return user ? <>{children}</> : <Navigate to="/" />;
}
