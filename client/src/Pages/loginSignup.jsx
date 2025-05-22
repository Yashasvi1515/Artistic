import React from "react";
import './CSS/LoginSignup.css';

const loginSignup = () => {
  return (
    <div className="loginSignup">
     <div className="loginsignup-container">
        <h1>
            Sign Up
        </h1>
        <div className="loginsignup-fields">
            <input type="text" name="" id="" placeholder="Your Name" />
            <input type="email" name="" id="" placeholder="Your email" />
            <input type="password" name="" id="" placeholder="Password" />
        </div>
        <button>Continue</button>
        <p className="loginsignup-login">Already have an account <span> Login</span></p>
        <a href="http://localhost:4000/auth/google">
  <button>Login with Google</button>
</a>
        <div className="loginsignup-agree">
           <input type="checkbox" name="" id="" /> 
           <p>By continuing I agree up to use the terms of privacy policy </p>
        </div>
     </div>
    </div>
  );
}
export default loginSignup;