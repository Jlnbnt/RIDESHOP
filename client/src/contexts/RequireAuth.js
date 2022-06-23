import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "./AuthProvider";

const RequireAuth = () => {
  const { auth } = useAuthContext();
  const location = useLocation();

  return auth?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
