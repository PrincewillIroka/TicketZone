import { React, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";
import Header from "../Header";
import Footer from "../Footer";
import "./EventDetail.css";

function EventDetail() {
  const { state } = useLocation();
  const {
    title = "",
    images = [],
    venue = "",
    price = "",
    description = "",
  } = state;
  const [activeImage, setActiveImage] = useState(images[0]);
  const [ticketQuantity, setTicketQuantity] = useState(1);

  return (
    <div>
      <Header />
      <div className="event-detail-container">
        <section className="event-detail-section">
          <div className="event-detail-breadcrumb">
            <span>Sports</span>/<span>Football</span>
          </div>
          <div className="event-detail-row">
            <div className="event-detail-img-container">
              <img src={activeImage} className="event-detail-img" alt="" />
              <div className="event-detail-gallery">
                {images.map((image) => (
                  <div className="event-detail-gallery-single">
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
                      ticketQuantity > 1 &&
                        setTicketQuantity(ticketQuantity - 1);
                    }}
                  >
                    <FaMinus className="icon-quantity" />
                  </div>
                  <input value={ticketQuantity} className="input-quantity" />
                  <div
                    className="btn-quantity"
                    onClick={() => setTicketQuantity(ticketQuantity + 1)}
                  >
                    <FaPlus className="icon-quantity" />
                  </div>
                </div>
              </div>
              <button className="btn-get-ticket">Get Ticket</button>
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
