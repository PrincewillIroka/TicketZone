import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { LuBadgeCheck } from "react-icons/lu";
import { createEvent, getCategories } from "services/eventServices";
import { useStateValue } from "store/stateProvider";
import { MONTHS_OF_THE_YEAR } from "utils";
import "./SellTickets.css";

function SellTicketsComponent() {
  const navigate = useNavigate();
  const { state = {}, dispatch } = useStateValue();
  let { homePage = {}, user = {} } = state;
  let { categories = [] } = homePage;
  const { _id = "" } = user;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [category, setCategory] = useState("Category");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("Type");
  const [currency, setCurrency] = useState("Currency");
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const hasCompletedFormFields =
    title &&
    venue &&
    type !== "Type" &&
    quantity > 0 &&
    price !== "" &&
    currency !== "Currency" &&
    category !== "Category";

  const handleSelect = (e, field) => {
    e.preventDefault();
    const value = e.target.value;
    if (field === "category") {
      setCategory(value);
    } else if (field === "type") {
      setType(value);
      if (value === "Free") {
        setPrice("");
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

  const handleGetCategories = useCallback(async () => {
    await getCategories()
      .then((response) => {
        const { success, categories = [], tags = [] } = response || {};
        if (success) {
          dispatch({
            type: "UPDATE_HOME_PAGE_CATEGORIES",
            payload: { categories, displayedTags: tags },
          });
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    handleGetCategories();
  }, [handleGetCategories]);

  useEffect(() => {
    const temporaryTicket = JSON.parse(localStorage.getItem("temporaryTicket"));
    if (temporaryTicket && Object.entries(temporaryTicket).length) {
      const {
        title,
        description,
        venue,
        date,
        type,
        quantity,
        price,
        currency,
        category,
      } = temporaryTicket;
      setTitle(title);
      setDescription(description);
      setVenue(venue);
      setDate(new Date(date));
      setType(type);
      setQuantity(quantity);
      setPrice(price);
      setCurrency(currency);
      setCategory(category);
      localStorage.removeItem("temporaryTicket");
    }
  }, []);

  const handleContinue = async (e) => {
    e.preventDefault();
    if (hasCompletedFormFields || !isCreatingEvent) {
      const ownerId = _id;
      const obj = {
        title,
        description,
        venue,
        date,
        type,
        quantity,
        price,
        currency,
        category,
      };

      if (!ownerId) {
        localStorage.setItem("temporaryTicket", JSON.stringify(obj));
        navigate("/login");
      } else {
        obj.ownerId = ownerId;
        obj.initialQuantityAvailable = quantity;
        setIsCreatingEvent(true);
        dispatch({
          type: "USER_ADD_TEMP_TICKET",
          payload: {},
        });
        await createEvent(obj)
          .then((response) => {
            if (response.success) {
              setIsSuccessful(true);
            }
            setIsCreatingEvent(false);
            setTimeout(() => {
              setIsSuccessful(false);
            }, 2500);
            handleClearFields();
          })
          .catch((error) => {
            console.error(error);
            setIsCreatingEvent(false);
          });
      }
    }
  };

  const handleClearFields = () => {
    setTitle("");
    setDescription("");
    setVenue("");
    setDate(new Date());
    setType("Type");
    setQuantity("");
    setPrice();
    setCurrency("Currency");
    setCategory("Category");
  };

  return (
    <section className="sell-tickets-section">
      <form className="sell-tickets-col-1">
        <div className="sell-tickets-col-heading-wrapper">
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
            min={1}
          />
        </div>
        <div className="sell-tickets-row">
          <input
            placeholder="Price per ticket"
            className="sell-tickets-price"
            value={price}
            onChange={(e) => handleSetPrice(e)}
            type="Number"
            min={1}
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
          className={`btn-sell-ticket
            ${
              !hasCompletedFormFields || isCreatingEvent
                ? "btn-sell-ticket-disabled"
                : "btn-sell-ticket-enabled"
            }`}
          onClick={(e) => handleContinue(e)}
        >
          {isLoading ? "Please wait..." : "Create Ticket(s)"}
        </button>
      </form>
      <div className="sell-tickets-col-2">
        <div className="sell-tickets-col-heading-wrapper">
          <h3 className="sell-tickets-col-heading">Ticket Preview</h3>
        </div>
        <div className="sell-tickets-preview">
          <div className="item-container">
            <div className="item-right">
              <h2 className="num">{date.getDate()}</h2>
              <p className="day">{getMonth()}</p>
              <div className="item-price">
                <h4>Price:</h4>
                <span className="item-amount">{price}</span>
                {price > 0 && <span className="item-currency">{currency}</span>}
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
  );
}

export default SellTicketsComponent;
