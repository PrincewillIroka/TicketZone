import React from "react";
import ImagePlaceholder from "assets/No-Image-Placeholder.png";
import "./Modals.css";
import "./ViewTicket.css";

function ViewTicket({ selectedTicket, handleCloseModal }) {
  const {
    title = "",
    description = "",
    venue = "",
    price = 0,
    images = [],
    currency = "",
    date = "",
    tags = [],
    quantityOfTicketsCreated = 0,
    quantityOfTicketsSold = 0,
    category = {},
    type = "",
  } = selectedTicket;
  const eventDate = new Date(date);
  const imgSrc = images && images.length ? images[0] : ImagePlaceholder;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-top-row">
          <span className="modal-title">Ticket Details</span>
          <span className="close" onClick={() => handleCloseModal()}>
            &times;
          </span>
        </div>
        <div className="view-ticket-container">
          <div className="view-ticket-img-wrapper">
            <img
              src={imgSrc}
              className="view-ticket-img"
              alt="Ticket Placeholder"
            />
          </div>
          <div className="view-ticket-row">
            <span className="view-ticket-tag">Title:</span>
            <span>{title}</span>
          </div>
          <div className="view-ticket-row">
            <span className="view-ticket-tag">Description:</span>
            <span>{description}</span>
          </div>
          <div className="view-ticket-row">
            <span className="view-ticket-tag">Venue:</span>
            <span>{venue}</span>
          </div>
          <div className="view-ticket-row">
            <span className="view-ticket-tag">Price:</span>
            <span>{price}</span>
            <span>{currency}</span>
          </div>
          <div className="view-ticket-row">
            <span className="view-ticket-tag">Date:</span>
            <span>{eventDate.getDate()}</span>
          </div>
          <div className="view-ticket-row">
            <div className="view-ticket-quantity-row">
              <div>
                <span className="view-ticket-tag">Tickets created:</span>
                <span>{quantityOfTicketsCreated}</span>
              </div>
              <div>
                <span className="view-ticket-tag">Tickets sold:</span>
                <span>{quantityOfTicketsSold}</span>
              </div>
              <div>
                <span className="view-ticket-tag">Tickets available:</span>
                <span>{quantityOfTicketsCreated - quantityOfTicketsSold}</span>
              </div>
            </div>
          </div>
          <div className="view-ticket-row">
            <span className="view-ticket-tag">Category:</span>
            <span>{category?.name}</span>
          </div>
          <div className="view-ticket-row">
            <span className="view-ticket-tag">Tags:</span>
            <div>
              {tags.map((tag, tagIndex) => (
                <span className="view-ticket-hashtag" key={tagIndex}>
                  {`#`}
                  {tag}
                  {tagIndex < tags.length - 1 && ", "}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewTicket;
