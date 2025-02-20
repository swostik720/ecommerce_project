import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("loginToken"); // Check if user is logged in

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
