import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { BiUser, BiCart } from "react-icons/bi";
import { FaCentos } from "react-icons/fa";
import { FoodContext } from "../../context/FoodContext";

const Navbar = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    navigate("/login")
    localStorage.removeItem("token")
    setToken("")
  }

  const handleNavigation = (path) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(path);
    }, 1000);
  };

  const { getCartCount } = useContext(FoodContext);

  return (
    <div>
      {loading && (
        <div className="loader-container">
          <div className="loader">
            <FaCentos className="loader-icon" />
          </div>
        </div>
      )}

      <nav className="navbar">

        <div>
          <Link to="/">
            <h2>FoodWay</h2>
          </Link>
        </div>

        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search for products..."
          />
          <button className="search-btn">SEARCH</button>
        </div>

        <div className="icons">

          <div className="profile-group">
            <BiUser className="icon" />
            <div className="dropdown-menu">
              <Link to="/login"><p className="dropdown-item">Login / Sign up</p></Link>
              <Link to="/orders"><p className="dropdown-item">Orders</p></Link>
              <p className="dropdown-item">Logout</p>
            </div>
          </div>

          <button className="cart-icon" onClick={() => handleNavigation('/cart')}>
            <BiCart className="icon" />
            <span className="cart-qty">{getCartCount()}</span>
          </button>

        </div>
      </nav>
    </div>
  );
};

export default Navbar;
