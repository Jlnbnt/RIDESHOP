import React, { useState, createContext, useContext } from "react";

import { useStateContext } from "./ContextProvider";

import Tooltip from "@mui/material/Tooltip";

import { HiOutlineSearch } from "react-icons/hi";

const ComponentsContext = createContext();

export const ComponentsProvider = ({ children }) => {
  const { setIsClicked, initialLayoutState } = useStateContext();
  const [modProduct, setModProduct] = useState();

  const SearchBar = ({ placeholder, value, setFunc, submitFunc }) => {
    return (
      <form
        className="flex   rounded items-center justify-between px-3 dark:text-gray-200 text-slate-900 min-w-150"
        style={{ border: `1px solid rgb(148 163 184)` }}
        onSubmit={submitFunc}
      >
        <input
          type="text"
          autoComplete="off"
          className="py-1 md:py-2 w-48 bg-transparent placeholder-black dark:placeholder-gray-200 outline-none md:w-80"
          placeholder={placeholder}
          value={value}
          onChange={setFunc}
        />
        <HiOutlineSearch
          className="dark:text-gray-200 mr-3"
          size={20}
          style={{ color: "rgb(148 163 184)" }}
        />
      </form>
    );
  };

  const NavButton = ({ title, customFunc, icon, dotColor, color }) => (
    <Tooltip title={title} placement="bottom">
      <button
        type="button"
        onClick={customFunc}
        style={{ color }}
        className="relative text-xl rounded-full p-3 hover:text-gray-200 cursor-pointer"
      >
        <span style={{ background: dotColor }} className="" />

        {icon}
      </button>
    </Tooltip>
  );

  const Button = ({
    icon,
    bgColor,
    color,
    bgHoverColor,
    size,
    text,
    borderRadius,
    width,
    otherFunct,
  }) => {
    return (
      <button
        type="button"
        onClick={() => {
          setIsClicked(initialLayoutState);
          otherFunct && otherFunct();
        }}
        style={{ backgroundColor: bgColor, color, borderRadius }}
        className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
      >
        {icon} {text}
      </button>
    );
  };

  return (
    <ComponentsContext.Provider
      value={{
        SearchBar,
        NavButton,
        Button,
        modProduct,
        setModProduct,
        setIsClicked,
        initialLayoutState,
      }}
    >
      {children}
    </ComponentsContext.Provider>
  );
};

export const useComponentsContext = () => useContext(ComponentsContext);
