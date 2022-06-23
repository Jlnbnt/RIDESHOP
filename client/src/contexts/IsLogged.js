import { Outlet, Navigate, useLocation } from "react-router-dom";

const IsLogged = ({ auth }) => {
  const location = useLocation();

  return !auth.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default IsLogged;
