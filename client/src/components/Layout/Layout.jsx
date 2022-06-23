import React, { useEffect } from "react";

import { Outlet } from "react-router-dom";

import { useStateContext } from "../../contexts/ContextProvider";

import { Navbar, Sidebar, Footer, NewsLetter } from "../../components";

const Layout = () => {
  const { activeMenu, firstSetup } = useStateContext();
  useEffect(() => {
    firstSetup();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className=" flex relative dark:bg-main-dark-bg scrollbar-thin">
        {activeMenu ? (
          <>
            <div
              className="w-72 fixed sidebar dark:bg-slate-900 bg-gray-100"
              style={{
                zIndex: "1000",
              }}
            >
              <Sidebar />
            </div>
            <div
              style={{
                zIndex: "999",
              }}
              className="bg-black bg-opacity-70 h-full w-full absolute md:hidden"
            ></div>
          </>
        ) : (
          <div className="w-0">
            <Sidebar />
          </div>
        )}
        <div
          className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full   ${
            activeMenu ? "md:ml-72 " : "flex-2 "
          }`}
        >
          <div className="mb-12 ">
            <Navbar />
          </div>

          <div>
            <Outlet />
          </div>
          <div>
            <NewsLetter />
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
