import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

function EventDetail() {
  const { state } = useLocation();
  const { event } = state;
  console.log(event);

  return (
    <div>
      <Header />
      <div className="layout-container">Event One December 31st 8:30pm</div>

      <Footer />
    </div>
  );
}

export default EventDetail;
