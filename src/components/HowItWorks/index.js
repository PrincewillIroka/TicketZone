import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import "./HowItWorks.css";

function HowItWorks(props) {
  return (
    <div>
      <Header />
      <div className="layout-container">
        <section className="how-it-works-section"></section>
      </div>
      <Footer />
    </div>
  );
}

export default HowItWorks;
