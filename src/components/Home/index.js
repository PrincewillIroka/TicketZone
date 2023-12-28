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
              Discover the best live events, concerts, festivals, and shows.
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
        <div className="explore-section">
          <h1>Explore Events</h1>
          <ul className="explore-tags">
            <li className="explore-tag">
              <button className="explore-btn explore-btn-active">
                Most recent
              </button>
            </li>
            <li className="explore-tag">
              <button className="explore-btn">Trending</button>
            </li>
            <li className="explore-tag">
              <button className="explore-btn">Popular artists</button>
            </li>
            <li className="explore-tag">
              <button className="explore-btn">This month</button>
            </li>
            <li className="explore-tag">
              <button className="explore-btn">Popular locations</button>
            </li>
          </ul>
          <div className="explore-items">
            <div className="explore-item">
              <div className="explore-item-wallpaper">
                <img
                  src="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  className="explore-item-img"
                />
              </div>
              <h3 className="explore-item-title">Title of event</h3>
              <div className="explore-item-calendar">
                <span className="explore-item-date">December 31st</span>
                <span>&#8226;</span>
                <span className="explore-item-time">8:30pm</span>
              </div>
              <div className="explore-item-venue">Gowon Stadium</div>
            </div>
            <div className="explore-item">
              <div className="explore-item-wallpaper">
                <img
                  src="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  className="explore-item-img"
                />
              </div>
              <h3 className="explore-item-title">Title of event</h3>
              <div className="explore-item-calendar">
                <span className="explore-item-date">December 31st</span>
                <span>&#8226;</span>
                <span className="explore-item-time">8:30pm</span>
              </div>
              <div className="explore-item-venue">Gowon Stadium</div>
            </div>
            <div className="explore-item">
              <div className="explore-item-wallpaper">
                <img
                  src="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  className="explore-item-img"
                />
              </div>
              <h3 className="explore-item-title">Title of event</h3>
              <div className="explore-item-calendar">
                <span className="explore-item-date">December 31st</span>
                <span>&#8226;</span>
                <span className="explore-item-time">8:30pm</span>
              </div>
              <div className="explore-item-venue">Gowon Stadium</div>
            </div>
            <div className="explore-item">
              <div className="explore-item-wallpaper">
                <img
                  src="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  className="explore-item-img"
                />
              </div>
              <h3 className="explore-item-title">Title of event</h3>
              <div className="explore-item-calendar">
                <span className="explore-item-date">December 31st</span>
                <span>&#8226;</span>
                <span className="explore-item-time">8:30pm</span>
              </div>
              <div className="explore-item-venue">Gowon Stadium</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
