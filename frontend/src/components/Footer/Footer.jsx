import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-top">
        <h2>Want Updates on the Latest Offers?</h2>
        <p>Stay connected with us and receive regular updates and news.</p>

        <div className="input-footer">
          <input
            type="email"
            placeholder="Enter your email address"
            aria-label="Email address"
          />
          <button>Join Now</button>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-left">
          <h2>Foodway</h2>
          <div className="socials">
            <FaFacebook className="social-icon" />
            <FaInstagram className="social-icon" />
            <FaYoutube className="social-icon" />
          </div>
        </div>

        <div className="footer-right">
          <ul>
            <li>Home</li>
            <li>Services</li>
            <li>About Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>

      <p className="copy">© 2025 Foodway. All rights reserved.</p>
    </div>
  );
};

export default Footer;
