import React from "react";
import './Popular.css'; 
import data from '../Assets/data';
import Item from "../Item/Item";

const Popular = () => {
  return (
    <div className="popular">
        <h1>Popular Artworks</h1>
        <hr/>
        <div className="popular-item">
         {data.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
         })}
          <div className="product-card">
            <img src="path/to/image.jpg" alt="Product" />
            <h3>Product Name</h3>
            <p>$Price</p>
          </div>
        </div>
    
    </div>
  );
}
export default Popular;