import React from "react";
import './Navbar.css';
import navlogo from '../../assets/product1.jpg';
import navprofile from '../../assets/product2.jpg';
const Navbar = () => {
  return (
    <div className="navbar">
      <img src={navlogo} alt="" className="nav-logo" />
      <img src={navprofile} alt="" className="nav-profile" />
    </div>
  );
}
export default Navbar;