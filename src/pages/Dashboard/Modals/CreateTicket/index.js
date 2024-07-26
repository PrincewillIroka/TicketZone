import React from "react";
import ImagePlaceholder from "assets/No-Image-Placeholder.png";
import SellTicketsComponent from "pages/SellTickets/SellTicketsComponent";
import "../Modals.css";
import "./CreateTicket.css";

function CreateTicket({ selectedTicket, handleCloseModal }) {
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
      <div className="create-ticket-modal-content">
        <div className="create-ticket-modal-top-row">
          <span className="modal-title">Create New Ticket</span>
          <span className="close" onClick={() => handleCloseModal()}>
            &times;
          </span>
        </div>
        <div className="create-ticket-container">
          <SellTicketsComponent />
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
