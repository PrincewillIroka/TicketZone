import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import Header from "components/Header";
import { useStateValue } from "store/stateProvider";
import { getUserEvents } from "services/userServices";
import ImagePlaceholder from "assets/No-Image-Placeholder.png";
import { createArrayItems } from "utils";
import ViewTicket from "../Dashboard/Modals/ViewTicket";
import EditTicket from "../Dashboard/Modals/EditTicket";
import CreateTicket from "../Dashboard/Modals/CreateTicket";
import "./Dashboard.css";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("Tickets");
  const navigate = useNavigate();
  const { dispatch, state } = useStateValue();
  const { user = {} } = state;
  const [page, setPage] = useState(0);
  const [tickets, setTickets] = useState([]);
  const { _id = "" } = user;
  const [selectedTicket, setSelectedTicket] = useState({});
  const [ticketAction, setTicketAction] = useState("");
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const limit = 10;

  const handleGetUserEvents = useCallback(async () => {
    await getUserEvents({
      userId: _id,
      page,
      limit,
    })
      .then((response) => {
        const { success, data } = response || {};
        if (success) {
          setTickets(data);
        }
        setIsLoadingEvents(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoadingEvents(false);
      });
  }, [_id, page, limit]);

  useEffect(() => {
    handleGetUserEvents();
  }, [handleGetUserEvents]);

  const handleLogOut = () => {
    localStorage.removeItem("isUserLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("temporaryTicket");
    dispatch({
      type: "USER_LOG_OUT",
    });
    navigate("/", { replace: true });
  };

  const handleSelectTicket = (ticket, ticketAction) => {
    if (ticketAction === "Edit") {
      localStorage.setItem("temporaryTicket", JSON.stringify(ticket));
    }
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
          <div className="btn-create-ticket-wrapper">
            <button
              className="btn-create-ticket"
              onClick={() => setTicketAction("Create")}
            >
              Create New Ticket
            </button>
          </div>
          <div className="dashboard-main-wrapper">
            {activeTab === "Tickets" &&
              (isLoadingEvents ? (
                <div className="dashboard-main-tickets">
                  {createArrayItems(6).map((item, index) => (
                    <div
                      className="dashboard-main-single-shimmer shimmer-bg"
                      key={index}
                    ></div>
                  ))}
                </div>
              ) : !tickets.length ? (
                <div className="explore-item-none">No tickets found.</div>
              ) : (
                <div className="dashboard-main-tickets">
                  {tickets.map((ticket, index) => {
                    const { title, venue, price, images, currency } = ticket;
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
              ))}
          </div>
        </div>
      </section>
      {ticketAction === "View" && (
        <ViewTicket
          selectedTicket={selectedTicket}
          handleCloseModal={() => handleCloseModal()}
        />
      )}
      {ticketAction === "Edit" && (
        <EditTicket
          selectedTicket={selectedTicket}
          handleCloseModal={() => handleCloseModal()}
        />
      )}
      {ticketAction === "Create" && (
        <CreateTicket
          selectedTicket={selectedTicket}
          handleCloseModal={() => handleCloseModal()}
        />
      )}
    </div>
  );
}

export default Dashboard;
