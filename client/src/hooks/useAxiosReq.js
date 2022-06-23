import axiosReq from "../config/axios";
import { useEffect } from "react";

import { useAuthContext } from "../contexts/AuthProvider";

import useRefreshToken from "./useRefreshToken";

const useAxiosReq = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuthContext();

  useEffect(() => {
    const requestIntercept = axiosReq.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosReq.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosReq(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosReq.interceptors.request.eject(requestIntercept);
      axiosReq.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosReq;
};

export default useAxiosReq;
