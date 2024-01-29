import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Auth.css";
import { userLogin } from "../../services/authServices";

const BTN_CAPTION = {
  login: `Don't have an account ? `,
  signup: `Already have an account ? `,
};

const BTN_TAG = {
  login: `Sign Up`,
  signup: `Login`,
};

function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeAction = location.pathname.split("/")[1];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const getActiveTab = (value) => location.pathname.includes(value);

  const toggleActiveAction = () => {
    if (getActiveTab("login")) {
      navigate("/signup", { replace: true });
    } else if (getActiveTab("signup")) {
      navigate("/login", { replace: true });
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    await userLogin({ email, password }).then((response) => {
      const { success, data } = response;
      if (success) {
        navigate("/dashboard", { replace: true });
      }
      setIsLoading(false);
    });
  };

  const handleSignUp = () => {};

  return (
    <section className="auth-container">
      <div className="auth-content">
        <form className="auth-form">
          <h1 className="auth-title">Ticket Zone</h1>
          <input
            placeholder="Email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="btn-auth-submit"
            onClick={(e) => {
              getActiveTab("login") ? handleLogin() : handleSignUp();
            }}
          >
            {getActiveTab("login") ? "Login" : "Sign Up"}
          </button>
        </form>
        <p>
          {BTN_CAPTION[activeAction]}
          <span className="signup-link" onClick={toggleActiveAction}>
            {BTN_TAG[activeAction]}
          </span>
        </p>
      </div>
      <div className="auth-bg" />
    </section>
  );
}

export default Auth;
