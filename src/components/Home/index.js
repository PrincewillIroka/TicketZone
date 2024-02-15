import React, { useState, useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsFileMusic } from "react-icons/bs";
import {
  MdOutlineSportsSoccer,
  MdTheaterComedy,
  MdOutlineFestival,
} from "react-icons/md";
import { FaArtstation, FaBible } from "react-icons/fa";
import { GrTechnology } from "react-icons/gr";
import CurveSvg from "assets/Curve.svg";
import "./Home.css";
import { getCategories, getEvents } from "services/eventServices";
import Header from "../Header";

function Home() {
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
      console.log({ eventsResponse: data });
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
    } else if (categoryName === "gospel") {
      icon = <FaBible className="browse-icon" />;
    }

    return icon;
  };

  return (
    <div>
      <Header />
      <div>
        <section className="banner-section">
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
        </section>
        <section className="browse-section">
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
        </section>
        <section className="explore-section">
          <h1>Explore Events</h1>
          <ul className="explore-tags">
            <li className="explore-tag">
              <button
                onClick={() => handleSetActiveTab("most_recent")}
                className={`btn-explore ${
                  activeTab === "most_recent" && "btn-explore-active"
                }`}
              >
                Most recent
              </button>
            </li>
            <li className="explore-tag">
              <button
                onClick={() => handleSetActiveTab("trending")}
                className={`btn-explore ${
                  activeTab === "trending" && "btn-explore-active"
                }`}
              >
                Trending
              </button>
            </li>
            <li className="explore-tag">
              <button
                onClick={() => handleSetActiveTab("popular_artists")}
                className={`btn-explore ${
                  activeTab === "popular_artists" && "btn-explore-active"
                }`}
              >
                Popular artists
              </button>
            </li>
            <li className="explore-tag">
              <button
                onClick={() => handleSetActiveTab("this_month")}
                className={`btn-explore ${
                  activeTab === "this_month" && "btn-explore-active"
                }`}
              >
                This month
              </button>
            </li>
            <li className="explore-tag">
              <button
                onClick={() => handleSetActiveTab("popular_locations")}
                className={`btn-explore ${
                  activeTab === "popular_locations" && "btn-explore-active"
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
          <div className="explore-more">
            <button className="btn-explore-show-more">Show more</button>
          </div>
        </section>
        <section className="features-section">
          <div className="feature-single">Buy and Sell Tickets</div>
          <div className="feature-single">100% Guarantee, Safe & Secure</div>
          <div className="feature-single">Full service Customer care</div>
        </section>
        <div className="explore-curve-bg">
          <img src={CurveSvg} className="explore-curve" />
        </div>
        <section className="mailinglist-section">
          <div>
            <h3 className="mailinglist-heading">Stay in the know</h3>
            <p className="mailinglist-info">
              Join our email list and be the first to know about exclusive
              offers, the best in live events, and more.
            </p>
          </div>
          <form className="mailinglist-form">
            <input placeholder="Email Address" className="mailinglist-input" />
            <button className="mailinglist-btn">Send</button>
          </form>
        </section>
        <footer>
          <div>
            <b>TicketZone</b>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
