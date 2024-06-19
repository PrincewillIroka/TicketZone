import React, { useState, useEffect, useCallback, memo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSafety } from "react-icons/ai";
import { BsFileMusic } from "react-icons/bs";
import {
  MdOutlineSportsSoccer,
  MdTheaterComedy,
  MdOutlineFestival,
  MdFindInPage,
} from "react-icons/md";
import { FaArtstation, FaBible, FaMoneyCheckAlt } from "react-icons/fa";
import { GrTechnology } from "react-icons/gr";
import CurveSvg from "assets/Curve.svg";
import { getCategories, getEvents } from "services/eventServices";
import { createArrayItems, DEFAULT_EVENT_TAGS } from "utils";
import { useStateValue } from "store/stateProvider";
import "./Home.css";
import Header from "components/Header";
import Footer from "components/Footer";
import EventCard from "components/EventCard";

function Home() {
  const navigate = useNavigate();
  const { state = {}, dispatch } = useStateValue();
  const { homePage = {} } = state;
  let { categories = [], displayedTags = [], events = [] } = homePage;
  const [activeTab, setActiveTab] = useState(DEFAULT_EVENT_TAGS["label"]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(
    categories.length ? false : true
  );

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
        setIsLoadingCategories(false);
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
        setIsLoadingEvents(false);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (!categories.length) {
      handleGetCategories();
    }
    handleGetEvents();
  }, [handleGetCategories, handleGetEvents, categories]);

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
          {isLoadingCategories
            ? createArrayItems(7).map((item, index) => (
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
            {isLoadingEvents ? (
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
            <button
              onClick={() => handleNavigate("/explore")}
              className="btn-explore-show-more"
            >
              Show more
            </button>
          </div>
        </section>
        <div className="explore-curve-bg-1">
          <img src={CurveSvg} className="explore-curve-1" alt="CurveSvg" />
        </div>
        <section className="features-section">
          <div className="feature-single">
            <MdFindInPage className="feature-single-icon" />
            <span className="feature-single-text">Find events around you</span>
          </div>
          <div className="feature-single">
            <FaMoneyCheckAlt className="feature-single-icon" />
            <span className="feature-single-text">Buy and Sell Tickets</span>
          </div>
          <div className="feature-single">
            <AiOutlineSafety className="feature-single-icon" />
            <span className="feature-single-text">
              100% Guarantee, Safe & Secure
            </span>
          </div>
        </section>
        <div className="explore-curve-bg-2">
          <img src={CurveSvg} className="explore-curve-2" alt="CurveSvg" />
        </div>
        <section className="mailinglist-section">
          <div className="mailinglist-col-1">
            <h3 className="mailinglist-heading">Stay in the know</h3>
            <p className="mailinglist-info">
              Join our email list and be the first to know about the newest
              events around you, exclusive offers, and more.
            </p>
          </div>
          <div className="mailinglist-col-2">
            <form className="mailinglist-form">
              <input
                placeholder="Email Address"
                className="mailinglist-input"
              />
              <button className="mailinglist-btn">Send</button>
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default memo(Home);
