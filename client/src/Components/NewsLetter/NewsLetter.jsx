import React, { useState } from 'react';
import axios from 'axios';
import './NewsLetter.css';

const NewsLetter = () => {

  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    try {
      await axios.post("http://localhost:4000/subscribe", { email });
      alert("Thanks for subscribing! Please check your email.");
      setEmail(""); // Clear input
    } catch (error) {
      alert("Subscription failed. Try again.");
      console.error(error);
    }
  };
  return (
    <div className="newsLetter">
      <h1>Get timely updates from your favorite products.</h1>
      <p>Subscribe to stay updated</p>
      <div>
       <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubscribe} >Subscribe</button>
      </div>
    </div>
  );
}
export default NewsLetter;