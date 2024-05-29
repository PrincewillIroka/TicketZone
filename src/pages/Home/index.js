import React, { useState, useEffect, useCallback, memo } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import { createArrayItems } from "utils";
import { useStateValue } from "store/stateProvider";
import "./Home.css";
import Header from "../Header";
import Footer from "../Footer";
import EventCard from "components/EventCard";

const defaultTag = { name: "All", label: "all" };

function Home() {
  const [activeTab, setActiveTab] = useState(defaultTag.label);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { state = {}, dispatch } = useStateValue();
  const { homePage = {} } = state;
  let { categories = [], displayedTags = [], events = [] } = homePage;

  const handleSetActiveTab = (activeTab) => {
    setActiveTab(activeTab);
    dispatch({
      type: "FILTER_HOME_PAGE_EVENTS",
      payload: { activeTab },
    });
  };

  const handleGetCategories = useCallback(() => {
    getCategories().then((response) => {
      const { success, categories = [], tags = [] } = response || {};
      if (success) {
        dispatch({
          type: "UPDATE_HOME_PAGE_CATEGORIES",
          payload: { categories, displayedTags: tags },
        });
        setIsLoading(false);
      }
    });
  }, [dispatch]);

  const handleGetEvents = useCallback(() => {
    getEvents({ searchParam: "" }).then((response) => {
      const { success, data } = response || {};
      if (success) {
        dispatch({
          type: "UPDATE_HOME_PAGE_EVENTS",
          payload: { events: data, eventsClone: data },
        });
      }
    });
  }, [dispatch]);

  useEffect(() => {
    handleGetCategories();
    handleGetEvents();
  }, [handleGetCategories, handleGetEvents]);

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
          {isLoading
            ? createArrayItems(6).map((item, index) => (
                <div className="browse-category" key={index}>
                  <div className="browse-content"></div>
                </div>
              ))
            : categories.map(({ name, alias }, index) => {
                const page = `/explore-category/${alias}`;
                return (
                  <Link
                    className="browse-category"
                    to={page}
                    state={{ categoryName: name }}
                    key={index}
                  >
                    <span className="browse-content">
                      {getCategoryIcon(name)}
                    </span>
                    <span className="browse-item">{name}</span>
                  </Link>
                );
              })}
        </section>
        <section className="explore-section">
          <h1>Explore Events</h1>
          <ul className="explore-tags">
            {displayedTags.map(({ name, label }, index) => (
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
            {isLoading ? (
              createArrayItems(8).map((item, index) => (
                <div
                  className="explore-item-wrapper shimmer-bg"
                  key={index}
                ></div>
              ))
            ) : !events.length ? (
              <div className="explore-item-none">No event found.</div>
            ) : (
              events.map((event, index) => (
                <EventCard event={event} key={index} />
              ))
            )}
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

export default memo(Home);
