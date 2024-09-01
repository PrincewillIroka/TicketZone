import React from "react";
import { Search, Ticket, ShieldCheck, Smile } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./HowItWorks.css";

function HowItWorks(props) {
  const steps = [
    {
      title: "Search for Events",
      description:
        "Browse our extensive catalog of events by location, date, genre, or artist.",
      icon: Search,
      color: "#FF6B6B",
    },
    {
      title: "Select Your Tickets",
      description:
        "Choose the best seats and ticket options that fit your budget and preferences.",
      icon: Ticket,
      color: "#4ECDC4",
    },
    {
      title: "Secure Checkout",
      description:
        "Complete your purchase securely with our trusted payment gateway.",
      icon: ShieldCheck,
      color: "#45B7D1",
    },
    {
      title: "Enjoy the Show",
      description:
        "Receive your tickets electronically or print them at home, and get ready for an unforgettable experience!",
      icon: Smile,
      color: "#FF9F1C",
    },
  ];

  return (
    <div>
      <Header />
      <div className="how-it-works-container">
        <div className="how-it-works">
          <h2 className="title">How It Works</h2>
          <div className="steps-container">
            {steps.map((step, index) => (
              <div key={index} className="step-card">
                <div
                  className="icon-container"
                  style={{ backgroundColor: step.color }}
                >
                  <step.icon className="step-icon" />
                </div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HowItWorks;
