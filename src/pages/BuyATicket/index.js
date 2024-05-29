import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import "./BuyATicket.css";

function BuyATicket(props) {
  return (
    <div>
      <Header />
      <div className="layout-container">
        <section className="buy-a-ticket-section"></section>
      </div>
      <Footer />
    </div>
  );
}

export default BuyATicket;
