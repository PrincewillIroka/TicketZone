import React, { useState, useEffect } from "react";
import { getEvents } from "services/eventServices";
import Header from "../Header";
import Footer from "../Footer";
import EventCard from "components/Home/EventCard";

function Explore() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    handleGetEvents();
  }, []);

  const handleGetEvents = () => {
    getEvents().then((response) => {
      const { success, data } = response || {};
      if (success) {
        setEvents(data);
      }
    });
  };

  return (
    <div>
      <Header />
      <div className="layout-container">
        <section className="explore-section">
          <div className="explore-items">
            {events.map((event, index) => (
              <EventCard event={event} key={index} />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
