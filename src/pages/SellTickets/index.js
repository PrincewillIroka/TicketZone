import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "./SellTickets.css";

function SellTickets() {
  const [eventTitle, setEventTitle] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventCategory, setEventCategory] = useState("");

  const handleSelectCategory = (e) => {
    e.preventDefault();
    setEventCategory(e.target.value);
  };

  return (
    <div>
      <Header />
      <div className="sell-tickets-container">
        <h3>Event Details:</h3>
        <section className="sell-tickets-section">
          <div className="sell-tickets-col">
            <input
              placeholder="Title of Event"
              className="sell-tickets-input"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
            <input
              placeholder="Venue"
              className="sell-tickets-input"
              value={eventVenue}
              onChange={(e) => setEventVenue(e.target.value)}
            />
            <input
              placeholder="Description"
              className="sell-tickets-input"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            />
            <select
              className="sell-tickets-select"
              onChange={(e) => handleSelectCategory(e)}
            >
              <option>Category</option>
              <option>Music</option>
              <option>Sports</option>
              <option>Arts & Theater</option>
              <option>Comedy</option>
              <option>Festivals</option>
              <option>Technology</option>
              <option>Gospel</option>
            </select>
            <div className="sell-tickets-row">
              <input
                placeholder="Quantity of tickets"
                className="sell-tickets-quantity"
              />
              <select className="sell-tickets-price">
                <option>Currency</option>
                <option>NGN</option>
              </select>
              <input
                placeholder="Price per ticket"
                className="sell-tickets-price"
              />
            </div>
            <button className="btn-sell-ticket">Continue</button>
          </div>
          <div className="sell-tickets-col">
            <div className="sell-tickets-preview-wrapper">
              <span>Preview</span>
              <div className="sell-tickets-preview">
                <span>{eventTitle ? eventTitle : "Title of Event"}</span>
              </div>
              <div className="sell-tickets-preview">
                <span>{eventVenue ? eventVenue : "Venue of Event"}</span>
              </div>
              <div className="sell-tickets-preview">
                <span>
                  {eventDescription ? eventDescription : "Description of Event"}
                </span>
              </div>
              <div className="sell-tickets-preview">
                <span>
                  {eventCategory ? eventCategory : "No category selected"}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default SellTickets;
