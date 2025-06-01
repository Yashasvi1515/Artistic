import React, { useState,useEffect } from "react";
import './Popular.css'; 
import Item from "../Item/Item";
import brushes from "../Assets/pink9.png";

const Popular = () => {
  const [popularProducts,setPopularProducts]=useState([]);
useEffect(()=>{
fetch('http://localhost:4000/popular')
.then((response)=>response.json())
.then((data)=>setPopularProducts(data));
},[])
const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 // Scroll-based transformations
  const xTranslate = Math.sin(scrollY * 0.01) * 50;  // Oscillating X movement
  const yTranslate = Math.cos(scrollY * 0.01) * 20;  // Oscillating Y movement
  const rotation = scrollY * 0.5;
  return (
    <div className="popular">
      <div className="ball-wrapper2">
          <img src={brushes} alt="" className="ball-half-visible"  style={{
            transform: `translate(${xTranslate}px, ${yTranslate}px) rotate(${rotation}deg)`
          }}/>
        </div>
        <h1>Popular Artworks</h1>
        <hr/>
        <div className="popular-item">
         {popularProducts.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
         })}
        </div>
    
    </div>
  );
}
export default Popular;