import React, { useState, useEffect, useCallback } from "react";
import { getEvents } from "services/eventServices";
import EventCard from "components/EventCard";
import { createArrayItems } from "utils";
import { useLocation } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "./Explore.css";

function Explore() {
  const location = useLocation();
  const { search = "" } = location;
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParam = search.split("?search=")[1] || "";

  const handleGetEvents = useCallback(() => {
    getEvents({ searchParam }).then((response) => {
      const { success, data } = response || {};
      if (success) {
        setEvents(data);
        setIsLoading(false);
      }
    });
  }, [searchParam]);

  useEffect(() => {
    handleGetEvents();
  }, [handleGetEvents]);

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
          <div className="explore-items">
            {isLoading ? (
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
