import React,{ useState,useEffect } from "react";
import './ListProduct.css';
import cross_icon from '../../assets/product4.jpg';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const fetchInfo= async () => {
    await fetch("http://localhost:4000/allproducts")
      .then((resp) => resp.json())
      .then((data) => {
        setAllProducts(data);
      });
  };

  useEffect(()=>{
    fetchInfo();
  },[])

  const removeProduct=async(id)=>{
    await fetch("http://localhost:4000/removeproduct",{
      method: "POST",
      headers:{
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({id:id})
  })
  await fetchInfo();
  }
  return (
    <div className="list-product">
      <h1>All Products List</h1>
      <div className="format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category </p>
        <p>Remove</p>
      </div>
      <div className="allproducts">
        <hr />
        {allproducts.map((product, index) => {
           return <><div key={index} className="format-main listproduct">
           <img style={{width:"100px"}} src={product.image} alt="" className="listproduct-product" />
           <p>{product.name}</p>
           <p>${product.old_price}</p>
           <p>${product.new_price}</p>
           <p>{product.category}</p>
           <img style={{width:"30px"}} onClick={()=>removeProduct(product.id)}  src={cross_icon} alt="" className="remove-icon" />
           </div>
           <hr />
           </>
        })}
      </div>
    </div>
  );
}
export default ListProduct;