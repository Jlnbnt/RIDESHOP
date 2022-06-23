import React from "react";

import { Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import {
  HomePage,
  ProductList,
  Product,
  Cart,
  Login,
  Register,
  Missing,
  AdminProduct,
  ProductPage,
  OrdersPage,
  NewProduct,
  AllOrders,
} from "./pages";
import { Layout } from "./components";

import { useStateContext } from "./contexts/ContextProvider";
import { useAuthContext } from "./contexts/AuthProvider";

import RequireAuth from "./contexts/RequireAuth";
import PersistLogin from "./contexts/PersistLogin";
import RequireAdmin from "./contexts/RequireAdmin";
import IsLogged from "./contexts/IsLogged";

const App = () => {
  const { currentMode } = useStateContext();
  const { auth } = useAuthContext();

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <Toaster />
      <Routes>
        {/* Auth */}
        <Route element={<PersistLogin />}>
          <Route element={<IsLogged auth={auth} />}>
            <Route path="/login" element={<Login auth={auth} />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Layout />}>
              {/* Dashboard */}
              <Route path="/" element={<HomePage />} />
              <Route path="/accueil" element={<HomePage />} />
              <Route path="/products/:category" element={<ProductList />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/myorders" element={<OrdersPage />} />
              {/* Admin */}
              <Route element={<RequireAdmin />}>
                <Route path="/admin/productlist" element={<AdminProduct />} />
                <Route path="/admin/product/:id" element={<ProductPage />} />
                <Route path="/admin/addnew" element={<NewProduct />} />
                <Route path="/admin/allorders" element={<AllOrders />} />
              </Route>
              {/* Catch all */}
              <Route path="*" element={<Missing />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
