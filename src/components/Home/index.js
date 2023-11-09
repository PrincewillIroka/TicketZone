import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
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
          <li className="search-input-container">
            <input placeholder="Search for events" className="search-input" />
          </li>
          <li>
            <button className="btn-login">Login</button>
          </li>
        </ul>
      </header>
      <section>
        <div className="banner-container">
          <div className="banner-content">
            <h1 className="banner-title">
              Buy or Sell your event tickets easily wherever you are
            </h1>
            <h3 className="banner-subtitle">
              Discover the best live events, concerts, shows to your taste.
            </h3>
            <button className="btn-cta">
              Find an event <AiOutlineArrowRight className="arrow-right" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
