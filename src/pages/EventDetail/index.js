import { React, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useStateValue } from "store/stateProvider";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./EventDetail.css";

function EventDetail() {
  const { state: locationState } = useLocation();
  const { state, dispatch } = useStateValue();
  const {
    _id = "",
    title = "",
    images = [],
    venue = "",
    price = "",
    description = "",
    category = {},
  } = locationState;
  const { ticketCart = [] } = state;
  const [activeImage, setActiveImage] = useState(images[0]);

  const isTicketInCart = useMemo(
    () => ticketCart.find((tc) => tc.ticket._id === _id),
    [ticketCart, _id]
  );

  const [ticketQuantity, setTicketQuantity] = useState(
    isTicketInCart?.ticketQuantity || 0
  );

  const handleUpdateTicketByValue = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value === "") {
      handleSetTicketQuantity(0);
    } else {
      handleSetTicketQuantity(Number(value));
    }
  };

  const handleAddTicketToCart = (value) => {
    dispatch({
      type: "ADD_TICKET_TO_CART",
      payload: { ticket: locationState, ticketQuantity: value },
    });
  };

  const handleSetTicketQuantity = (value) => {
    setTicketQuantity(value);
    if (isTicketInCart) {
      handleAddTicketToCart(value);
    }
  };

  return (
    <div>
      <Header />
      <div className="event-detail-container">
        <section className="event-detail-section">
          <div className="event-detail-breadcrumb">
            Category {category.name && `/ ${category.name}`}
          </div>
          <div className="event-detail-row">
            <div className="event-detail-img-container">
              <img src={activeImage} className="event-detail-img" alt="" />
              <div className="event-detail-gallery">
                {images.map((image, index) => (
                  <div className="event-detail-gallery-single" key={index}>
                    <img
                      src={image}
                      className="event-detail-gallery-img"
                      alt=""
                      onClick={() => setActiveImage(image)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="event-detail-others">
              <span className="event-detail-title">{title}</span>
              <div className="event-detail-venue-container">
                <b>Venue:</b>
                <span className="event-detail-venue">{venue}</span>
              </div>
              <div className="event-detail-description-container">
                <b>Description:</b>
                <span className="event-detail-description">{description}</span>
              </div>
              <div className="event-detail-price-container">
                <b>Price:</b>
                <span className="event-detail-price">{price}</span>
              </div>
              <div className="event-detail-quantity">
                <span className="quantity-title">Quantity:</span>
                <div className="quantity-container">
                  <div
                    className="btn-quantity"
                    onClick={() => {
                      ticketQuantity > 0 &&
                        handleSetTicketQuantity(ticketQuantity - 1);
                    }}
                  >
                    <FaMinus className="icon-quantity" />
                  </div>
                  <input
                    value={ticketQuantity}
                    className="input-quantity"
                    onChange={(e) => handleUpdateTicketByValue(e)}
                  />
                  <div
                    className="btn-quantity"
                    onClick={() => handleSetTicketQuantity(ticketQuantity + 1)}
                  >
                    <FaPlus className="icon-quantity" />
                  </div>
                </div>
              </div>
              {isTicketInCart ? (
                <button
                  className="btn-get-ticket"
                  onClick={() => handleSetTicketQuantity(0)}
                >
                  Remove Ticket From Cart
                </button>
              ) : (
                <button
                  className="btn-get-ticket"
                  onClick={() =>
                    ticketQuantity > 0 && handleAddTicketToCart(ticketQuantity)
                  }
                >
                  Add Ticket To Cart
                </button>
              )}
            </div>
          </div>
        </section>
        <section>
          <div>
            <span>Similar Events</span>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default EventDetail;
