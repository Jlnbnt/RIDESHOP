import React, { useState } from "react";

import { useLocation } from "react-router-dom";

import { Products } from "../components";

import { InputLabel, FormControl, MenuItem, Select } from "@mui/material";

const ProductList = () => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const location = useLocation();
  const cat = location.pathname.split("/")[2];

  /*  const handleFilters = (e) => {
    const value = e.target.value;
    const filterName = e.target.name;
    if (filterName === "size" && value === "all") {
      delete filters.size;
      setFilters({
        ...filters,
      });
    } else if (filterName === "color" && value === "all") {
      delete filters.color;
      setFilters({
        ...filters,
      });
    }  else if (filterName === "gender" && value === "all") {
      delete filters.gender;
      setFilters({
        ...filters,
      });
    } else {
      setFilters({
        ...filters,
        [e.target.name]: value,
      });
    }
  }; */
  return (
    <>
      <div className="flex flex-col gap-4 min-w-full h-full justify-center items-center  mt-14 text-slate-900 dark:text-white">
        <div className="flex mb-8 flex-col sm:justify-end sm:flex-row gap-4 w-full">
          {/*  */}
          {/*   <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="sizeInput">Size</InputLabel>
            <Select
              labelId="sizeInput"
              id="sizeInput"
              label="Size"
              name="size"
              onChange={(e) => handleFilters(e)}
            >
              <MenuItem value={"all"}>Toutes les tailles</MenuItem>
              <MenuItem value={"xs"}>XS</MenuItem>
              <MenuItem value={"s"}>S</MenuItem>
              <MenuItem value={"m"}>M</MenuItem>
              <MenuItem value={"L"}>L</MenuItem>
              <MenuItem value={"xl"}>XL</MenuItem>
              <MenuItem value={"xxl"}>XXL</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="colorInput">Color</InputLabel>
            <Select
              labelId="colorInput"
              id="colorInput"
              label="Color"
              name="color"
              onChange={handleFilters}
            >
              <MenuItem value={"all"}>Toutes les couleurs</MenuItem>
              <MenuItem value={"gray"}>Gray</MenuItem>
              <MenuItem value={"blue"}>Blue</MenuItem>
              <MenuItem value={"red"}>Red</MenuItem>
              <MenuItem value={"brown"}>Brown</MenuItem>
              <MenuItem value={"orange"}>Orange</MenuItem>
              <MenuItem value={"black"}>Black</MenuItem>
              <MenuItem value={"green"}>Green</MenuItem>
              <MenuItem value={"pink"}>Pink</MenuItem>
              <MenuItem value={"white"}>White</MenuItem>
            </Select>
          </FormControl>  
           <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="genderInput">Color</InputLabel>
            <Select
              labelId="genderInput"
              id="genderInput"
              label="Genre"
              name="gender"
              onChange={handleFilters}
            >
              <MenuItem value={"all"}>Toutes les genres</MenuItem>
              <MenuItem value={"homme"}>Homme</MenuItem>
              <MenuItem value={"femme"}>Femme</MenuItem>
            </Select>
          </FormControl> */}

          {/*  */}
          <FormControl
            sx={{ m: 1, minWidth: 120, maxWidth: "130px" }}
            size="small"
          >
            <InputLabel className="text-slate-400" id="sortInput">
              Trier
            </InputLabel>
            <Select
              sx={{
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(148 163 184)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(71 85 105)",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(148 163 184)",
                },
                "& .MuiSelect-select": {
                  color: "rgb(148 163 184)",
                },
                "& .MuiSvgIcon-root": {
                  color: "rgb(148 163 184)",
                },
              }}
              value={sort ?? "newest"}
              labelId="sortInput"
              id="sortInput"
              label="Size"
              name="sort"
              defaultValue={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <MenuItem value={"newest"}>Nouveautées</MenuItem>
              <MenuItem value={"asc"}>Prix croissant</MenuItem>
              <MenuItem value={"desc"}>Prix décroissant</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Products cat={cat} filters={filters} sort={sort} />
      </div>
    </>
  );
};

export default ProductList;
