import React, { useState, useRef, useEffect } from "react";

import { Link, NavLink, useNavigate } from "react-router-dom";

import { useStateContext } from "../../contexts/ContextProvider";
import { useAuthContext } from "../../contexts/AuthProvider";

import { userUtils, categories, adminPages } from "../Utils/Utils";

import { Collapse, ListItemButton, ListItemText, Tooltip } from "@mui/material";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { MdOutlineCancel } from "react-icons/md";
import { HiOutlineSearch } from "react-icons/hi";

const Sidebar = () => {
  const activeLink =
    "flex item-center gap-5 ml-6 p-2 text-md m-2 font-semibold text-gray-300 dark:text-gray-600 hover:underline underline-offset-2";
  const normalLink =
    "flex item-center gap-5 ml-6 p-2 text-md m-2 font-semibold text-gray-700 dark:dark:text-white text-slate-900 hover:underline underline-offset-2";

  const [search, setSearch] = useState("");
  const [catOpen, setCatOpen] = useState(false);
  const [subCatOpen, setSubCatOpen] = useState(false);
  const [subTextile, setSubTextile] = useState(false);
  const [subOutdoor, setSubOutdoor] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);

  const { isAdmin, handleLogout } = useAuthContext();
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();

  const navigate = useNavigate();
  const ref = useRef();

  const handleCloseSideBar = () => {
    if (activeMenu) {
      setActiveMenu(false);
    }
  };

  const handleCatOpen = () => {
    setCatOpen(!catOpen);
  };

  const handleAdminOpen = () => {
    setAdminOpen(!adminOpen);
  };
  const handleUserOpen = () => {
    setUserOpen(!userOpen);
  };
  const handleSubTextile = () => {
    setSubTextile(!subTextile);
  };
  const handleSubOutdoor = () => {
    setSubOutdoor(!subOutdoor);
  };
  const toggleSearch = () => {
    setSearchToggle(!searchToggle);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search) return;
    setActiveMenu(false);
    setTimeout(() => {
      navigate(`/products/${search.toLowerCase().trim()}`);
      setSearch("");
    }, 500);
  };

  useEffect(() => {
    if (screenSize <= 800) {
      const checkIfClickedOutside = (e) => {
        if (activeMenu && ref.current && !ref.current.contains(e.target)) {
          setActiveMenu(false);
        }
      };
      document.addEventListener("mousedown", checkIfClickedOutside);
      return () => {
        document.removeEventListener("mousedown", checkIfClickedOutside);
      };
    }
    // eslint-disable-next-line
  }, [activeMenu]);

  return (
    <div
      className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 dark:text-white text-slate-900"
      ref={ref}
    >
      <>
        {activeMenu && (
          <>
            <div className="flex justify-between items-center">
              <Link
                to="/"
                onClick={handleCloseSideBar}
                className="gap-3 ml-3 mt-4 flex text-3xl font-extrabold tracking-tight"
              >
                <span>RIDESHOP</span>
              </Link>
              <Tooltip title="Menu" placement="bottom">
                <button
                  type="button"
                  onClick={() =>
                    setActiveMenu((prevActiveMenu) => !prevActiveMenu)
                  }
                  className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden dark:text-white dark:hover:text-slate-900"
                >
                  <MdOutlineCancel style={{ color: "rgb(148 163 184)" }} />
                </button>
              </Tooltip>
            </div>
            <div className="h-[0.25px] bg-slate-900 my-4 mr-3 dark:bg-white" />
            <NavLink to="/">
              <ListItemButton
                onClick={() => {
                  setActiveMenu(false);
                  navigate("/");
                }}
              >
                <ListItemText
                  primary="Accueil"
                  className="dark:text-white text-slate-900 underline underline-offset-4 "
                />
              </ListItemButton>
            </NavLink>
            <div className="h-[0.25px] bg-slate-900 my-4 mr-3 dark:bg-white" />
            <div className=" ">
              <ListItemButton onClick={toggleSearch}>
                <ListItemText
                  primary="Recherche"
                  className="dark:text-white text-slate-900 underline underline-offset-4"
                />

                {searchToggle ? (
                  <ExpandLess className="dark:text-white text-slate-900" />
                ) : (
                  <ExpandMore className="dark:text-white text-slate-900" />
                )}
              </ListItemButton>
            </div>
            <Collapse in={searchToggle} timeout="auto" unmountOnExit>
              <form
                onSubmit={handleSearch}
                className="flex  rounded items-center justify-between px-3 dark:text-white text-slate-900  min-w-150 mr-3 my-4 dark:border-white border-slate-900"
                style={{ border: `1px solid` }}
              >
                <input
                  autoFocus
                  className="py-1 md:py-2  bg-transparent dark:text-white text-slate-900 placeholder:dark:text-white placeholder:text-slate-900   outline-none "
                  value={search}
                  type="text"
                  placeholder="Catégorie..."
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit">
                  <HiOutlineSearch
                    className="dark:text-white text-slate-900   mr-3"
                    size={20}
                  />
                </button>
              </form>
            </Collapse>

            <div className="">
              <ListItemButton onClick={handleCatOpen}>
                <ListItemText
                  primary="Catégories"
                  className="dark:text-white text-slate-900 underline underline-offset-4"
                />
                {catOpen ? (
                  <ExpandLess className="dark:text-white text-slate-900" />
                ) : (
                  <ExpandMore className="dark:text-white text-slate-900" />
                )}
              </ListItemButton>
              <Collapse in={catOpen} timeout="auto" unmountOnExit>
                <NavLink to="/products/all">
                  <ListItemButton
                    className="ml-4"
                    onClick={() => setActiveMenu(false)}
                  >
                    <ListItemText
                      primary="Tous les produits"
                      className="dark:text-white text-slate-900 "
                    />
                  </ListItemButton>
                </NavLink>
                {categories?.map((cat) => (
                  <div className="ml-8" key={cat.id}>
                    <ListItemButton
                      onClick={
                        cat.name === "Textile"
                          ? handleSubTextile
                          : handleSubOutdoor
                      }
                    >
                      <ListItemText
                        primary={cat.name}
                        className="dark:text-white text-slate-900 "
                      />
                      {subCatOpen ? (
                        <ExpandLess className="dark:text-white text-slate-900" />
                      ) : (
                        <ExpandMore className="dark:text-white text-slate-900" />
                      )}
                    </ListItemButton>

                    <Collapse
                      in={cat.name === "Textile" ? subTextile : subOutdoor}
                      timeout="auto"
                      unmountOnExit
                    >
                      {cat?.subCat.map((sbCat) => (
                        <NavLink
                          to={sbCat.link}
                          key={sbCat.id}
                          onClick={() => handleCloseSideBar()}
                          className={({ isActive }) =>
                            isActive ? activeLink : normalLink
                          }
                        >
                          <span className="dark:text-white text-slate-900 ">
                            {sbCat.name}
                          </span>
                        </NavLink>
                      ))}
                    </Collapse>
                  </div>
                ))}
                <NavLink to="/products/femme">
                  <ListItemButton
                    className="ml-8"
                    onClick={() => setActiveMenu(false)}
                  >
                    <ListItemText
                      primary="Femme"
                      className="dark:text-white text-slate-900 "
                    />
                  </ListItemButton>
                </NavLink>
                <NavLink to="/products/homme">
                  <ListItemButton
                    className="ml-8"
                    onClick={() => setActiveMenu(false)}
                  >
                    <ListItemText
                      primary="Homme"
                      className="dark:text-white text-slate-900 "
                    />
                  </ListItemButton>
                </NavLink>
              </Collapse>
            </div>
            <div className="h-[0.25px] bg-slate-900 my-4 mr-3 dark:bg-white" />
            <div className=" ">
              <>
                <ListItemButton onClick={handleUserOpen}>
                  <ListItemText
                    primary="Mon compte"
                    className="dark:text-white text-slate-900 underline underline-offset-4"
                  />

                  {userOpen ? (
                    <ExpandLess className="dark:text-white text-slate-900" />
                  ) : (
                    <ExpandMore className="dark:text-white text-slate-900" />
                  )}
                </ListItemButton>
                <Collapse in={userOpen} timeout="auto" unmountOnExit>
                  {userUtils?.map((userUt) => (
                    <NavLink
                      to={userUt.link}
                      key={userUt.id}
                      onClick={() => {
                        userUt.link === "logout" && handleLogout();
                        handleCloseSideBar();
                      }}
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                    >
                      {userUt.icon}
                      <span className="dark:text-white text-slate-900">
                        {userUt.name}
                      </span>
                    </NavLink>
                  ))}
                </Collapse>
              </>
            </div>
            <div className="h-[0.25px] bg-slate-900 my-4 mr-3 dark:bg-white" />
            {isAdmin && (
              <div className="">
                <>
                  <ListItemButton onClick={handleAdminOpen}>
                    <ListItemText
                      primary="Admin"
                      className="dark:text-white text-slate-900 underline underline-offset-4"
                    />
                    {adminOpen ? (
                      <ExpandLess className="dark:text-white text-slate-900" />
                    ) : (
                      <ExpandMore className="dark:text-white text-slate-900" />
                    )}
                  </ListItemButton>
                  <Collapse in={adminOpen} timeout="auto" unmountOnExit>
                    {adminPages?.map((page) => (
                      <NavLink
                        to={page.link}
                        key={page.id}
                        onClick={() => handleCloseSideBar()}
                        className={({ isActive }) =>
                          isActive ? activeLink : normalLink
                        }
                      >
                        {page.icon}
                        <span className="dark:text-white text-slate-900">
                          {page.name}
                        </span>
                      </NavLink>
                    ))}
                  </Collapse>
                </>
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default Sidebar;
