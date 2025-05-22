import React from "react";
import './Footer.css'; // Import your CSS file for styling
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
       <ul className="footer-links">
            <li><a href="/about" className="text-white hover:text-gray-400">About Us</a></li>
            <li><a href="/contact" className="text-white hover:text-gray-400">Contact</a></li>
            <li><a href="/privacy" className="text-white hover:text-gray-400">Privacy Policy</a></li>
            <li><a href="/terms" className="text-white hover:text-gray-400">Terms of Service</a></li>
       </ul>
       <div className="social-icon">
        <div className="footer-icons-container">Fa</div>
        <div className="footer-icons-container">In</div>
        <div className="footer-icons-container">Li</div>
       </div>
      </div>
        <div className="text-center mt-4">
            <p>&copy; {new Date().getFullYear()} Kalakriti. All rights reserved.</p>
        </div>
        <div className="text-center mt-4">
            <p>Designed by Kalakriti Team</p>
        </div>
    </footer>
  );
}
export default Footer;