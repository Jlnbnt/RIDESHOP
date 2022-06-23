/* import SimpleCrypto from "simple-crypto-js";

export const cryptK = "some-unique-key";
const simpleCrypto = new SimpleCrypto(cryptK);
 */

export const isInCart = (product, cartItems, size, color) => {
  return cartItems.find(
    (item) =>
      item._id === product._id && item.size === size && item.color === color
  );
};

const storeCartItems = (cartItems) => {
  const cart = cartItems.length > 0 ? cartItems : [];
  localStorage.setItem(
    "cart",
    /*  simpleCrypto.encrypt( */ JSON.stringify(cart)
  ); /* ); */
};

export const sumItems = (cartItems) => {
  storeCartItems(cartItems);

  return {
    itemCount: cartItems.reduce((total, prod) => total + prod.quantity, 0),
    total: cartItems.reduce(
      (total, prod) => total + prod.price * prod.quantity,
      0
    ),
  };
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      state.cartItems.push({
        ...action.payload,
        quantity: action.prodQty,
        size: action.size,
        color: action.color,
      });

      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems),
      };

    case "ADD_MORE":
      const addMore = state.cartItems.findIndex(
        (item) =>
          item._id === action.payload._id &&
          item.size === action.size &&
          item.color === action.color
      );

      state.cartItems[addMore].quantity += action.prodQty;
      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems),
      };

    case "INCREASE":
      const increaseIndex = state.cartItems.findIndex(
        (item) =>
          item._id === action.payload._id &&
          item.size === action.size &&
          item.color === action.color
      );
      state.cartItems[increaseIndex].quantity++;
      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems),
      };

    case "DECREASE":
      const decreaseIndex = state.cartItems.findIndex(
        (item) =>
          item._id === action.payload._id &&
          item.size === action.size &&
          item.color === action.color
      );
      const product = state.cartItems[decreaseIndex];
      if (product.quantity > 1) {
        product.quantity--;
      }
      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems),
      };

    case "REMOVE_ITEM":
      const newCartItems = state.cartItems.filter(
        (item) => item !== action.payload
      );
      return {
        ...state,
        cartItems: [...newCartItems],
        ...sumItems(newCartItems),
      };
    case "CLEAR":
      localStorage.setItem("cart", /*  simpleCrypto.encrypt( */ []); /* ); */
      return {
        cartItems: [],
        itemCount: 0,
        total: 0,
      };

    default:
      return state;
  }
};

export default cartReducer;
