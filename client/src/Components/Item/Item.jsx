import React from "react";
import './Item.css';
import { Link } from "react-router-dom";
const Item = (props) => {
  return (
    <div className="item">
   <Link to={`/product/${props.id}`}> <div className="card" onClick={window.scrollTo(0,0)}>
    <div className="card-face front">
     <img src= {props.image} alt="Artwork"/>
      <div className="item-prices">
        <div className="item-price-new">
            ${props.new_price}
        </div>
        <div className="item-price-old">
            ${props.old_price}
        </div>
    </div>
    </div>
    <div clasName="card-face back">
      <p>{props.name}</p>
     <p>{props.name}</p>
    </div>
  </div></Link>
    </div>
  );
}
export default Item;