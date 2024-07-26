import React, { useState } from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import "./BuyTickets.css";
import { useStateValue } from "store/stateProvider";

function BuyTickets(props) {
  const { state = {}, dispatch } = useStateValue();
  const { homePage = {} } = state;
  let { categories = [] } = homePage;
  const [category, setCategory] = useState("Category");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("Type");
  const [date, setDate] = useState(new Date());

  const handleSelect = (e, field) => {
    e.preventDefault();
    const value = e.target.value;
    if (field === "category") {
      setCategory(value);
    } else if (field === "type") {
      setType(value);
      if (value === "Free") {
        setPrice(0);
      }
    }
  };

  const handleSetDate = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setDate(new Date(value));
  };

  return (
    <div>
      <Header />
      <div className="buy-tickets-container">
        <div className="buy-tickets-wrapper">
          <section className="buy-tickets-section">
            <form className="buy-tickets-form">
              <input placeholder="Title of event" />
              <select
                className="sell-tickets-category"
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
                className="sell-tickets-type"
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
                onChange={(e) => handleSetDate(e)}
              />
            </form>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BuyTickets;
