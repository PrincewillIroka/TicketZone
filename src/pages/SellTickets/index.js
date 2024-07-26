import React from "react";
import SellTicketsComponent from "./SellTicketsComponent";
import Header from "components/Header";
import Footer from "components/Footer";
import "./SellTickets.css";

function SellTickets() {
  return (
    <div>
      <Header />
      <div className="sell-tickets-container">
        <div className="sell-tickets-wrapper">
          <SellTicketsComponent />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SellTickets;
