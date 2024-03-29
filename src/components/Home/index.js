import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { getCategories, getEvents } from "services/eventServices";
import "./Home.css";
import Header from "../Header";
import Footer from "../Footer";
import EventCard from "./EventCard";

function Home() {
  const [activeTab, setActiveTab] = useState("");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetCategories();
    handleGetEvents();
  }, []);

  const handleSetActiveTab = (activeTab) => {
    setActiveTab(activeTab);
  };

  const handleGetCategories = () => {
    getCategories().then((response) => {
      const { success, categories = [], tags = [] } = response || {};
      if (success) {
        const activeTab = tags[0];
        setActiveTab(activeTab?.label);
        setCategories(categories);
        setTags(tags);
      }
    });
  };

  const handleGetEvents = () => {
    getEvents().then((response) => {
      const { success, data } = response || {};
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

  const handleNavigate = (page) => {
    navigate(page);
  };

  return (
    <div>
      <Header />
      <div className="layout-container">
        <section className="banner-section">
          <div className="banner-content">
            <h1 className="banner-title">
              Buy or Sell your event tickets easily wherever you are
            </h1>
            <h3 className="banner-subtitle">
              Access tickets for live events, concerts, festivals, and shows.
            </h3>
            <button
              className="btn-cta"
              onClick={() => handleNavigate("/explore")}
            >
              Find an event <AiOutlineArrowRight className="arrow-right" />
            </button>
          </div>
        </section>
        <section className="browse-section">
          {categories.map(({ name, alias }, index) => (
            <a
              className="browse-category"
              href={`/explore-category/${alias}`}
              key={index}
            >
              <span className="browse-content">{getCategoryIcon(name)}</span>
              <span className="browse-item">{name}</span>
            </a>
          ))}
        </section>
        <section className="explore-section">
          <h1>Explore Events</h1>
          <ul className="explore-tags">
            {tags.map(({ name, label }, index) => (
              <li className="explore-tag" key={index}>
                <button
                  onClick={() => handleSetActiveTab(label)}
                  className={`btn-explore ${
                    activeTab === label && "btn-explore-active"
                  }`}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
          <div className="explore-items">
            {events.map((event, index) => (
              <EventCard event={event} key={index} />
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
          <img src={CurveSvg} className="explore-curve" alt="CurveSvg" />
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
      </div>
      <Footer />
    </div>
  );
}

export default Home;
