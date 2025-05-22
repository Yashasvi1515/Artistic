import React, { useState } from "react";
import './Navbar.css';
import p1 from '../Assets/p1.jpg';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
    const [menu,setMenu]=useState("shop");
    const {getTotalCartItems}=useContext(ShopContext);

    return (
       <div className="navbar">
        <div className="nav-logo">
            <img style={{ 
                width: "50px",
    height: "50px",
    borderradius: "10px"
    }} src={p1} alt="" />
        </div>
     <ul className="nav-menu">
      
      <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:'none'}} to='/'> Shop</Link> {menu==="shop"?<hr/>:<></>}</li>
      <li onClick={()=>{setMenu("acrylic")}}> <Link style={{textDecoration:'none'}} to='/acrylic'> Acrylic</Link> {menu==="acrylic"?<hr/>:<></>}</li>
      <li onClick={()=>{setMenu("charcoal")}}><Link style={{textDecoration:'none'}} to='/charcoal'> Charcoal</Link> {menu==="charcoal"?<hr/>:<></>}</li>
      <li onClick={()=>{setMenu("digital")}}><Link style={{textDecoration:'none'}} to='/digital'> Digital</Link> {menu==="digital"?<hr/>:<></>}</li>
      <li onClick={()=>{setMenu("handmade")}}><Link style={{textDecoration:'none'}} to='/handmade'> Handmade</Link> {menu==="handmade"?<hr/>:<></>}</li>
     </ul>
     <div className="nav-login-cart">
        <Link to='/login'><button>Login</button></Link>
        <Link to='/cart'><img 
        style={{ 
                width: "60px",
    height: "60px",
    
    }} src={p1} alt="" /></Link>
    <div className="nav-cart-count">
        {getTotalCartItems()}
    </div>
     </div>
       </div> 
     
    );
    }
export default Navbar;