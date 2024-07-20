import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { getEvents, getCategories } from "services/eventServices";
import EventCard from "components/EventCard";
import { createArrayItems, DEFAULT_EVENT_TAGS } from "utils";
import { useStateValue } from "store/stateProvider";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./Explore.css";

function Explore() {
  const location = useLocation();
  const { state = {}, dispatch } = useStateValue();
  const { homePage = {} } = state;
  let { displayedTags = [], events = [] } = homePage;
  const { search = "" } = location;
  const searchParam = search.split("?search=")[1] || "";
  const [activeTab, setActiveTab] = useState(DEFAULT_EVENT_TAGS["label"]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  // const [isLoadingDisplayedTags, setIsLoadingDisplayedTags] = useState(
  //   displayedTags.length ? false : true
  // );

  const handleGetEvents = useCallback(async () => {
    await getEvents({ searchParam }).then((response) => {
      const { success, data } = response || {};
      if (success) {
        dispatch({
          type: "UPDATE_HOME_PAGE_EVENTS",
          payload: { events: data, eventsClone: data },
        });
        setIsLoadingEvents(false);
      }
    });
  }, [dispatch, searchParam]);

  const handleGetCategories = useCallback(async () => {
    await getCategories().then((response) => {
      const { success, categories = [], tags = [] } = response || {};
      if (success) {
        dispatch({
          type: "UPDATE_HOME_PAGE_CATEGORIES",
          payload: { categories, displayedTags: tags },
        });
        // setIsLoadingDisplayedTags(false);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    handleGetEvents();
    if (!displayedTags.length) {
      handleGetCategories();
    }
  }, [handleGetEvents, handleGetCategories, displayedTags]);

  const handleSetActiveTab = (activeTab) => {
    setActiveTab(activeTab);
    dispatch({
      type: "FILTER_HOME_PAGE_EVENTS",
      payload: { activeTab },
    });
  };

  return (
    <div>
      <Header />
      <div className="layout-container">
        <section className="explore-section">
          <div className="explore-heading-wrapper">
            <h3 className="explore-heading">
              {searchParam ? "Search Results for" : "Explore Events"}
            </h3>
            {searchParam && <span>"{`${searchParam}`}"</span>}
          </div>
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
              <div className="explore-item-none-2">No event found.</div>
            ) : (
              events.map((event, index) => (
                <EventCard event={event} key={index} />
              ))
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
