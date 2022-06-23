import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import useRefreshToken from "../hooks/useRefreshToken";
import useLocalStorage from "../hooks/useLocalStorage";
import { useAuthContext } from "./AuthProvider";

import { CircularProgress } from "@mui/material";

const PersistLogin = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuthContext();

  const [isLoading, setIsLoading] = useState(true);
  const [persist] = useLocalStorage("persist", true);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {!persist ? (
        <Outlet />
      ) : isLoading ? (
        <div className="h-screen w-screen display flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
