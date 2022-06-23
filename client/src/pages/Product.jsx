import React, { useState, useEffect } from "react";

import axios from "../config/axios";

import { useNavigate, useLocation } from "react-router-dom";

import { useStateContext } from "../contexts/ContextProvider";
import { useCartContext } from "../contexts/CartProvider";

import Carousel from "react-material-ui-carousel";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import {
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material";

import { isInCart } from "../reducers/cartReducer";

const Product = () => {
  const { screenSize } = useStateContext();

  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const id = location.pathname.split("/")[2];

  const {
    handleQty,
    prodQty,
    addProduct,
    cartItems,
    setProdQty,
    addMore,
    product,
    setProduct,
    size,
    color,
    setSize,
    setColor,
  } = useCartContext();

  useEffect(() => {
    setLoading(true);
    const getProduct = async () => {
      try {
        const response = await axios.get(`/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    setProdQty(1);
    setColor("");
    setSize("");
    getProduct();
  }, [id]);

  return (
    <div className>
      {!loading ? (
        <>
          {product?.price && (
            <>
              <button
                className="bg-gray-200 p-1 text-slate-900 rounded mb-4 mt-4 ml-8"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Retour
              </button>
              <div className="max-h-full min-h-screen whitespace-pre-wrap flex flex-col gap-4 p-8 md:flex-row  text-slate-900 dark:text-white justify-center items-center ">
                <Carousel
                  className="w-full flex-1"
                  navButtonsProps={{
                    style: {
                      backgroundColor: "#DCDCDC",
                      display: screenSize < 780 && "none",
                      color: "#696969",
                    },
                  }}
                  activeIndicatorIconButtonProps={{
                    style: {
                      color: "rgb(148 163 184)",
                    },
                  }}
                  navButtonsAlwaysVisible={true}
                  autoPlay={false}
                >
                  {product.img.map((prodImg) => (
                    <div
                      className="w-full flex flex-col items-center justify-center"
                      key={prodImg}
                    >
                      <img src={prodImg} alt="product" className="w-[500px]" />
                    </div>
                  ))}
                </Carousel>
                <div className="max-w-full flex-1 flex flex-col flex-wrap  md:p-8 p-4">
                  <div>
                    <h2 className="pb-8 text-3xl font-semibold ">
                      {product.title}
                    </h2>
                    <p>{product.desc}</p>
                    <h3 className="text-4xl pt-8">
                      {product.price.toFixed(2)} €
                    </h3>
                    <p
                      className="mt-4"
                      style={{
                        color: product.inStock ? "green" : "red",
                      }}
                    >
                      {product.inStock ? "Disponible" : "Undisponible"}
                    </p>
                    <div
                      style={{ display: product.inStock ? "block" : "none" }}
                    >
                      <div className="flex py-6 items-center">
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                          <InputLabel className="text-slate-400" id="sizeInput">
                            Couleur *
                          </InputLabel>
                          <Select
                            className="capitalize"
                            variant="standard"
                            sx={{
                              "& .MuiSvgIcon-root": {
                                color: "rgb(148 163 184)",
                              },
                              "& .MuiInput-input": {
                                color: "rgb(148 163 184)",
                              },
                              ":before": {
                                borderBottomColor: "rgb(148 163 184)",
                              },
                              ":after": {
                                borderBottomColor: "rgb(148 163 184)",
                              },
                            }}
                            labelId="sizeInput"
                            id="sizeInput"
                            label="Size"
                            name="size"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                          >
                            {product.color?.map((color) => (
                              <MenuItem
                                className="capitalize "
                                value={color}
                                key={color}
                              >
                                {color}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                          <InputLabel
                            className="text-slate-400 "
                            id="sizeInput"
                          >
                            Taille *
                          </InputLabel>
                          <Select
                            className="capitalize"
                            variant="standard"
                            sx={{
                              "& .MuiSvgIcon-root": {
                                color: "rgb(148 163 184)",
                              },
                              "& .MuiInput-input": {
                                color: "rgb(148 163 184)",
                              },
                              ":before": {
                                borderBottomColor: "rgb(148 163 184)",
                              },
                              ":after": {
                                borderBottomColor: "rgb(148 163 184)",
                              },
                            }}
                            labelId="sizeInput"
                            id="sizeInput"
                            label="Size"
                            name="size"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                          >
                            {product.size?.map((size) => (
                              <MenuItem
                                className="capitalize"
                                value={size}
                                key={size}
                              >
                                {size}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                      <p className="text-xs">
                        * Vous devez choisir une taille et une couleur
                      </p>
                      <div className="mt-6 flex flex-col   ">
                        <div className="flex items-center mr-6">
                          <div className="flex items-center border-1 border-r-0 border-color rounded mb-4">
                            <button
                              className="cursor-pointer hover:text-slate-700"
                              onClick={() => handleQty("dec")}
                            >
                              <AiOutlineMinus />
                            </button>
                            <p className="px-4">{prodQty}</p>
                            <button
                              className="cursor-pointer hover:text-slate-700"
                              onClick={() => handleQty("inc")}
                            >
                              <AiOutlinePlus />
                            </button>
                          </div>
                        </div>

                        <div>
                          {!isInCart(product, cartItems, size, color) ? (
                            <button
                              disabled={size === "" || color === ""}
                              className="disabled:opacity-40  my-6 w-full p-3 rounded-lg font-semibold text-md disabled:cursor-not-allowed max-w-[200px]    hover:scale-110    bg-slate-900  text-white   transition-all duration-300 ease-in-out"
                              onClick={() => {
                                addProduct(product, prodQty, size, color);
                                setProdQty(1);
                              }}
                            >
                              AJOUTER AU PANIER
                            </button>
                          ) : (
                            <button
                              disabled={size === "" || color === ""}
                              className="disabled:opacity-10    my-6 w-full p-3 rounded-lg font-semibold text-md disabled:cursor-not-allowed max-w-[200px]     hover:scale-110    bg-slate-900  text-white   transition-all duration-300 ease-in-out"
                              onClick={() => {
                                addMore(product, prodQty, size, color);
                                setProdQty(1);
                              }}
                            >
                              AJOUTER A NOUVEAU
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="h-[50vh] w-screen text-slate-900 dark:text-white p-4 flex justify-center items-center text-4xl">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default Product;
