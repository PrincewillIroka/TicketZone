import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import Header from "components/Header";
import { useStateValue } from "store/stateProvider";
import { getUserEvents } from "services/userServices";
import ImagePlaceholder from "assets/No-Image-Placeholder.png";
import "./Dashboard.css";
import ViewTicket from "pages/Dashboard/Modals/ViewTicket";
import EditTicket from "pages/Dashboard/Modals/EditTicket";

function Dashboard(props) {
  const [activeTab, setActiveTab] = useState("Tickets");
  const navigate = useNavigate();
  const { dispatch, state } = useStateValue();
  const { user = {} } = state;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [tickets, setTickets] = useState([]);
  const { _id = "" } = user;
  const [selectedTicket, setSelectedTicket] = useState({});
  const [ticketAction, setTicketAction] = useState("");

  const handleGetUserEvents = useCallback(() => {
    getUserEvents({
      userId: _id,
      page,
      limit,
    }).then((response) => {
      const { success, data } = response || {};
      if (success) {
        setTickets(data);
      }
    });
  }, [_id, page, limit]);

  useEffect(() => {
    handleGetUserEvents();
  }, [handleGetUserEvents]);

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

  const handleSelectTicket = (ticket, ticketAction) => {
    setTicketAction(ticketAction);
    setSelectedTicket(ticket);
  };

  const handleCloseModal = () => {
    setTicketAction("");
    setSelectedTicket({});
  };

  return (
    <div className="dashboard-container">
      <Header />
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
          <div className="dashboard-main-wrapper">
            {activeTab === "Tickets" && (
              <div className="dashboard-main-tickets">
                {tickets.map((ticket, index) => {
                  const { title, description, venue, price, images, currency } =
                    ticket;
                  const imgSrc =
                    images && images.length ? images[0] : ImagePlaceholder;
                  return (
                    <div key={index} className="dashboard-main-single-ticket">
                      <div className="single-ticket-img-wrapper">
                        <img
                          src={imgSrc}
                          className="single-ticket-img"
                          alt="Ticket Placeholder"
                        />
                      </div>
                      <div className="single-ticket-row">
                        <span className="single-ticket-tag">Title: </span>
                        <span className="">{title}</span>
                      </div>
                      {/* <div className="single-ticket-col">
                          <span className="single-ticket-tag">
                            Description:
                          </span>
                          <span className="">{description}</span>
                        </div> */}
                      <div className="single-ticket-row">
                        <span className="single-ticket-tag">Venue:</span>
                        <span className="">{venue}</span>
                      </div>
                      <div className="single-ticket-row">
                        <span className="single-ticket-tag">Price:</span>
                        <div className="">
                          <span>{price} </span>
                          <span>{currency}</span>
                        </div>
                      </div>
                      <div className="single-ticket-btns-wrapper">
                        <button
                          className="single-ticket-btn single-ticket-btn-view"
                          onClick={() => handleSelectTicket(ticket, "View")}
                        >
                          View
                        </button>
                        <button
                          className="single-ticket-btn single-ticket-btn-edit"
                          onClick={() => handleSelectTicket(ticket, "Edit")}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
      {ticketAction === "View" && (
        <ViewTicket
          selectedTicket={selectedTicket}
          handleCloseModal={handleCloseModal}
        />
      )}
      {ticketAction === "Edit" && (
        <EditTicket
          selectedTicket={selectedTicket}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
}

export default Dashboard;
