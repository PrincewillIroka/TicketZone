import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Auth.css";

const BTN_CAPTION = {
  login: `Don't have an account ? `,
  signup: `Already have an account ? `,
};

const BTN_TAG = {
  login: `Sign Up`,
  signup: `Login`,
};

function Auth(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const activeAction = location.pathname.split("/")[1];

  const getActiveTab = (value) => location.pathname.includes(value);

  const toggleActiveAction = () => {
    if (getActiveTab("login")) {
      navigate("/signup", { replace: true });
    } else if (getActiveTab("signup")) {
      navigate("/login", { replace: true });
    }
  };

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
          <button className="btn-auth-submit">
            {getActiveTab("login") ? "Login" : "Sign Up"}
          </button>
        </form>
        <p>
          {BTN_CAPTION[activeAction]}
          <a className="signup-link" onClick={toggleActiveAction}>
            {BTN_TAG[activeAction]}
          </a>
        </p>
      </div>
      <div className="auth-bg" />
    </section>
  );
}

export default Auth;
