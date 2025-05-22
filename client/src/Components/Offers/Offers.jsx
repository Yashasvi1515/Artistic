import React from "react";
import './Offers.css';
import im1 from '../Assets/p1.jpg';
const Offers = () => {
  return (
    <div className="offers">
     <div className="offers-left">
        <h1>Exclusive</h1>
        <h2>Offers For You</h2>
        <p>ONLY OUR FEELINGS</p>
        <button>Check Now</button>
     </div>
     <div className="offers-right">
        <img src={im1} alt="" />
     </div>
    </div>
  );
}
export default Offers;