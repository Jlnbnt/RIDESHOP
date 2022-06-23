import React from "react";

import { createContext, useState, useContext } from "react";

const StateContext = createContext();

const initialLayoutState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [isClicked, setIsClicked] = useState(initialLayoutState);
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentMode, setCurrentMode] = useState("Dark");

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
  };

  const handleClick = (clicked) =>
    setIsClicked({ ...initialLayoutState, [clicked]: true });

  const firstSetup = () => {
    const currentThemeMode = localStorage.getItem("themeMode");
    localStorage.setItem(
      "themeMode",
      currentThemeMode ? currentThemeMode : "Dark"
    );

    if (currentThemeMode) {
      setCurrentMode(currentThemeMode);
    }
  };

  const clickedMenu = (ref) => {
    const checkIfClickedOutside = (e) => {
      if (isClicked && ref.current && !ref.current.contains(e.target)) {
        setIsClicked(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  };

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
        currentMode,
        setMode,
        setCurrentMode,
        initialLayoutState,
        firstSetup,
        clickedMenu,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
