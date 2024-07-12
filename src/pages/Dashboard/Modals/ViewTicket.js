import React from "react";
import "./Modals.css";
import "./ViewTicket.css";

function ViewTicket({ selectedTicket, handleCloseModal }) {
  const { title, description, venue, price, images, currency } = selectedTicket;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-top-row">
          <span className="modal-title">Ticket Details</span>
          <span className="close" onClick={() => handleCloseModal()}>
            &times;
          </span>
        </div>
        {title}
      </div>
    </div>
  );
}

export default ViewTicket;
