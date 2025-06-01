import React from "react";  
import './Breadcrum.css';
//import arrow_icon from '../Assets/p1.jpg';
import {FaChevronRight} from 'react-icons/fa';
const Breadcrum = ({product}) => {
    return (
        <div className="breadcrum">
            HOME <FaChevronRight/> SHOP <FaChevronRight/> {product.category} <FaChevronRight/> {product.name}
        </div>
    );
}
export default Breadcrum;