import React from "react";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    navigate(page);
  };

  return (
    <header>
      <ul className="nav-pages">
        <li>
          <a href="/">Trending</a>
        </li>
        <li>
          <a href="/">Sports</a>
        </li>
        <li>
          <a href="/">Concerts</a>
        </li>
        <li>
          <a href="/">Festivals</a>
        </li>
        <li>
          <a href="/">Theater</a>
        </li>
      </ul>
      <ul className="nav-controls">
        <li className="search-input-container">
          <input placeholder="Search for events" className="search-input" />
        </li>
        <li>
          <button className="btn-login" onClick={() => handleNavigate("/login")}>
            Login
          </button>
        </li>
      </ul>
    </header>
  );
}

export default Header;
