import React from "react";

import { useStateContext } from "../contexts/ContextProvider";

import Carousel from "react-material-ui-carousel";

import { carouselData } from "../components/Utils/Utils";

import { Products, Categories } from "../components";

import { Link } from "react-router-dom";

const HomePage = () => {
  const { screenSize } = useStateContext();

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="h-screen w-screen ">
        <Carousel
          interval={7000}
          autoPlay={true}
          swipe={false}
          navButtonsProps={{
            style: {
              backgroundColor: "rgb(148 163 184)",
              display: screenSize < 780 && "none",
              color: "#DCDCDC",
            },
          }}
          indicatorIconButtonProps={{
            style: {
              display: "none",
            },
          }}
          activeIndicatorIconButtonProps={{
            style: {
              color: "rgb(148 163 184)",
            },
          }}
          navButtonsAlwaysVisible={true}
          className="w-full"
        >
          {carouselData.map((item) => (
            <div
              className="w-screen h-screen bg-no-repeat bg-cover flex flex-col justify-center items-center"
              style={{ background: `url(${item.img})` }}
              key={item.title}
            >
              <div className="h-full w-full"></div>
              <div className="h-full w-full flex flex-col items-center bg-black bg-opacity-50 justify-start md:justify-center pt-4">
                <h1 className="text-white font-semibold mb-6 text-5xl md:text-7xl text-center max-w-full">
                  {item.title}
                </h1>
                <h2 className="text-white text-2xl text-center font-semibold mb-6  lg:text-4xl max-w-full">
                  {item.baseline}
                </h2>
                <Link
                  to={`/products/${item.cat}`}
                  className="text-white font-semibold border-solid border-2 hover:border-slate-900 hover:text-slate-900 hover:bg-gray-200 border-white p-2 text-xl hover:scale-110 transition-all duration-300 ease-in-out"
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <Categories />
      <div className="bg-gray-100 w-full h-full mt-8 p-8 dark:bg-gray-800 dark:text-white">
        <Products />
      </div>
    </div>
  );
};

export default HomePage;
