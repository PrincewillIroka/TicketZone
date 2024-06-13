import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "components/Header";
import "./Dashboard.css";

function Dashboard(props) {
  const [activeTab, setActiveTab] = useState("Tickets");
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    navigate(page);
  };

  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <section className="dashboard-section">
          <aside className="dashboard-aside">
            <div
              className={`dashboard-tab ${
                activeTab === "Tickets"
                  ? "dashboard-tab-active"
                  : "dashboard-tab-inactive"
              }`}
              onClick={() => setActiveTab("Tickets")}
            >
              Tickets
            </div>
            <div
              className={`dashboard-tab ${
                activeTab === "Sales"
                  ? "dashboard-tab-active"
                  : "dashboard-tab-inactive"
              }`}
              onClick={() => setActiveTab("Sales")}
            >
              Sales
            </div>
            <div
              className={`dashboard-tab ${
                activeTab === "Purchases"
                  ? "dashboard-tab-active"
                  : "dashboard-tab-inactive"
              }`}
              onClick={() => setActiveTab("Purchases")}
            >
              Purchases
            </div>
          </aside>
          <div className="dashboard-main">
            <button
              className="btn-create-ticket"
              onClick={() => handleNavigate("/sell-tickets")}
            >
              Create New Ticket
            </button>
            {activeTab === "Tickets" && (
              <div className="dashboard-main-tickets">hhgfffd</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
