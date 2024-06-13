import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./HowItWorks.css";

function HowItWorks(props) {
  return (
    <div>
      <Header />
      <div className="how-it-works-container">
        <section className="how-it-works-section"></section>
      </div>
      <Footer />
    </div>
  );
}

export default HowItWorks;
