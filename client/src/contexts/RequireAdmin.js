import jwt_decode from "jwt-decode";

import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "./AuthProvider";

const RequireAdmin = () => {
  const { auth } = useAuthContext();
  const location = useLocation();

  const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;

  const role = decoded.isAdmin;

  return role ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAdmin;
