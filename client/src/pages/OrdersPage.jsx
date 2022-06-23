import React, { useState, useEffect } from "react";

import useAxiosReq from "../hooks/useAxiosReq";

import { useAuthContext } from "../contexts/AuthProvider";

import {
  Box,
  CircularProgress,
  Collapse,
  IconButton,
  Typography,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
  TablePagination,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const OrdersPage = () => {
  const { userId } = useAuthContext();
  const axiosReq = useAxiosReq();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setLoading(true);
    const getMyOrders = async () => {
      try {
        const response = await axiosReq.get(`orders/${userId}`);
        setMyOrders(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getMyOrders();
  }, []);

  function Row({ myOrders }) {
    const date = new Date(myOrders.createdAt).toLocaleDateString();
    const [open, setOpen] = useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "none" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{myOrders._id}</TableCell>
          <TableCell align="left">
            {myOrders.adress.city},{myOrders.adress.adress},
            {myOrders.adress.country}
          </TableCell>
          <TableCell align="left">{date}</TableCell>
          <TableCell align="left">{myOrders.cart.total.toFixed(2)} €</TableCell>
          <TableCell>
            <span
              className="rounded p-1 text-white"
              style={{
                background: myOrders.status === "pending" ? "orange" : "reen",
              }}
            >
              {myOrders.status === "pending" ? "En attente" : "Reçue"}
            </span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  className="text-left font-medium"
                >
                  Panier
                </Typography>
                <Table
                  size="small"
                  aria-label="purchases"
                  className="whitespace-pre-wrap "
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" />

                      <TableCell className="font-semibold" align="center">
                        Titre
                      </TableCell>
                      <TableCell className="font-semibold" align="center">
                        Couleur
                      </TableCell>
                      <TableCell className="font-semibold" align="center">
                        Taille
                      </TableCell>
                      <TableCell className="font-semibold" align="center">
                        Quantité
                      </TableCell>
                      <TableCell className="font-semibold" align="center">
                        Prix
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {myOrders.cart.cartItems.map((ordersItem) => (
                      <TableRow
                        key={
                          ordersItem._id + ordersItem.size + ordersItem.color
                        }
                        className="w-full"
                      >
                        <TableCell align="center">
                          <img
                            className="max-h-[4rem]"
                            src={ordersItem.img[0]}
                            alt=""
                          />
                        </TableCell>
                        <TableCell align="center">{ordersItem.title}</TableCell>
                        <TableCell align="center" className="capitalize">
                          {ordersItem.color}
                        </TableCell>
                        <TableCell align="center">{ordersItem.size}</TableCell>
                        <TableCell align="center">
                          {ordersItem.quantity}
                        </TableCell>
                        <TableCell align="center">
                          {(ordersItem.price * ordersItem.quantity).toFixed(2)}€
                        </TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <>
      {!loading ? (
        <>
          {myOrders?.length ? (
            <>
              <TableContainer component={Paper} className="scrollbar-thin">
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell className="font-semibold text-lg" align="left">
                        N°Commande
                      </TableCell>
                      <TableCell className="font-semibold text-lg" align="left">
                        Adresse
                      </TableCell>
                      <TableCell className="font-semibold text-lg" align="left">
                        Date
                      </TableCell>
                      <TableCell className="font-semibold text-lg" align="left">
                        Prix total
                      </TableCell>
                      <TableCell className="font-semibold text-lg" align="left">
                        Statut
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {myOrders ? (
                      myOrders
                        .sort(
                          (a, b) =>
                            Date.parse(b.createdAt) - Date.parse(a.createdAt)
                        )
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((myOrders) => (
                          <Row key={myOrders._id} myOrders={myOrders} />
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
                count={myOrders ? myOrders.length : 0}
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
            </>
          ) : (
            <div className="h-[50vh] w-screen text-slate-900 dark:text-white p-4 flex flex-col gap-4 justify-center items-center text-4xl">
              <h1>Aucune commande pour l'instant.</h1>
            </div>
          )}
        </>
      ) : (
        <div className="h-[50vh] w-screen text-slate-900 dark:text-white p-4 flex justify-center items-center text-4xl">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default OrdersPage;
