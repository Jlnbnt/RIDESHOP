import React from "react";

import { Link } from "react-router-dom";

const CategoryItem = ({ catData }) => {
  return (
    <Link to={`/products/${catData.cat}`} className="flex-1">
      <div
        style={{ background: `url(${catData.img})` }}
        className="flex  flex-col bg-center bg-cover items-center justify-center h-96 w-screen md:w-full py-4 hover:scale-90 transition-all duration-300 ease-in-out"
        key={catData.id}
      >
        <h1 className="text-white font-semibold text-7xl md:text-4xl lg:text-7xl text-center  hover:scale-90 transition-all duration-300 ease-in-out">
          {catData.title}
        </h1>
      </div>
    </Link>
  );
};

export default CategoryItem;
