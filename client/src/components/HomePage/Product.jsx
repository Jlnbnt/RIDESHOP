import React from "react";
import { useCartContext } from "../../contexts/CartProvider";
import { useStateContext } from "../../contexts/ContextProvider";

import { isInCart } from "../../reducers/cartReducer";

import { useNavigate, useLocation, Link } from "react-router-dom";

import {
  AiOutlineShoppingCart,
  AiOutlineSearch,
  AiOutlinePlus,
} from "react-icons/ai";

const Product = ({ product }) => {
  const navigate = useNavigate();
  const { screenSize } = useStateContext();
  const { addProduct, prodQty, addMore, cartItems } = useCartContext();

  return (
    <div
      style={{
        cursor: screenSize <= 780 ? "pointer" : null,
      }}
      onClick={() => {
        {
          screenSize <= 780 && navigate(`/product/${product._id}`);
        }
      }}
    >
      <img
        src={product.img[0]}
        alt="product"
        className="object-contain h-80  w-80 p-4 hover:scale-90 transition-all duration-300 ease-in-out cursor-pointer"
        onClick={() => navigate(`/product/${product._id}`)}
      />
      <div className="flex flex-col ml-8 gap-2 ">
        <Link to={`/product/${product._id}`}>
          <h2 className="hover:underline font-semibold">{product.title}</h2>
        </Link>
        <p className="text-gray-400">{product.brand}</p>
        <div className="flex items-center justify-between">
          <p>{product.price} €</p>
          <p
            className="font-semibold"
            style={{
              color: product.inStock ? "green" : "red",
            }}
          >
            {product.inStock ? "En Stock" : "Épuisé"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
