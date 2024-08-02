import React, { useState } from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import EventCard from "components/EventCard";
import { useStateValue } from "store/stateProvider";
import "./BuyTickets.css";

function BuyTickets(props) {
  const { state = {}, dispatch } = useStateValue();
  const { homePage = {} } = state;
  let { categories = [], events = [] } = homePage;
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Category");
  const [type, setType] = useState("Type");
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const hasCompletedFormFields =
    title && category !== "Category" && type !== "Type";

  const handleSelect = (e, field) => {
    e.preventDefault();
    const value = e.target.value;
    if (field === "category") {
      setCategory(value);
    } else if (field === "type") {
      setType(value);
    }
  };

  const handleSetDate = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setDate(new Date(value));
  };

  const handleContinue = async (e) => {};

  return (
    <div>
      <Header />
      <div className="buy-tickets-container">
        <div className="buy-tickets-wrapper">
          <section className="buy-tickets-section">
            <form className="buy-tickets-form">
              <input
                placeholder="Title of event"
                className="buy-tickets-input"
              />
              <select
                className="buy-tickets-category"
                onChange={(e) => handleSelect(e, "category")}
                defaultValue={category}
              >
                <option disabled>Category</option>
                {categories.map(({ name, alias, _id }, index) => {
                  return (
                    <option value={_id} key={index}>
                      {name}
                    </option>
                  );
                })}
              </select>
              <select
                className="buy-tickets-category"
                onChange={(e) => handleSelect(e, "type")}
                value={type}
              >
                <option disabled>Type of event</option>
                <option>Free</option>
                <option>Paid</option>
              </select>
              <input
                type="date"
                name="dateOfEvent"
                id="dateOfEvent"
                className="buy-tickets-category"
                onChange={(e) => handleSetDate(e)}
              />
              <button
                className={`btn-sell-ticket
                ${
                  !hasCompletedFormFields
                    ? "btn-sell-ticket-disabled"
                    : "btn-sell-ticket-enabled"
                }`}
                onClick={(e) => handleContinue(e)}
              >
                {isLoading ? "Please wait..." : "Continue"}
              </button>
            </form>
            <div className="buy-tickets-items">
              {events.map((event, index) => (
                <EventCard event={event} key={index} />
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BuyTickets;
