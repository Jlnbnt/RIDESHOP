import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useCartContext } from "../contexts/CartProvider";
import { useAuthContext } from "../contexts/AuthProvider";

import axios from "../config/axios";

import StripeCheckout from "react-stripe-checkout";

import toast from "react-hot-toast";

import { AiOutlineMinus, AiOutlinePlus, AiOutlineStop } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import {
  CircularProgress,
  Paper,
  TableCell,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";

const Cart = () => {
  const navigate = useNavigate();

  const [stripeToken, setStripeToken] = useState();
  const {
    cartItems,
    itemCount,
    total,
    incProduct,
    decProduct,
    removeProduct,
    state,
    clearCart,
  } = useCartContext();
  const { userId } = useAuthContext();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const KEY = process.env.REACT_APP_STRIPE_KEY;
  const [loading, setLoading] = useState(true);
  const onToken = (token) => {
    setStripeToken(token);
  };

  const saveOrder = async () => {
    try {
      await axios.post("/orders", {
        userId,
        cart: state,
        total,
        itemCount,
        adress: {
          country: stripeToken.card.address_country,
          city: stripeToken.card.address_city,
          adress: stripeToken.card.address_line1,
          zip: stripeToken.card.zip,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const stripeRequest = async () => {
      try {
        const response = await axios.post("/payment", {
          tokenId: stripeToken.id,
          amount: total.toFixed(2) * 100,
        });
        await saveOrder();
        await clearCart();
        navigate("/accueil");
        toast.success("Votre commande sera bientôt expédiée !");
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && total >= 1 && stripeRequest();
  }, [stripeToken, total]);

  function Row({ itemCart }) {
    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "none" } }}>
          <TableCell align="left">
            <img
              className="w-14 min-w-[3.5rem] ml-2"
              src={itemCart.img[0]}
              alt=""
            />
          </TableCell>

          <TableCell align="left">
            <span
              className="underline underline-offset-2 cursor-pointer font-semibold"
              onClick={() => navigate(`/product/${itemCart._id}`)}
            >
              {itemCart.title}
            </span>
          </TableCell>
          <TableCell align="left">{itemCart.brand}</TableCell>
          <TableCell align="left" className="capitalize">
            {itemCart.color}
          </TableCell>
          <TableCell align="left" className="uppercase">
            {itemCart.size}
          </TableCell>
          <TableCell align="left">
            <div className="flex gap-2 items-center font-semibold">
              <AiOutlineMinus
                size={15}
                className="text-red-600 cursor-pointer  hover:scale-150 transition-transform"
                onClick={() =>
                  decProduct(
                    itemCart,
                    itemCart.size,
                    itemCart.color,
                    itemCart.quantity
                  )
                }
              />
              {itemCart?.quantity}
              <AiOutlinePlus
                size={15}
                className="text-green-500 cursor-pointer hover:scale-150 transition-transform"
                onClick={() =>
                  incProduct(
                    itemCart,
                    itemCart.size,
                    itemCart.color,
                    itemCart.quantity
                  )
                }
              />
            </div>
          </TableCell>
          <TableCell align="left">
            {(itemCart.price * itemCart.quantity).toFixed(2)}€
          </TableCell>
          <TableCell>
            <span
              className="rounded p-1 text-white"
              style={{
                background: itemCart.inStock ? "green" : "orange",
              }}
            >
              {itemCart.inStock ? "Disponible" : "Indisponible"}
            </span>
          </TableCell>
          <TableCell>
            <p
              className="text-gray-500  flex items-center gap-2 cursor-pointer hover:scale-125 transition-transform"
              onClick={() =>
                removeProduct(itemCart, itemCart.size, itemCart.color)
              }
            >
              <BsTrash size={17} />
            </p>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <>
      {cartItems?.length ? (
        <>
          <div className="w-full flex justify-between items-center">
            <button
              className="ml-4 self-start flex items-center justify-center flex-row gap-2  hover:bg-gray-400 p-2 rounded text-slate-900 dark:text-white my-2"
              onClick={() => clearCart()}
            >
              <AiOutlineStop size={20} /> Supprimer le Panier
            </button>
            <span className="mr-4 text-slate-900 dark:text-white">
              {itemCount <= 1 ? (
                <p className="text-gray-500 dark:text-gray-200">
                  Total ({itemCount} produit): {total.toFixed(2)} €
                </p>
              ) : (
                <p className="text-gray-500 dark:text-gray-200">
                  Total ({itemCount} produits): {total.toFixed(2)} €
                </p>
              )}
            </span>
          </div>
          <TableContainer component={Paper} className="scrollbar-thin">
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell
                    className="font-semibold text-lg"
                    align="left"
                  ></TableCell>
                  <TableCell className="font-semibold text-lg" align="left">
                    Produit
                  </TableCell>
                  <TableCell className="font-semibold text-lg" align="left">
                    Marque
                  </TableCell>
                  <TableCell className="font-semibold text-lg" align="left">
                    Couleur
                  </TableCell>
                  <TableCell className="font-semibold text-lg" align="left">
                    Taille
                  </TableCell>
                  <TableCell className="font-semibold text-lg" align="left">
                    Quantité
                  </TableCell>
                  <TableCell className="font-semibold text-lg" align="left">
                    Prix
                  </TableCell>
                  <TableCell className="font-semibold text-lg" align="left">
                    Stock
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems ? (
                  cartItems
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((itemCart) => (
                      <Row key={itemCart._id} itemCart={itemCart} />
                    ))
                ) : (
                  <tr>
                    <td>
                      <CircularProgress
                        className="m-2"
                        style={{ color: "rgb(148 163 184)" }}
                      />
                    </td>
                  </tr>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            count={cartItems ? cartItems.length : 0}
            component="div"
            labelRowsPerPage={"Produits par pages"}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className="text-slate-400 w-full scrollbar-thin"
            rowsPerPageOptions={[5, 10, 25]}
            sx={{
              "& .MuiSvgIcon-root": {
                color: "rgb(148 163 184)",
              },
            }}
          />
          <StripeCheckout
            name="RIDESHOP"
            billingAddress
            shippingAddress
            amount={Number((total * 100).toFixed(2))}
            token={onToken}
            stripeKey={KEY}
            currency="EUR"
            closed={() => toast.dismiss()}
            opened={() =>
              toast.loading(
                () => (
                  <span>
                    Use Stripe's mock credit card number!
                    <br />
                    <b>Number:</b> 4242 4242 4242 4242
                    <br />
                    <b>Exp:</b> 12/34
                    <br />
                    <b>CCV:</b> 567
                  </span>
                ),
                {
                  icon: (
                    <MdOutlineCancel
                      size={30}
                      className="cursor-pointer"
                      onClick={(t) => toast.dismiss(t.id)}
                    />
                  ),
                }
              )
            }
          >
            <div className="flex w-full justify-center items-center">
              <button
                className="my-6 w-full p-3 rounded-lg font-semibold text-xl max-w-[200px] bg-gray-200 hover:bg-gray-400 hover:scale-110 transition-all duration-300 ease-in-out"
                style={{ background: "rgb(148 163 184)" }}
              >
                Valider & Payer
              </button>
            </div>
          </StripeCheckout>
        </>
      ) : (
        <div className="h-[50vh] w-screen text-slate-900 dark:text-white p-4 flex flex-col gap-4 justify-center items-center text-4xl">
          <h1>Votre panier est vide...</h1>
          <button
            onClick={() => {
              navigate("/products/all");
            }}
            style={{ background: "rgb(148 163 184)" }}
            className="my-6 w-full p-3 rounded-lg font-semibold text-xl max-w-[230px] text-slate-900 hover:scale-110  bg-gray-200 hover:bg-gray-400 transition-all duration-300 ease-in-out"
          >
            Demarrez vos achats!
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
