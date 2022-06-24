import React, { useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

import { useStateContext } from "../../contexts/ContextProvider";
import { useComponentsContext } from "../../contexts/ComponentsProvider";
import { useCartContext } from "../../contexts/CartProvider";

import { MdOutlineCancel } from "react-icons/md";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineStop } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

const Cart = () => {
  const ref = useRef();
  const navigate = useNavigate();
  const { isClicked, clickedMenu, setIsClicked, initialLayoutState } =
    useStateContext();
  const { Button } = useComponentsContext();
  const {
    cartItems,
    itemCount,
    total,
    incProduct,
    decProduct,
    removeProduct,
    clearCart,
  } = useCartContext();

  useEffect(() => {
    clickedMenu(ref);
    // eslint-disable-next-line
  }, [isClicked]);

  return (
    <>
      {cartItems && (
        <div className="bg-half-transparent w-full fixed nav-item top-0 right-0 z-50 text-slate-900 transition-all duration-300 ease-in-out">
          <div
            ref={ref}
            className="w-300 md:w-400 float-right h-screen duration-1000 ease-in-out dark:text-gray-200 transition-all dark:bg-[#484B52] bg-white p-8 overflow-scroll "
          >
            <div className="flex justify-between items-center ">
              <p className="font-semibold text-3xl">Panier</p>
              <Button
                icon={<MdOutlineCancel />}
                color={"rgb(148 163 184)"}
                bgHoverColor="light-gray"
                size="2xl"
                borderRadius="50%"
              />
            </div>

            {cartItems.length ? (
              <div>
                <button
                  className=" flex items-center justify-center flex-row gap-2 hover:bg-gray-400 p-2 rounded"
                  onClick={() => {
                    clearCart();
                    setIsClicked(initialLayoutState);
                  }}
                >
                  <AiOutlineStop size={20} />
                  Vider mon panier
                </button>
                {cartItems?.map((item) => (
                  <div key={item._id + item.color + item.size}>
                    <div>
                      <div className="flex flex-col leading-8 gap-5 border-b-1 border-color dark:border-gray-600 p-4 items-center">
                        <img
                          className="object-contain rounded-lg h-16 w-16"
                          src={item.img[0]}
                          alt=""
                        />
                        <div className="flex flex-col items-center justify-center">
                          <p
                            className="underline underline-offset-2 cursor-pointer font-semibold"
                            onClick={() => {
                              navigate(`/product/${item._id}`);
                              setIsClicked(initialLayoutState);
                            }}
                          >
                            {item.title}
                          </p>
                          <p className="font-semibold text-lg">
                            {(item.price * item.quantity).toFixed(2)} €
                          </p>
                          <div className="flex gap-4 mt-2 items-center">
                            <div className="flex items-center border-1 border-r-0 border-color rounded">
                              <button
                                disabled={item.quantity <= 1}
                                className="text-red-600 cursor-pointer  hover:scale-150 transition-transform"
                                onClick={() =>
                                  decProduct(
                                    item,
                                    item.size,
                                    item.color,
                                    item.quantity
                                  )
                                }
                              >
                                <AiOutlineMinus size={15} />
                              </button>
                              <p className="p-2 text-xl">{item.quantity}</p>
                              <AiOutlinePlus
                                size={15}
                                className="text-green-500 cursor-pointer hover:scale-150 transition-transform"
                                onClick={() =>
                                  incProduct(
                                    item,
                                    item.size,
                                    item.color,
                                    item.quantity
                                  )
                                }
                              />
                            </div>
                          </div>
                          <p
                            className="text-gray-500 dark:text-gray-300 flex items-center gap-2 cursor-pointer hover:scale-125 transition-transform"
                            onClick={() =>
                              removeProduct(item, item.size, item.color)
                            }
                          >
                            <BsTrash size={15} />
                            Supprimer
                          </p>
                        </div>
                      </div>
                    </div>{" "}
                    <div className="bg-gray-200 h-[0.25px]" />
                  </div>
                ))}
                <div className="mt-3 mb-3">
                  <div className="flex justify-between items-center">
                    {itemCount <= 1 ? (
                      <p className="text-gray-500 dark:text-gray-200">
                        Total ({itemCount} produit):
                      </p>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-200">
                        Total ({itemCount} produits):
                      </p>
                    )}
                    <span>{total.toFixed(2)} €</span>
                  </div>
                </div>
                <div className="mt-5 flex w-full items-center justify-center">
                  <button
                    onClick={() => {
                      setIsClicked(initialLayoutState);
                      navigate("/cart");
                    }}
                    style={{ background: "rgb(148 163 184)" }}
                    className="my-6 w-full p-3 rounded-lg font-semibold text-xl max-w-[200px] text-slate-900 hover:scale-110  bg-gray-200 hover:bg-gray-400 transition-all duration-300 ease-in-out"
                  >
                    Commander
                  </button>
                </div>
              </div>
            ) : (
              <h4 className="font-semibold text-xl mt-8">
                Votre panier est vide...
              </h4>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
