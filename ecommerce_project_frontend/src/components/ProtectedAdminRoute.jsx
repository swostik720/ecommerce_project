import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoute = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "1";
  return isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedAdminRoute;
