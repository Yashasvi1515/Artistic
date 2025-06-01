import React, { useEffect, useState } from "react";  
import './NewCollections.css';
import Item from "../Item/Item";
import ball from "../Assets/pink8.png"; 

const NewCollections = () => {
const [new_collection,setNew_collecton]=useState([]);
useEffect(()=>{
fetch('http://localhost:4000/newcollection')
.then((response)=>response.json())
.then((data)=>setNew_collecton(data));
},[])
const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const rotation = scrollY * 0.2; 
  return (
    <div className="new-collections">
     <div className="ball-wrapper">
    <img src={ball} alt="" className="ball-half-visible"  style={{ transform: `rotate(${rotation}deg)` }}/>
  </div>
      <h1>New Collections</h1>
      <hr />
      <div className="collections">
       {
        new_collection.map((item, i) => {
        return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })
       }
      </div>
    </div>
  );
}
export default NewCollections;