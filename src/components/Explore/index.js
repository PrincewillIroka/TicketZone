import React, { useState, useEffect } from "react";
import { getEvents } from "services/eventServices";
import EventCard from "components/Home/EventCard";
import { createArrayItems } from "utils";
import Header from "../Header";
import Footer from "../Footer";
import "./Explore.css";

function Explore() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleGetEvents();
  }, []);

  const handleGetEvents = () => {
    getEvents().then((response) => {
      const { success, data } = response || {};
      if (success) {
        setEvents(data);
        setIsLoading(false);
      }
    });
  };

  return (
    <div>
      <Header />
      <div className="layout-container">
        <section className="explore-section">
          <div className="explore-items">
            {isLoading ? (
              createArrayItems(8).map((item, index) => (
                <div
                  className="explore-item-wrapper shimmer-bg"
                  key={index}
                ></div>
              ))
            ) : !events.length ? (
              <div className="explore-item-none-2">No event found</div>
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
