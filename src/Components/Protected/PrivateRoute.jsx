import { useState, useEffect, useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { OtpContext } from "../../Context/OtpContext";

const RouteGuard = ({ children, type = "private" }) => {
  const { anchor } = useParams();
  const { authToken: contextToken, applicationId: contextAppId } = useContext(OtpContext);

  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authToken = contextToken || localStorage.getItem("authToken");
    const applicationId = contextAppId || localStorage.getItem("applicationId");

    setIsAuthenticated(!!authToken && !!applicationId);
    setAuthChecked(true);
  }, [contextToken, contextAppId]);

  if (!authChecked) return null; // could show loader

  // Full absolute redirect path
  const loginPath = `/${anchor}/subscription`;
  const redirectPath = `/pre_approved_share_details/${anchor}/pre-approved`;

  // Private route logic
  if (type === "private" && !isAuthenticated) {
    return <Navigate to={loginPath} replace />;
  }

  // ✅ Remove this redirect to allow logged-in users to access login page
  // if (type === "public" && isAuthenticated) {
  //   return <Navigate to={redirectPath} replace />;
  // }

  return <>{children}</>;
};

export default RouteGuard;
