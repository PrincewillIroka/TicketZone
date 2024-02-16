import React, { useState, useEffect } from "react";
import Header from "../Header";
import { getEvents } from "services/eventServices";
import Footer from "../Footer";

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
            {events.map(({ title, venue }, index) => (
              <div className="explore-item" key={index}>
                <div className="explore-item-wallpaper">
                  <img
                    src="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    className="explore-item-img"
                    alt=""
                  />
                </div>
                <h3 className="explore-item-title">{title}</h3>
                <div className="explore-item-calendar">
                  <span className="explore-item-date">December 31st</span>
                  <span>&#8226;</span>
                  <span className="explore-item-time">8:30pm</span>
                </div>
                <div className="explore-item-venue">{venue}</div>
              </div>
            ))}
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}

export default Explore;
