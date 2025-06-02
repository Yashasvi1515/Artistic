import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import './WishlistItems.css';

const WishlistPage = () => {
  const { all_product, wishlistItems, removeFromWishlist } = useContext(ShopContext);

  const wishlistProducts = all_product.filter((product) =>
    wishlistItems.some(item => item._id === product._id)
  );

  return (
    <div className="wishlist-page">
      <h2>Your Wishlist</h2>
      <div className="grids">
      {wishlistProducts.length === 0 ? (
        <p>No items in your wishlist.</p>
      ) : (
  
        wishlistProducts.map((product) => (
          <div key={product._id} className="wishlist-item">
            <img src={product.image} alt={product.name} />
            <div className="wishlist-item-details">
              <h4>{product.name}</h4>
              <p>${product.new_price}</p>
              <button className="btn" onClick={() => removeFromWishlist(product._id)}>Remove</button>
            </div>
          </div>
        ))
      )}
      </div>
    </div>
  );
};

export default WishlistPage;
