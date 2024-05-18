import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "./EventsCategory.css";
import { getEventsCategory } from "services/eventServices";

function EventsCategory() {
  const [isLoading, setIsLoading] = useState(true);
  const [eventsCategory, setEventsCategory] = useState([]);
  const { pathname } = useLocation();
  const alias = pathname.split("/")[2];

  useEffect(() => {
    handleGetEventsCategory();
  }, []);

  const handleGetEventsCategory = () => {
    getEventsCategory().then((response) => {
      const { success, data } = response || {};
      console.log({ data });
      if (success) {
        // setEvents(data);
      }
    });
  };

  return (
    <div>
      <Header />
      <div className="events-category-container">
        {isLoading ? <div className="">Loading...</div> : <div>Events</div>}

        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default EventsCategory;
