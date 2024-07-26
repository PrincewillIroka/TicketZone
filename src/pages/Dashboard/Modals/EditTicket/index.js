import React from "react";
import SellTicketsComponent from "pages/SellTickets/SellTicketsComponent";
import "../Modals.css";
import "./EditTicket.css";

function EditTicket({ handleCloseModal }) {
  return (
    <div className="modal">
      <div className="edit-ticket-modal-content">
        <div className="edit-ticket-modal-top-row">
          <span className="modal-title">Edit Ticket</span>
          <span
            className="close"
            onClick={() => {
              localStorage.removeItem("temporaryTicket");
              handleCloseModal();
            }}
          >
            &times;
          </span>
        </div>
        <div className="edit-ticket-container">
          <SellTicketsComponent />
        </div>
      </div>
    </div>
  );
}

export default EditTicket;
