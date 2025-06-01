import React from "react";
import './Item.css';
import { Link } from "react-router-dom";
const Item = (props) => {
  return (
   <div className="item">
  <Link to={`/product/${props.id}`}>
    <div className="card" onClick={() => window.scrollTo(0, 0)}>
      {/* Front Face */}
      <div className="card-face front">
        <div className="front-content">
          <img src={props.image} alt="Artwork" />
          <p className="product-name">{props.name}</p>
          <div className="item-price-new">Price: ${props.new_price}</div>
        </div>
      </div>

      {/* Back Face */}
      <div className="card-face back">
        <p className="product-name-back">{props.name}</p>
      </div>
    </div>
  </Link>
</div>

  );
}
export default Item;