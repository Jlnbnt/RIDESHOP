import React, { useState, useEffect } from "react";

import axios from "../../config/axios";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Collapse,
  IconButton,
  Typography,
  TablePagination,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const AllOrders = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modOrders, setModOrders] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getAdminProducts = async () => {
    try {
      const response = await axios.get("/orders");
      setModOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdminProducts();
  }, []);

  function Row({ order }) {
    const [open, setOpen] = useState(false);
    const date = new Date(order.createdAt).toLocaleDateString();

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
          <TableCell>{order.userId}</TableCell>
          <TableCell align="left">
            {order.adress.city},{order.adress.adress},{order.adress.country}
          </TableCell>
          <TableCell align="left">{date}</TableCell>
          <TableCell align="left">{order.cart.total.toFixed(2)} €</TableCell>
          <TableCell>
            <span
              className="rounded p-1 text-white"
              style={{
                background: order.status === "pending" ? "orange" : "green",
              }}
            >
              {order.status === "pending" ? "En attente" : "Reçue"}
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
                    {order.cart.cartItems.map((ordersItem) => (
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
      {modOrders && (
        <>
          <TableContainer component={Paper} className="scrollbar-thin">
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell className="font-semibold text-lg" align="left">
                    Utilisateur
                  </TableCell>
                  <TableCell className="font-semibold text-lg" align="left">
                    Adresse
                  </TableCell>
                  <TableCell className="font-semibold text-lg" align="left">
                    Date
                  </TableCell>
                  <TableCell className="font-semibold text-lg" align="left">
                    Prix
                  </TableCell>
                  <TableCell className="font-semibold text-lg" align="left">
                    Statut
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {modOrders.length ? (
                  modOrders
                    .sort(
                      (a, b) =>
                        Date.parse(b.createdAt) - Date.parse(a.createdAt)
                    )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((order) => <Row key={order.title} order={order} />)
                ) : (
                  <tr>
                    <td></td>
                  </tr>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            count={modOrders ? modOrders.length : 0}
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
      )}
    </>
  );
};

export default AllOrders;
