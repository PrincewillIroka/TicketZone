import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./EventsCategory.css";
import { getEventsCategory } from "services/eventServices";
import EventCard from "components/EventCard";

function EventsCategory() {
  const location = useLocation();
  const { pathname = "", state = {} } = location;
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const alias = pathname.split("/")[2];
  const { categoryName = "" } = state;

  const handleGetEventsCategory = useCallback(async () => {
    await getEventsCategory({ alias }).then((response) => {
      const { success, data } = response || {};
      if (success) {
        setIsLoading(false);
        setEvents(data);
      }
    });
  }, [alias]);

  useEffect(() => {
    handleGetEventsCategory();
  }, [handleGetEventsCategory]);

  return (
    <div>
      <Header />
      <div className="events-category-container">
        <h3 className="events-category-heading">
          {categoryName && `${categoryName}`}
        </h3>
        {isLoading ? (
          <div className="explore-item-none-2">Loading...</div>
        ) : !events.length ? (
          <div className="explore-item-none-2">
            No event found in this category.
          </div>
        ) : (
          <div className="explore-items">
            {events.map((event, index) => (
              <EventCard event={event} key={index} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default EventsCategory;
