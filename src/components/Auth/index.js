import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Auth.css";

function Auth(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const getActiveTab = (value) => activeTab.includes(value);

  return (
    <section className="auth-container">
      <div className="auth-content">
        <form className="auth-form">
          <h1 className="auth-title">Ticket Zone</h1>
          <input placeholder="Email" className="auth-input" />
          <input
            placeholder="Password"
            type="password"
            className="auth-input"
          />
          <button className="btn-auth-submit">Submit</button>
        </form>
      </div>
      <div className="auth-bg" />
    </section>
  );
}

export default Auth;
