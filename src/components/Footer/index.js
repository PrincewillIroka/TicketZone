import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="footer-row-1">
        <div className="footer-row-1-col-1">
          <Link to="/">
            <img src="/logo.png" className="footer-logo" alt="Logo" />
          </Link>
          <span className="footer-app-description">
            Ticket Zone is an event ticketing platform for memorable
            experiences.
          </span>
          <span className="footer-app-copyright">
            Copyright &copy; 2024. Ticket Zone. All rights reserved.
          </span>
        </div>
        <div className="footer-col footer-col-1">
          <b className="footer-col-heading">Products</b>
          <ul>
            <li>Ticketing</li>
          </ul>
        </div>
        <div className="footer-col footer-col-2">
          <b className="footer-col-heading">Company</b>
          <ul>
            <li>
              <Link to="/about-us" className="footer-social-icon-container">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/faqs" className="footer-social-icon-container">
                FAQs
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-col footer-col-3">
          <b className="footer-col-heading">Follow Us</b>
          <ul>
            <li>
              <a
                href="https://www.facebook.com/"
                className="footer-social-icon-container"
              >
                <FaFacebookF className="footer-social-icon" />
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com/"
                className="footer-social-icon-container"
              >
                <FaTwitter className="footer-social-icon" />
                <span>Twitter</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/"
                className="footer-social-icon-container"
              >
                <FaInstagram className="footer-social-icon" />
                <span>Instagram</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-row-2"></div>
    </footer>
  );
}

export default Footer;
