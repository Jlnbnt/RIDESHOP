import React, { useState, useEffect } from "react";

import useAxiosReq from "../../hooks/useAxiosReq";
import { useComponentsContext } from "../../contexts/ComponentsProvider";

import { useNavigate } from "react-router-dom";
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

import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import toast from "react-hot-toast";
const AdminProduct = () => {
  const { setModProduct } = useComponentsContext();
  const navigate = useNavigate();
  const axiosReq = useAxiosReq();

  const [adminProducts, setAdminProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchProductById = async (id) => {
    try {
      const response = await axios(`products/${id}`);
      const data = await response.data;
      setModProduct(data);
      navigate(`/admin/product/${id}`);
    } catch (err) {}
  };

  const getAdminProducts = async () => {
    try {
      const response = await axios.get("/products");
      setAdminProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosReq.delete(`products/${id}`);
      getAdminProducts();
      toast.success("Product succesfully deleted");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdminProducts();
  }, []);

  function Row({ product }) {
    const [open, setOpen] = useState(false);
    const date = new Date(product.createdAt).toLocaleDateString();

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
          <TableCell>
            <img
              loading="lazy"
              src={product.img[0]}
              alt="product symbol"
              className="w-14"
              align="left"
            />
          </TableCell>
          <TableCell align="left"> {product._id}</TableCell>
          <TableCell component="th" scope="row">
            <span
              className="underline underline-offset-2 cursor-pointer font-semibold"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              {product.title}
            </span>
          </TableCell>
          <TableCell align="left"> {date}</TableCell>
          <TableCell>
            <div className="flex gap-4">
              <BsTrash
                color="darkslategray"
                className="cursor-pointer hover:scale-150 transition-transform"
                size={20}
                onClick={() => handleDelete(product._id)}
              />
              <AiOutlineEdit
                className="cursor-pointer hover:scale-150 transition-transform"
                color="darkslategray"
                size={20}
                onClick={() => fetchProductById(product._id)}
              />
            </div>
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
                  Details
                </Typography>
                <Table
                  size="small"
                  aria-label="purchases"
                  className="whitespace-pre-wrap "
                >
                  <TableHead>
                    <TableRow>
                      <TableCell className="font-semibold" align="center">
                        Marque
                      </TableCell>
                      <TableCell className="font-semibold" align="center">
                        Catégories
                      </TableCell>
                      <TableCell className="font-semibold" align="center">
                        Couleurs
                      </TableCell>
                      <TableCell className="font-semibold" align="center">
                        Tailles
                      </TableCell>
                      <TableCell className="font-semibold" align="center">
                        Stock
                      </TableCell>
                      <TableCell className="font-semibold" align="center">
                        Prix
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="center">{product.brand}</TableCell>
                      <TableCell align="center" className="capitalize">
                        {product.categories.join("/ ")}
                      </TableCell>
                      <TableCell align="center">
                        {product.color.join("/ ")}
                      </TableCell>
                      <TableCell align="center">
                        {product.size.join("/ ")}
                      </TableCell>
                      <TableCell align="center">
                        <span
                          className="rounded p-1 text-white"
                          style={{
                            background: product.inStock ? "green" : "orange",
                          }}
                        >
                          {product.inStock ? "Disponible" : "Rupture"}
                        </span>
                      </TableCell>
                      <TableCell align="center">{product.price} €</TableCell>
                    </TableRow>
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
      {adminProducts && (
        <>
          <TableContainer component={Paper} className="scrollbar-thin">
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <AiOutlinePlus
                      className="ml-2 cursor-pointer hover:scale-150 transition-transform"
                      size={20}
                      onClick={() => navigate("/admin/addnew")}
                    />
                  </TableCell>
                  <TableCell className="font-semibold text-lg" align="left">
                    Image
                  </TableCell>
                  <TableCell className="font-semibold text-lg" align="left">
                    ID
                  </TableCell>
                  <TableCell className="font-semibold text-lg" align="left">
                    Title
                  </TableCell>
                  <TableCell className="font-semibold text-lg" align="left">
                    Created At
                  </TableCell>
                  <TableCell className="font-semibold text-lg" align="left">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {adminProducts.length ? (
                  adminProducts
                    .sort(
                      (a, b) =>
                        Date.parse(b.createdAt) - Date.parse(a.createdAt)
                    )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((product) => (
                      <Row key={product.title} product={product} />
                    ))
                ) : (
                  <tr>
                    <td></td>
                  </tr>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            count={adminProducts ? adminProducts.length : 0}
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

export default AdminProduct;
