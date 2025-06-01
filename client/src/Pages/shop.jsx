import React from "react";
import "./CSS/Shop.css";
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import NewCollections from "../Components/NewCollections/NewCollections";
import NewsLetter from "../Components/NewsLetter/NewsLetter";

const Shop = () => {
  return (
    <div className="shop">
     <Hero/>
     <Popular/>
     <NewCollections/>
     <NewsLetter/>
    </div>
  );    
}   
export default Shop;