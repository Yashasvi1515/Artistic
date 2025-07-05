import React from "react";
import { useState, useEffect } from "react";
import './ProductDisplay.css';
//import star_icon from '../Assets/p1.jpg';
//import star_dull_icon from '../Assets/p1.jpg';
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

const ProductDisplay = ({product}) => {
    const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useContext(ShopContext);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    setWishlisted(isInWishlist(product._id));
  }, [isInWishlist, product._id]);

  const handleWishlistClick = () => {
    if (wishlisted) {
      removeFromWishlist(product._id);
      setWishlisted(false);
    } else {
      addToWishlist(product._id);
      setWishlisted(true);
    }
  };

    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
              
                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={product.image} alt="" />  
                    </div>
               
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                   <div style={{ color: '#FFD700', fontSize: '24px' }}>
      <FaStar />
      <FaStar />
      <FaStar />
      <FaStarHalfAlt />
      <FaRegStar />
    </div>
                    
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">
                       Old price: ${product.old_price}
                    </div>
                    
                    <div className="productdisplay-right-price-new">
                      New Price:  ${product.new_price}
                    </div>

                </div>
                <div className="productdisplay-right-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, sequi id vel eveniet voluptatum at sit natus laboriosam similique cum atque, repellat voluptates architecto? Nihil qui eligendi explicabo excepturi deserunt ad cupiditate et sit adipisci beatae magni nam, atque, commodi esse omnis consequatur vel suscipit natus quos. Pariatur, assumenda molestiae temporibus commodi aspernatur excepturi quia esse asperiores sapiente officia hic, reprehenderit repellendus aliquam porro suscipit beatae. Voluptate laudantium excepturi voluptatem id atque obcaecati exercitationem placeat laborum harum beatae ducimus recusandae aliquam asperiores veritatis omnis, quisquam et nemo minus fuga incidunt dolorem saepe, velit quos? Fugit nobis ad nisi nulla iure.
                </div>
                
             <button onClick={handleWishlistClick}>
      {wishlisted ? 'Remove from Wishlist ❤️' : 'Add to Wishlist 🤍'}
    </button>
                <button className="add-to-cart-btn" onClick={()=>addToCart(product.id)}>Add to cart</button>
            </div>
        </div>
    );
}
export default ProductDisplay;