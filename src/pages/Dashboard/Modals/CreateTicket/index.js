import React from "react";
import SellTicketsComponent from "pages/SellTickets/SellTicketsComponent";
import "../Modals.css";
import "./CreateTicket.css";

function CreateTicket({ selectedTicket, handleCloseModal }) {
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
