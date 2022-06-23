import React, { createContext, useState, useContext, useEffect } from "react";

import axios from "../config/axios";

import { useLocation, useNavigate } from "react-router-dom";
import { useStateContext } from "./ContextProvider";

import jwtDecode from "jwt-decode";

import toast from "react-hot-toast";

/*import SimpleCrypto from "simple-crypto-js";
 const secretKey = "some-unique-key";
const simpleCrypto = new SimpleCrypto(secretKey); */

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const { setIsClicked, initialLayoutState } = useStateContext();
  const location = useLocation();
  const navigate = useNavigate();

  const [trig, setTrig] = useState(false);
  const [auth, setAuth] = useState({});
  const [userInfo, setUserInfo] = useState({});

  const userId = auth?.accessToken ? jwtDecode(auth.accessToken).id : undefined;

  const isAdmin = auth?.accessToken
    ? jwtDecode(auth.accessToken).isAdmin
    : false;
  const from = location.state?.from?.pathname || "/";
  async function wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post(
        "/login",
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const login = jwtDecode(accessToken).id;
      const user = localStorage.getItem("user");
      if (user && login !== user) {
        setTrig(true);
      }
      setIsClicked(initialLayoutState);
      localStorage.setItem("user", jwtDecode(accessToken).id);
      setAuth({ accessToken });
      localStorage.setItem("username", username);
      navigate("/");
    } catch (err) {
      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error("Username and password are required.");
      } else if (err.response?.status === 401) {
        toast.error("Unauthorized.");
      } else {
        toast.error("Login Failed.");
      }
    }
  };

  const handleLogout = async () => {
    setAuth({});
    try {
      const response = await axios.get("/logout", {
        withCredentials: true,
      });
      localStorage.setItem("cart", []);
      setIsClicked(initialLayoutState);
      setAuth({});
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegister = async (
    name,
    lastname,
    username,
    email,
    password,
    passwordConfirm
  ) => {
    if (password !== passwordConfirm)
      return toast.error("Passwords don't match");
    try {
      const response = await axios.post(
        "/register",
        JSON.stringify({
          name,
          lastname,
          username,
          email,
          password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (localStorage.getItem("cart")) navigate(from, { replace: true });
      navigate("/login");
    } catch (err) {
      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 409) {
        toast.error("Username Taken");
      } else {
        toast.error("Registration Failed");
      }
    }
  };

  useEffect(() => {}, []);

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        auth,
        setAuth,
        handleLogout,
        userId,
        handleRegister,
        userInfo,
        setUserInfo,
        isAdmin,
        trig,
        setTrig,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
