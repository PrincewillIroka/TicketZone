import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
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
  const [eventSearchValue, setEventSearchValue] = useState("");

  const handleNavigate = (page) => {
    navigate(page);
  };

  const getActiveTab = (value) => {
    const str = location.pathname.split("/")[1];
    const isActiveTab = str.includes(value.toLowerCase());
    return isActiveTab;
  };

  const handleSearchEvents = (e) => {
    e.preventDefault();
    setEventSearchValue(e.target.value);
  };

  const handleSubmitSearch = () => {
    handleNavigate(`/explore-event?search=${eventSearchValue}`);
  };

  return (
    <header>
      <ul className="nav-links">
        <li>
          <Link to="/">
            <img src="/logo.png" className="img-logo" alt="Logo" />
          </Link>
        </li>
        {/* <li className={`${getActiveTab("") && "nav-links-active"}`}>
          <a href="/">Home</a>
        </li> */}
        <li className={`${getActiveTab("explore") && "nav-links-active"}`}>
          <Link to="/explore">Explore</Link>
        </li>
        <li className={`${getActiveTab("buy-a-ticket") && "nav-links-active"}`}>
          <Link to="/buy-a-ticket">Buy A Ticket</Link>
        </li>
        <li className={`${getActiveTab("sell-tickets") && "nav-links-active"}`}>
          <Link to="/sell-tickets">Sell Tickets</Link>
        </li>
        <li className={`${getActiveTab("how-it-works") && "nav-links-active"}`}>
          <Link to="/how-it-works">How It Works</Link>
        </li>
      </ul>
      <ul className="nav-controls">
        <li className="search-input-container">
          <input
            placeholder="Search for events"
            className="search-input"
            onChange={(e) => handleSearchEvents(e)}
            onKeyDown={(e) => {
              e.key === "Enter" && handleSubmitSearch();
            }}
            value={eventSearchValue}
          />
          {eventSearchValue && (
            <IoMdClose
              className="search-close-btn"
              onClick={() => setEventSearchValue("")}
            />
          )}
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
