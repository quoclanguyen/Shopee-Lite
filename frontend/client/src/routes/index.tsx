/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartDetail from "../pages/CartDetail";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import ProductDetail from "../pages/ProductDetail";
import Register from "../pages/Register";
import PrivateRoutes from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

function AppRoutes() {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes isAuth={isAuthenticated} />}>
            <Route path="/cart" element={<CartDetail />} />
          </Route>
          <Route element={<PublicRoute isAuth={isAuthenticated} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default AppRoutes;
