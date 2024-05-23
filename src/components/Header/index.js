import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useStateValue } from "store/stateProvider";
import "./Header.css";

function Header() {
  const { state } = useStateValue();
  const navigate = useNavigate();
  const location = useLocation();
  const { isUserLoggedIn, ticketCart = [] } = state;
  const [isCartOpen, setIsCartOpen] = useState(false);

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
              <div
                className="cart-icon-wrapper"
                onClick={() => setIsCartOpen(true)}
              >
                <FiShoppingCart className="cart-icon" />
                <span className="cart-count">{ticketCart.length}</span>
              </div>
            </div>
          )}
        </li>
      </ul>
      {isCartOpen && (
        <div className="cart-container">
          <div className="cart-content">
            <div className="cart-header">
              <h3 className="cart-heading">Cart</h3>
              <IoMdClose
                className="cart-close-btn"
                onClick={() => setIsCartOpen(false)}
              />
            </div>
            <div className="cart-body">
              {ticketCart.map((ticketItem, index) => {
                const { ticket, ticketQuantity } = ticketItem;
                return (
                  <div key={index} className="cart-ticket">
                    <span>{ticket.title}</span>
                    <span>{ticketQuantity}</span>
                  </div>
                );
              })}
            </div>
            <div className="cart-footer">
              <div className="cart-items-summary">
                <span>Items</span>
                <span>0.00</span>
              </div>
              <div className="cart-items-summary">
                <span>Total</span>
                <span>0.00</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
