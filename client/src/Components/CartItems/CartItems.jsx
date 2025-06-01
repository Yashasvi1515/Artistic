import React, { useContext } from "react";
import './CartItems.css';
//import remove_icon from '../Assets/p1.jpg';
import { FaTimes } from 'react-icons/fa'; 
import { ShopContext } from "../../Context/ShopContext";

const CartItems = () => {
 const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((item, i) => (
        cartItems[item.id] !== 0 ? (
          <div key={i}>
            <div className="cartitems-format">
              <img src={item.image} alt="" className="carticon-product" />
              <p>{item.name}</p>
              <p>{item.new_price}</p>
              <button className="cartitems-quantity">{cartItems[item.id]}</button>
              <p>{item.new_price * cartItems[item.id]}</p>
             
               <button className="close-btn" onClick={() => removeFromCart(item.id)}>
      <FaTimes />
    </button>
            </div>
            <hr />
          </div>
        ) : null
      ))}
      <div className="cartItems-down">
        <div className="cartitems-total">
          <h2>Cart Totals</h2>
          <div className="cartitems-total-item">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cartitems-total-item">
            <p>Shipping Fee</p>
            <p>Free</p>
          </div>
          <hr />
          <div className="cartitems-total-item">
            <p>Total</p>
            <p>${getTotalCartAmount()}</p>
          </div>
        </div>
        <button>PROCEED TO CHECKOUT</button>
      </div>
    </div>
  );
};

export default CartItems;
