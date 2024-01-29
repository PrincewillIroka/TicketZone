import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { useStateValue } from "store/stateProvider";

function Header() {
  const { state } = useStateValue();
  const navigate = useNavigate();
  const location = useLocation();
  const { isUserLoggedIn } = state;

  const handleNavigate = (page) => {
    navigate(page);
  };

  const getActiveTab = (value) => location.pathname === value;

  return (
    <header>
      <ul className="nav-links">
        <li className={`${getActiveTab("/") && "nav-links-active"}`}>
          <a href="/">Home</a>
        </li>
        <li className={`${getActiveTab("/explore") && "nav-links-active"}`}>
          <a href="/explore">Explore</a>
        </li>
        <li
          className={`${getActiveTab("/buy-a-ticket") && "nav-links-active"}`}
        >
          <a href="/buy-a-ticket">Buy A Ticket</a>
        </li>
        <li
          className={`${getActiveTab("/sell-tickets") && "nav-links-active"}`}
        >
          <a href="/sell-tickets">Sell Tickets</a>
        </li>
        <li
          className={`${getActiveTab("/how-it-works") && "nav-links-active"}`}
        >
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
            <FaCircleUser
              className="user-profile-icon"
              title="Dashboard"
              onClick={() => handleNavigate("/dashboard")}
            />
          )}
        </li>
      </ul>
    </header>
  );
}

export default Header;
