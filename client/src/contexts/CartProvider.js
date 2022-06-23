import React, {
  useState,
  useReducer,
  createContext,
  useContext,
  useEffect,
} from "react";

import { useAuthContext } from "./AuthProvider";

import useAxiosReq from "../hooks/useAxiosReq";

import cartReducer, { sumItems } from "../reducers/cartReducer";

/* import SimpleCrypto from "simple-crypto-js";

const cryptK = "some-unique-key";
const simpleCrypto = new SimpleCrypto(cryptK);
 */
const CartContext = createContext();

/* encrypt cart */
/* console.log(simpleCrypto.encrypt([])); */
const cartFromStorage =
  localStorage.getItem("cart")?.length > 2
    ? /* simpleCrypto.decrypt( */ JSON.parse(
        localStorage.getItem("cart")
      ) /* ) */
    : [];
export const initialState = {
  cartItems: cartFromStorage,
  ...sumItems(cartFromStorage),
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [prodQty, setProdQty] = useState(1);
  const [product, setProduct] = useState({});
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const { userId } = useAuthContext();
  const [trig, setTrig] = useState(false);
  const axiosReq = useAxiosReq();

  const handleQty = (type) => {
    if (type === "dec") {
      prodQty > 1 && setProdQty(prodQty - 1);
    } else {
      setProdQty(prodQty + 1);
    }
  };

  const addProduct = (product, prodQty, size, color) => {
    dispatch({
      type: "ADD_ITEM",
      payload: product,
      prodQty,
      size,
      color,
    });
  };

  const addMore = (product, prodQty, size, color) =>
    dispatch({
      type: "ADD_MORE",
      payload: product,
      prodQty,
      size,
      color,
    });

  const incProduct = (product, size, color, quantity) =>
    dispatch({
      type: "INCREASE",
      payload: product,
      size,
      color,
      quantity,
    });

  const decProduct = (product, size, color, quantity) =>
    dispatch({
      type: "DECREASE",
      payload: product,
      size,
      color,
      quantity,
    });

  const removeProduct = (product, size, color) =>
    dispatch({
      type: "REMOVE_ITEM",
      payload: product,
      size,
      color,
    });

  const clearCart = () =>
    dispatch({
      type: "CLEAR",
    });

  useEffect(() => {
    const syncCart = async () => {
      try {
        const response = await axiosReq.put(
          `/users/${userId}
        `,
          {
            cart: state,
          }
        );
      } catch (error) {}
    };
    userId && syncCart();
  }, [state]);

  return (
    <CartContext.Provider
      value={{
        handleQty,
        prodQty,
        setProdQty,
        ...state,
        addProduct,
        incProduct,
        decProduct,
        addMore,
        product,
        setProduct,
        color,
        size,
        setColor,
        setSize,
        removeProduct,
        clearCart,
        initialState,
        state,
        trig,
        setTrig,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
