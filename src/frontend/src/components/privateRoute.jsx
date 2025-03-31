import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import httpClient from "../httpClient";
import LoadingModal from "./LoadingModal";

const PrivateRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await httpClient.get("http://localhost:5000/auth/@me");
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <LoadingModal isLoading={isLoading} />
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
