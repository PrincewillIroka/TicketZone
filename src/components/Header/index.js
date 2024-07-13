import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { IoMdClose, IoMdSearch } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { useStateValue } from "store/stateProvider";
import "./Header.css";

function Header() {
  const { state, dispatch } = useStateValue();
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

  const handleRemoveTicket = (ticket) => {
    dispatch({
      type: "ADD_TICKET_TO_CART",
      payload: { ticket, ticketQuantity: 0 },
    });
  };

  const calculateTotalAmount = () => {
    const totalAmount = ticketCart.reduce(
      (acc, { ticket = {}, ticketQuantity = 0 }) => {
        const price = ticket.price !== "free" ? ticket.price : 0;
        let value = Number(price) * ticketQuantity;
        value = acc + value;
        return value;
      },
      0
    );
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(totalAmount);
  };

  const handleCheckout = () => {};

  return (
    <header>
      <ul className="nav-links">
        <li>
          <Link to="/">
            <img src="/logo.png" className="img-logo" alt="Logo" />
          </Link>
        </li>
        <li
          className={`nav-link ${getActiveTab("explore") && "nav-link-active"}`}
        >
          <Link to="/explore">Explore</Link>
        </li>
        <li
          className={`nav-link ${
            getActiveTab("buy-a-ticket") && "nav-link-active"
          }`}
        >
          <Link to="/buy-a-ticket">Buy A Ticket</Link>
        </li>
        <li
          className={`nav-link ${
            getActiveTab("sell-tickets") && "nav-link-active"
          }`}
        >
          <Link to="/sell-tickets">Sell Tickets</Link>
        </li>
        <li
          className={`nav-link ${
            getActiveTab("how-it-works") && "nav-link-active"
          }`}
        >
          <Link to="/how-it-works">How It Works</Link>
        </li>
      </ul>
      <div className="nav-hamburger-wrapper">
        <GiHamburgerMenu className="hamburger-wrapper" />
      </div>
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
              className="close-search-icon"
              onClick={() => setEventSearchValue("")}
            />
          )}
        </li>
        <li>
          <IoMdSearch className="search-icon" />
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
                title="Cart"
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
                className="close-cart-icon"
                onClick={() => setIsCartOpen(false)}
              />
            </div>
            <div className="cart-body">
              {ticketCart.map((ticketItem, index) => {
                const { ticket, ticketQuantity } = ticketItem;
                return (
                  <div key={index} className="cart-ticket">
                    <span>{ticket.title}</span>
                    <div className="cart-ticket-right">
                      <span>{ticketQuantity}</span>
                      <MdDeleteOutline
                        className="cart-ticket-remove-icon"
                        onClick={() => handleRemoveTicket(ticket)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="cart-footer">
              <div className="cart-items-summary">
                <span className="cart-items-summary-tag">Items</span>
                <span>{ticketCart.length}</span>
              </div>
              <div className="cart-items-summary">
                <span className="cart-items-summary-tag">Total Amount</span>
                <span>{calculateTotalAmount()}</span>
              </div>
              <button
                className={`btn-cart-checkout ${
                  !ticketCart.length && "btn-cart-checkout-disabled"
                }`}
                onClick={() => handleCheckout()}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
