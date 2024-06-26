import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Auth.css";
import { userLogin, userSignUp } from "services/authServices";
import { useStateValue } from "store/stateProvider";

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
  const { dispatch } = useStateValue();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const activeAction = location.pathname.split("/")[1];

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
      const { success, data: user } = response;
      setIsLoading(false);
      if (success) {
        localStorage.setItem("isUserLoggedIn", JSON.stringify(true));
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({ type: "GET_USER_SUCCESS", payload: user });
        navigate("/dashboard", { replace: true });
      }
    });
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    await userSignUp({ email, password }).then((response) => {
      const { success } = response;
      setIsLoading(false);
      if (success) {
        navigate("/login", { replace: true });
      }
    });
  };

  const handleNavigate = (page) => {
    navigate(page);
  };

  return (
    <section className="auth-container">
      <div className="auth-content">
        <form className="auth-form">
          <img
            src="/logo.png"
            className="auth-logo"
            alt="Logo"
            onClick={() => handleNavigate("/")}
          />
          <input
            placeholder="Email"
            className="auth-input"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
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
              e.preventDefault();
              getActiveTab("login") ? handleLogin() : handleSignUp();
            }}
          >
            {isLoading
              ? "Loading..."
              : getActiveTab("login")
              ? "Login"
              : "Sign Up"}
          </button>
        </form>
        <p>
          {BTN_CAPTION[activeAction]}
          <span className="signup-link" onClick={toggleActiveAction}>
            {BTN_TAG[activeAction]}
          </span>
        </p>
      </div>
      <img
        className="auth-bg"
        src="/images/1_WEe12m3W1pyby00G4Uvc5Q.jpeg"
        alt=""
      />
    </section>
  );
}

export default Auth;
