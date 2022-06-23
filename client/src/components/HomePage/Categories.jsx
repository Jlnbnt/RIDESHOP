import React from "react";

import CategoryItem from "./CategoryItem";

import { categoriesData } from "../Utils/Utils";

const Categories = () => {
  return (
    <div className="w-full h-full pt-8">
      <div className="flex md:flex-row justify-center flex-wrap items-center gap-4 w-full">
        {categoriesData.map((catData) => (
          <CategoryItem key={catData.id} catData={catData} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
