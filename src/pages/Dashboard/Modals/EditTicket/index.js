import React from "react";
import ImagePlaceholder from "assets/No-Image-Placeholder.png";
import "../Modals.css";
import "./EditTicket.css";

function EditTicket({ selectedTicket, handleCloseModal }) {
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
          <span className="modal-title">Edit Ticket</span>
          <span className="close" onClick={() => handleCloseModal()}>
            &times;
          </span>
        </div>
        <div className="edit-ticket-container"></div>
      </div>
    </div>
  );
}

export default EditTicket;
