import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./HowItWorks.css";

function HowItWorks(props) {
  return (
    <div>
      <Header />
      <div className="how-it-works-container">
        <section className="how-it-works-section">
          <section className="how-it-works">
            <h2>How It Works</h2>
            <div className="container">
              <div className="step">
                <div className="icon">
                  <i className="fas fa-search"></i>
                </div>
                <h3>Search for Events</h3>
                <p>
                  Browse our extensive catalog of events by location, date,
                  genre, or artist.
                </p>
              </div>
              <div className="step">
                <div className="icon">
                  <i className="fas fa-calendar-alt"></i>
                </div>
                <h3>Select Your Tickets</h3>
                <p>
                  Choose the best seats and ticket options that fit your budget
                  and preferences.
                </p>
              </div>
              <div className="step">
                <div className="icon">
                  <i className="fas fa-credit-card"></i>
                </div>
                <h3>Secure Checkout</h3>
                <p>
                  Complete your purchase securely with our trusted payment
                  gateway.
                </p>
              </div>
              <div className="step">
                <div className="icon">
                  <i className="fas fa-ticket-alt"></i>
                </div>
                <h3>Enjoy the Show</h3>
                <p>
                  Receive your tickets electronically or print them at home, and
                  get ready for an unforgettable experience!
                </p>
              </div>
            </div>
          </section>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default HowItWorks;
