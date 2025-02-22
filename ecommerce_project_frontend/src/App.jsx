import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import CreateNewPasswordPage from "./pages/CreateNewPassword";
import AdminHome from "./pages/AdminHome";
import ProductEdit from "./pages/ProductEdit";
import ProductCreate from "./pages/ProductCreate";
import ProductList from "./pages/ProductList";
import BrandEdit from "./pages/BrandEdit";
import BrandCreate from "./pages/BrandCreate";
import BrandList from "./pages/BrandList";
import CategoryEdit from "./pages/CategoryEdit";
import CategoryCreate from "./pages/CategoryCreate";
import CategoryList from "./pages/CategoryList";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Receipt from "./pages/Receipt";
import Wishlist from "./pages/WishList";
import Order from "./pages/Order";

const App = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetPassword" element={<ResetPasswordPage />} />
        <Route path="/createnewpassword" element={<CreateNewPasswordPage />} />

        {/* Public Routes */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/details/:id" element={<ProductDetails />} />
        <Route path="/category-list" element={<CategoryList />} />
        <Route path="/brand-list" element={<BrandList />} />
        <Route path="/product-list" element={<ProductList />} />

        {/* Protected Route for Cart */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/receipt"
          element={
            <ProtectedRoute>
              <Receipt />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          }
        />

        {/* Protected Route for Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        {/* Protected Admin Routes */}
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/adminHome" element={<AdminHome />} />
          <Route path="/category-create" element={<CategoryCreate />} />
          <Route path="/category-edit/:id" element={<CategoryEdit />} />
          <Route path="/brand-create" element={<BrandCreate />} />
          <Route path="/brand-edit/:id" element={<BrandEdit />} />
          <Route path="/product-create" element={<ProductCreate />} />
          <Route path="/product-edit/:id" element={<ProductEdit />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
