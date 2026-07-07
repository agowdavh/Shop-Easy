import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";
import { getCart } from "../../services/CartService";
import { useState,useEffect } from "react";
import "./Navbar.css";

function Navbar() {
const [cartCout,setCartCount]=useState(0);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isLoggedIn = token != null;
useEffect(()=>{
  if (isLoggedIn) {
        loadCartCount();
    }
},[])
const loadCartCount = async () => {

    try {

        const data = await getCart();

        setCartCount(data.totalItems);

    } catch (error) {

        console.log(error);

    }

};

  const handleLogout = () => {
    localStorage.removeItem("token");
     localStorage.removeItem("role");
    alert("Logged Out Successfully");

    navigate("/");

    window.location.reload();
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">

      <div className="container">

        <Link className="navbar-brand fw-bold fs-3 text-primary" to="/">
          ShopEasy
        </Link>

        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">

          <form className="d-flex mx-auto search-box">

            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
            />

            <button className="btn btn-primary ms-2">

              <FaSearch />

            </button>

          </form>

          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
            {role === "ROLE_ADMIN" && (

  <li className="nav-item dropdown">

    <button
      className="btn nav-link dropdown-toggle border-0 bg-transparent"
      data-bs-toggle="dropdown"
      type="button"
    >
      Admin
    </button>

    <ul className="dropdown-menu">

      <li>
        <Link className="dropdown-item" to="/admin/dashboard">
          Dashboard
        </Link>
      </li>

      <li>
        <Link className="dropdown-item" to="/admin/products">
          Manage Products
        </Link>
      </li>

      <li>
        <Link className="dropdown-item" to="/admin/categories">
          Manage Categories
        </Link>
      </li>

      <li>
        <Link className="dropdown-item" to="/admin/orders">
          Manage Orders
        </Link>
      </li>

      <li>
        <Link className="dropdown-item" to="/admin/users">
          Manage Users
        </Link>
      </li>

    </ul>

  </li>

)}
            <li>
              <Link className="dropdown-item" to="/address">
                My Addresses
              </Link>
            </li>

            <li className="nav-item mx-2">

              <Link className="nav-link position-relative" to="/cart">

                <FaShoppingCart size={22} />

                <span className="cart-badge">
  {cartCout}
                </span>

              </Link>

            </li>


            <li className="nav-item dropdown">

              <button
                className="btn nav-link dropdown-toggle border-0 bg-transparent"
                data-bs-toggle="dropdown"
                type="button"
              >
                <FaUserCircle size={24} />
              </button>

              <ul className="dropdown-menu dropdown-menu-end">

                {isLoggedIn ? (
                  <>

                    <li>
                      <Link className="dropdown-item" to="/profile">
                        My Profile
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/orders">
                        My Orders
                      </Link>
                    </li>

                    <li>
                      <hr className="dropdown-divider" />
                    </li>

                    <li>

                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>

                    </li>

                  </>
                ) : (
                  <>

                    <li>

                      <Link className="dropdown-item" to="/login">
                        Login
                      </Link>

                    </li>

                    <li>

                      <Link className="dropdown-item" to="/register">
                        Register
                      </Link>

                    </li>

                  </>

                )}

              </ul>

            </li>

          </ul>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;