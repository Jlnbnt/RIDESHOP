import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useComponentsContext } from "../../contexts/ComponentsProvider";

import Product from "./Product";

import { CircularProgress, TablePagination } from "@mui/material";

import axios from "../../config/axios";

const Products = ({ cat, filters, sort }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { SearchBar } = useComponentsContext();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const pagePath = location.pathname;
  const path = location.pathname.split("/")[2];

  const handleSearch = () => {
    return filteredProducts.filter(
      (product) =>
        product.title
          .toLowerCase()
          .includes(search.toLowerCase() || search.toUpperCase()) ||
        product.brand
          .toLowerCase()
          .includes(search.toLowerCase() || search.toUpperCase()) ||
        product.desc
          .toLowerCase()
          .includes(search.toLowerCase() || search.toUpperCase()) ||
        product.categories
          .map((cat) => cat.toLowerCase())
          .includes(search.toLowerCase() || search.toUpperCase())
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    window.scrollTo({
      top: "0",
      behavior: "smooth",
    });
  }, [page]);

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          cat ? `/products?category=${cat}` : "/products"
        );
        setProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        if (error.response.status === 400) {
        }
        navigate("/missing");
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    products.length &&
      cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
    /*     } */
  }, [products, cat, filters]);

  useEffect(() => {
    setPage(0);
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort(
          (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)
        )
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort, filters]);

  return (
    <>
      {!loading ? (
        <div className="w-full h-full">
          {pagePath === "/" && (
            <h2 className="text-4xl text-slate-900 dark:text-white font-semibold">
              MEILLEURES VENTES :
            </h2>
          )}
          {pagePath === "/accueil" && (
            <h2 className="text-4xl text-slate-900 dark:text-white font-semibold">
              MEILLEURES VENTES :
            </h2>
          )}
          {products?.length ? (
            <>
              <h2 className="font-semibold text-5xl py-8 capitalize ml-4">
                {cat === "all"
                  ? ""
                  : cat === "randonn%C3%A9e"
                  ? "randonnée"
                  : cat}
              </h2>
              {path === "all" && (
                <>
                  <div className="flex justify-center items-center w-full mb-[100px]">
                    <SearchBar
                      placeholder="Rechercher..."
                      value={search}
                      setFunc={(e) => setSearch(e.target.value)}
                      submitFunc={(e) => {
                        e.preventDefault();
                        setSearch("");
                        navigate(`/products/${search}`);
                      }}
                    />
                  </div>
                </>
              )}

              <div className="flex md:flex-row justify-center flex-wrap items-center w-full gap-20">
                {cat
                  ? handleSearch(
                      filteredProducts.filter((item) => item).includes(search)
                    )
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((product) => (
                        <Product key={product._id} product={product} />
                      ))
                  : products
                      .sort(() => 0.5 - Math.random())
                      .slice(0, 4)
                      .map((product) => (
                        <Product key={product._id} product={product} />
                      ))}
                {pagePath !== "/" && pagePath !== "/accueil" && (
                  <TablePagination
                    count={filteredProducts ? filteredProducts.length : 0}
                    component="div"
                    labelRowsPerPage={"Produits par pages"}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    className="text-slate-400 w-full scrollbar-thin"
                    rowsPerPageOptions={[6, 12, 24]}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        color: "rgb(148 163 184)",
                      },
                    }}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="h-[50vh] w-screen text-slate-900 dark:text-white p-4 flex justify-center items-center text-4xl">
              <h1>Aucun produit trouvé</h1>
            </div>
          )}
        </div>
      ) : (
        <div className="h-[50vh] w-screen text-slate-900 dark:text-white p-4 flex justify-center items-center text-4xl">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default Products;
