import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "./EventsCategory.css";
import { getEventsCategory } from "services/eventServices";
import EventCard from "components/Home/EventCard";

function EventsCategory() {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [eventsCategory, setEventsCategory] = useState([]);
  const [events, setEvents] = useState([]);
  const alias = pathname.split("/")[2];

  useEffect(() => {
    handleGetEventsCategory();
  }, []);

  const handleGetEventsCategory = () => {
    getEventsCategory({ alias }).then((response) => {
      const { success, data } = response || {};
      if (success) {
        setIsLoading(false);
        setEvents(data);
      }
    });
  };

  return (
    <div>
      <Header />
      <div className="events-category-container">
        {isLoading ? (
          <div className="">Loading...</div>
        ) : (
          <div className="explore-items">
            {events.map((event, index) => (
              <EventCard event={event} key={index} />
            ))}
          </div>
        )}

        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default EventsCategory;
