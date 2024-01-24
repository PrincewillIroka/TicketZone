import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { getCategories, getEvents } from "../../services/eventServices";

function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("most_recent");
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    handleGetCategories();
    handleGetEvents();
  }, []);

  const handleSetActiveTab = (activeTab) => {
    setActiveTab(activeTab);
  };

  const handleSetCategory = (category) => {};

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  const handleGetCategories = () => {
    getCategories().then((response) => {
      const { success, data } = response || {};
      if (success) {
        setCategories(data);
      }
    });
  };

  const handleGetEvents = () => {
    getEvents().then((response) => {
      const { success, data } = response || {};
      console.log({ fff: data });
      if (success) {
        setEvents(data);
      }
    });
  };

  const getCategoryIcon = (name) => {
    let icon,
      categoryName = name.toLowerCase();
    if (categoryName === "music") {
      icon = <BsFileMusic className="browse-icon" />;
    } else if (categoryName === "sports") {
      icon = <MdOutlineSportsSoccer className="browse-icon" />;
    } else if (categoryName === "arts & theater") {
      icon = <FaArtstation className="browse-icon" />;
    } else if (categoryName === "comedy") {
      icon = <MdTheaterComedy className="browse-icon" />;
    } else if (categoryName === "festivals") {
      icon = <MdOutlineFestival className="browse-icon" />;
    } else if (categoryName === "technology") {
      icon = <GrTechnology className="browse-icon" />;
    }

    return icon;
  };

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
            <button className="btn-login" onClick={handleNavigateToLogin}>
              Login
            </button>
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
              Access tickets for live events, concerts, festivals, and shows.
            </h3>
            <button className="btn-cta">
              Find an event <AiOutlineArrowRight className="arrow-right" />
            </button>
          </div>
        </div>
        <div className="browse-section">
          {categories.map(({ name }, index) => (
            <div
              className="browse-category"
              onClick={() => handleSetCategory("")}
              key={index}
            >
              <div className="browse-content">{getCategoryIcon(name)}</div>
              <span className="browse-item">{name}</span>
            </div>
          ))}
        </div>
        <div className="explore-section">
          <h1>Explore Events</h1>
          <ul className="explore-tags">
            <li className="explore-tag">
              <button
                onClick={() => handleSetActiveTab("most_recent")}
                className={`explore-btn ${
                  activeTab === "most_recent" && "explore-btn-active"
                }`}
              >
                Most recent
              </button>
            </li>
            <li className="explore-tag">
              <button
                onClick={() => handleSetActiveTab("trending")}
                className={`explore-btn ${
                  activeTab === "trending" && "explore-btn-active"
                }`}
              >
                Trending
              </button>
            </li>
            <li className="explore-tag">
              <button
                onClick={() => handleSetActiveTab("popular_artists")}
                className={`explore-btn ${
                  activeTab === "popular_artists" && "explore-btn-active"
                }`}
              >
                Popular artists
              </button>
            </li>
            <li className="explore-tag">
              <button
                onClick={() => handleSetActiveTab("this_month")}
                className={`explore-btn ${
                  activeTab === "this_month" && "explore-btn-active"
                }`}
              >
                This month
              </button>
            </li>
            <li className="explore-tag">
              <button
                onClick={() => handleSetActiveTab("popular_locations")}
                className={`explore-btn ${
                  activeTab === "popular_locations" && "explore-btn-active"
                }`}
              >
                Popular locations
              </button>
            </li>
          </ul>
          <div className="explore-items">
            {events.map(({ title, venue }, index) => (
              <div className="explore-item" key={index}>
                <div className="explore-item-wallpaper">
                  <img
                    src="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    className="explore-item-img"
                    alt=""
                  />
                </div>
                <h3 className="explore-item-title">{title}</h3>
                <div className="explore-item-calendar">
                  <span className="explore-item-date">December 31st</span>
                  <span>&#8226;</span>
                  <span className="explore-item-time">8:30pm</span>
                </div>
                <div className="explore-item-venue">{venue}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
