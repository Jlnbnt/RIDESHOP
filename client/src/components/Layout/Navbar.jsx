import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useStateContext } from "../../contexts/ContextProvider";
import { useComponentsContext } from "../../contexts/ComponentsProvider";
import { useCartContext } from "../../contexts/CartProvider";
import { useAuthContext } from "../../contexts/AuthProvider";

import useAxiosReq from "../../hooks/useAxiosReq";

import { Cart, UserProfile } from "..";

import { AiOutlineMenu } from "react-icons/ai";
import { GiSurferVan } from "react-icons/gi";

import Badge from "@mui/material/Badge";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";

const Navbar = () => {
  const { NavButton } = useComponentsContext();
  const navigate = useNavigate();
  const axiosReq = useAxiosReq();
  const { itemCount } = useCartContext();
  const { userId, trig } = useAuthContext();

  const {
    setActiveMenu,
    screenSize,
    setScreenSize,
    handleClick,
    isClicked,
    activeMenu,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
    // eslint-disable-next-line
  }, [screenSize]);

  useEffect(() => {
    const getIt = async () => {
      if (trig === true) {
        const response = await axiosReq.get(`/users/${userId}`);
        localStorage.setItem(
          "cart",
          JSON.stringify(response.data.cart.cartItems)
        );

        window.location.reload();
      }
    };
    getIt();
  }, [trig === true]);

  return (
    <div className="transition-all duration-1000 ease-in-out h-[50px] flex items-center justify-between p-2 fixed w-full dark:bg-slate-900 bg-gray-100 dark:text-slate-900 text-gray-200 z-40">
      <NavButton
        title="Menu"
        customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
        icon={<AiOutlineMenu className="dark:text-white text-slate-900" />}
      />

      <div className="ml-12 dark:text-white text-slate-900 flex items-center justify-center">
        <GiSurferVan
          onClick={() => navigate("/")}
          size={35}
          className="flex-1 cursor-pointer"
        />
      </div>
      <div className=" flex items-center z-0 ">
        <NavButton
          title="Cart"
          customFunc={() => handleClick("cart")}
          color={"rgb(148 163 184)"}
          icon={
            <Badge badgeContent={itemCount} color="primary">
              <ShoppingCartIcon className="dark:text-white text-slate-900" />
            </Badge>
          }
        />
        {userId ? (
          <NavButton
            title="
            Profile"
            color={"rgb(148 163 184)"}
            icon={<PersonIcon className="dark:text-white text-slate-900" />}
            customFunc={() => handleClick("userProfile")}
          />
        ) : (
          <NavButton
            title="Login"
            color={"rgb(148 163 184)"}
            icon={<LoginIcon className="dark:text-white text-slate-900" />}
            customFunc={() => navigate("/login")}
          />
        )}

        {isClicked.cart && <Cart />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
