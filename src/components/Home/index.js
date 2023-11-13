import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsFileMusic } from "react-icons/bs";
import {
  MdOutlineSportsSoccer,
  MdTheaterComedy,
  MdOutlineFestival,
} from "react-icons/md";
import { FaArtstation } from "react-icons/fa";
import { GrTechnology } from "react-icons/gr";
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
        <div className="banner-section">
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
        <div className="browse-section">
          <div className="browse-category">
            <div className="browse-content">
              <BsFileMusic className="browse-icon" />
            </div>
            <span className="browse-item">Music</span>
          </div>
          <div className="browse-category">
            <div className="browse-content">
              <MdOutlineSportsSoccer className="browse-icon" />
            </div>
            <span className="browse-item">Sports</span>
          </div>
          <div className="browse-category">
            <div className="browse-content">
              <FaArtstation className="browse-icon" />
            </div>
            <span className="browse-item">Arts & Theater</span>
          </div>
          <div className="browse-category">
            <div className="browse-content">
              <MdTheaterComedy className="browse-icon" />
            </div>
            <span className="browse-item">Comedy</span>
          </div>
          <div className="browse-category">
            <div className="browse-content">
              <MdOutlineFestival className="browse-icon" />
            </div>
            <span className="browse-item">Festivals</span>
          </div>
          <div className="browse-category">
            <div className="browse-content">
              <GrTechnology className="browse-icon" />
            </div>
            <span className="browse-item">Technology</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
