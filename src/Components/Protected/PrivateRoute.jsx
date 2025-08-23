import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const RouteGuard = ({
  children,
  type = "private",
  redirectPath = "/fill-details",
  loginPath = "/",
}) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // ✅ Check auth from localStorage in a safe boolean way
    const authFlag = localStorage.getItem("authenticated");
    setIsAuthenticated(authFlag === "true"); // ensure strict boolean
    setAuthChecked(true);
  }, []);

  // ✅ While auth is being checked, render nothing (or loader)
  if (!authChecked) return null; // could replace null with <Loader /> if you want

  // Private route logic
  if (type === "private" && !isAuthenticated) {
    return <Navigate to={loginPath} replace />;
  }

  // Public route logic
  if (type === "public" && isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // ✅ Authorized / allowed route
  return <>{children}</>;
};

export default RouteGuard;
