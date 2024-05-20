import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { useStateValue } from "store/stateProvider";
import "./Header.css";

function Header() {
  const { state } = useStateValue();
  const navigate = useNavigate();
  const location = useLocation();
  const { isUserLoggedIn, ticketCart = [] } = state;

  const handleNavigate = (page) => {
    navigate(page);
  };

  const getActiveTab = (value) => {
    const str = location.pathname.split("/")[1];
    const isActiveTab = str.includes(value.toLowerCase());
    return isActiveTab;
  };

  return (
    <header>
      <ul className="nav-links">
        <li>
          <a href="/">
            <img src="/logo.png" className="img-logo" alt="Logo" />
          </a>
        </li>
        {/* <li className={`${getActiveTab("") && "nav-links-active"}`}>
          <a href="/">Home</a>
        </li> */}
        <li className={`${getActiveTab("explore") && "nav-links-active"}`}>
          <a href="/explore">Explore</a>
        </li>
        <li className={`${getActiveTab("buy-a-ticket") && "nav-links-active"}`}>
          <a href="/buy-a-ticket">Buy A Ticket</a>
        </li>
        <li className={`${getActiveTab("sell-tickets") && "nav-links-active"}`}>
          <a href="/sell-tickets">Sell Tickets</a>
        </li>
        <li className={`${getActiveTab("how-it-works") && "nav-links-active"}`}>
          <a href="/how-it-works">How It Works</a>
        </li>
      </ul>
      <ul className="nav-controls">
        <li className="search-input-container">
          <input placeholder="Search for events" className="search-input" />
        </li>
        <li>
          {!isUserLoggedIn ? (
            <button
              className="btn-login"
              onClick={() => handleNavigate("/login")}
            >
              Login
            </button>
          ) : (
            <div className="header-icons">
              <FaCircleUser
                className="user-profile-icon"
                title="Dashboard"
                onClick={() => handleNavigate("/dashboard")}
              />
              <div className="cart-icon-wrapper">
                <FiShoppingCart className="cart-icon" />
                <span className="cart-count">{ticketCart.length}</span>
              </div>
            </div>
          )}
        </li>
      </ul>
    </header>
  );
}

export default Header;
