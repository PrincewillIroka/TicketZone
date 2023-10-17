import React from "react";
import "./Home.css";

function Home() {
  return (
    <div>
      <header>
        <ul className="nav-pages">
          <li>Trending</li>
          <li>Sports</li>
          <li>Concerts</li>
          <li>Festivals</li>
          <li>Theater</li>
        </ul>
        <ul className="nav-controls">
          <li>
            <input placeholder="Search for events" className="search-input" />
          </li>
          <li>
            <button className="btn-login">Login</button>
          </li>
        </ul>
      </header>
    </div>
  );
}

export default Home;
