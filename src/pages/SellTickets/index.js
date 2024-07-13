import React, { useState, useCallback, useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { LuBadgeCheck } from "react-icons/lu";
import Header from "components/Header";
import Footer from "components/Footer";
import { createEvent, getCategories } from "services/eventServices";
import { useStateValue } from "store/stateProvider";
import { MONTHS_OF_THE_YEAR } from "utils";
import "./SellTickets.css";

function SellTickets() {
  const { state = {}, dispatch } = useStateValue();
  const { homePage = {} } = state;
  let { categories = [] } = homePage;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [category, setCategory] = useState("Category");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("Type");
  const [currency, setCurrency] = useState("Currency");
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isSuccessful, setIsSuccessful] = useState(false);

  const handleSelect = (e, field) => {
    e.preventDefault();
    const value = e.target.value;
    if (field === "category") {
      setCategory(value);
    } else if (field === "type") {
      setType(value);
      if (value === "Free") {
        setPrice(0);
        setCurrency("Currency");
      }
    } else if (field === "currency") {
      setCurrency(value);
    }
  };

  const getMonth = () => {
    const d = new Date(date);
    const month = MONTHS_OF_THE_YEAR[d.getMonth()];
    return month;
  };

  const handleSetDate = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setDate(new Date(value));
  };

  const handleSetPrice = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setPrice(value);

    if (value <= 0) {
      setType("Free");
      setCurrency("Currency");
    } else {
      setType("Paid");
    }
  };

  const handleGetCategories = useCallback(() => {
    getCategories().then((response) => {
      const { success, categories = [], tags = [] } = response || {};
      if (success) {
        dispatch({
          type: "UPDATE_HOME_PAGE_CATEGORIES",
          payload: { categories, displayedTags: tags },
        });
        setIsLoading(false);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    handleGetCategories();
  }, [handleGetCategories]);

  const handleContinue = async () => {
    console.log({
      title,
      venue,
      description,
      category,
      price,
      quantity,
      type,
      currency,
      date,
    });
    if (
      title &&
      venue &&
      quantity > 0 &&
      type !== "Type" &&
      category !== "Category"
    ) {
      setIsLoading(true);
      await createEvent({
        title,
        venue,
        description,
        category,
        price,
        initialQuantityAvailable: quantity,
        type,
        currency,
        date,
      })
        .then((response) => {
          if (response.success) {
            setIsSuccessful(true);
          }
          setIsLoading(false);
          setTimeout(() => {
            setIsSuccessful(false);
          }, 2500);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="sell-tickets-container">
        <section className="sell-tickets-section">
          <div className="sell-tickets-col">
            <div className="alert-wrapper">
              <h3 className="sell-tickets-col-heading">Event Details</h3>
              <div
                className={`${
                  isSuccessful
                    ? "sell-tickets-alert-displayed"
                    : "sell-tickets-alert-hidden"
                } sell-tickets-alert-success`}
              >
                Event created successfully!
                <LuBadgeCheck className="sell-tickets-alert-badge" />
              </div>
            </div>
            <input
              placeholder="Title of Event"
              className="sell-tickets-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              placeholder="Description"
              className="sell-tickets-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              placeholder="Venue"
              className="sell-tickets-input"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
            />
            <div className="sell-tickets-row">
              <input
                type="date"
                name="dateOfEvent"
                id="dateOfEvent"
                onChange={(e) => handleSetDate(e)}
              />
              <select
                className="sell-tickets-type"
                onChange={(e) => handleSelect(e, "type")}
                value={type}
              >
                <option disabled>Type</option>
                <option>Free</option>
                <option>Paid</option>
              </select>
              <input
                placeholder="Number of tickets"
                className="sell-tickets-quantity"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
                type="Number"
              />
            </div>
            <div className="sell-tickets-row">
              <input
                placeholder="Price per ticket"
                className="sell-tickets-price"
                value={price}
                onChange={(e) => handleSetPrice(e)}
                type="Number"
              />
              <select
                className="sell-tickets-currency"
                onChange={(e) => handleSelect(e, "currency")}
                value={currency}
              >
                <option disabled>Currency</option>
                <option>NGN</option>
                <option>USD</option>
              </select>
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
            </div>
            <button
              className={`btn-sell-ticket ${
                isLoading && "btn-sell-ticket-loading"
              }`}
              onClick={() => handleContinue()}
            >
              {isLoading ? "Please wait..." : "Continue"}
            </button>
          </div>
          <div className="sell-tickets-col">
            <h3 className="sell-tickets-col-heading">Ticket Preview</h3>
            <div className="sell-tickets-preview">
              <div className="item">
                <div className="item-right">
                  <h2 className="num">{date.getDate()}</h2>
                  <p className="day">{getMonth()}</p>
                  <div className="item-price">
                    <h4>Price:</h4>
                    <span className="item-amount">{price}</span>
                    {price > 0 && (
                      <span className="item-currency">{currency}</span>
                    )}
                  </div>
                  <span className="up-border"></span>
                  <span className="down-border"></span>
                </div>

                <div className="item-left">
                  <p className="event">{title ? title : "Title of Event"}</p>
                  <h2 className="title">
                    {description ? description : "Description of Event"}
                  </h2>
                  <div className="sce">
                    <div className="icon">
                      <FaRegCalendarAlt />
                    </div>
                    <p>
                      {date.toDateString()} <br /> {date.toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="fix"></div>
                  <div className="loc">
                    <div className="icon">
                      <IoLocationSharp />
                    </div>
                    <p>{venue ? venue : "Venue of Event"}</p>
                  </div>
                  <button className="tickets">Event Ticket</button>
                </div>
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
