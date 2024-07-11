import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import Header from "components/Header";
import { useStateValue } from "store/stateProvider";
import "./Dashboard.css";

function Dashboard(props) {
  const [activeTab, setActiveTab] = useState("Tickets");
  const navigate = useNavigate();
  const { dispatch } = useStateValue();

  const handleNavigate = (page) => {
    navigate(page);
  };

  const handleLogOut = () => {
    localStorage.removeItem("isUserLoggedIn");
    localStorage.removeItem("user");
    dispatch({
      type: "USER_LOG_OUT",
    });
    navigate("/", { replace: true });
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
            <button className="btn-logout" onClick={() => handleLogOut()}>
              <span>Log Out</span>
              <IoMdLogOut className="icon-logout" />
            </button>
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
