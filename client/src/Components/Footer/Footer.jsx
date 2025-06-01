import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "./Footer.css"; // Import external CSS
import logo from '../Assets/logo.png'
const Footer = () => {
  return (
     <footer className="footer">
      <div className="footer-container">

        {/* Column 1: Logo + Social */}
        <div className="footer-column">
          <img src={logo} alt="Kalakriti Logo" />
          <div className="footer-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <div className="icon"><FaFacebookF /></div>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <div className="icon"><FaInstagram /></div>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <div className="icon"><FaLinkedinIn /></div>
            </a>
          </div>
        </div>

        {/* Column 2: Main Links */}
        <div className="footer-column">
          <ul className="footer-links">
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div className="footer-column">
          <ul className="footer-links">
            <li><a href="/popular">Popular</a></li>
            <li><a href="/new">New Collection</a></li>
            <li><a href="/acrylics">Acrylics</a></li>
            <li><a href="/digital">Digital</a></li>
            <li><a href="/charcoal">Charcoal</a></li>
            <li><a href="/handmade">Handmade</a></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p className="footer-text">&copy; {new Date().getFullYear()} Kalakriti. All rights reserved.</p>
        <p className="footer-credit">Designed by Kalakriti Team</p>
      </div>
    </footer>
  );
};

export default Footer;
