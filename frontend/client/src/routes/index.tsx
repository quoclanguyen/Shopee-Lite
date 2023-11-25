/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoute";
import { useSelector } from "react-redux";
import Home from "../pages/Home";
import PublicRoute from "./PublicRoute";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes isAuth={isAuthenticated} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<PublicRoute isAuth={isAuthenticated} />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
