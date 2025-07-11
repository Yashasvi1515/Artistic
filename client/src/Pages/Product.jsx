import React,{useContext} from "react";
import './CSS/Product.css';
import { ShopContext } from "../Context/ShopContext";
import Breadcrum from "../Components/Breadcrum/Breadcrum";
import { useParams } from "react-router-dom";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox.jsx/DescriptionBox";
const Product = () => {
    const {all_product} = useContext(ShopContext);
    const{productId}=useParams();
    const product = all_product.find((e) => e.id === parseInt(productId));
  return (
    <div >
     <Breadcrum product={product}/>
     <ProductDisplay product={product}/>
     <DescriptionBox product={product}/>
    </div>
  );
}
export default Product;