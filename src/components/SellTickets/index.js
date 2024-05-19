import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "./SellTickets.css";

function SellTickets() {
  const [eventTitle, setEventTitle] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventCategory, setEventCategory] = useState("");

  return (
    <div>
      <Header />
      <div className="sell-tickets-container">
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
            <select className="sell-tickets-select">
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
                value=""
                placeholder="Quantity of tickets"
                className="sell-tickets-quantity"
              />
              <input
                value=""
                placeholder="Price per ticket"
                className="sell-tickets-price"
              />
            </div>
          </div>
          <div className="sell-tickets-col">
            <span>Preview</span>
            <div>
              <span>{eventTitle ? eventTitle : "Title of Event"}</span>
            </div>
            <div>
              <span>{eventVenue ? eventVenue : "Venue of Event"}</span>
            </div>
            <div>
              <span>
                {eventDescription ? eventDescription : "Description of Event"}
              </span>
            </div>
            <div>
              <span>
                {eventCategory ? eventCategory : "No category selected"}
              </span>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default SellTickets;
