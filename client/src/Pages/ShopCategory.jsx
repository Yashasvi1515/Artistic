import React, { useContext, useState, useEffect } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [acrylicCollection, setAcrylicCollection] = useState([]);
  const [showNewCollection, setShowNewCollection] = useState(false);

  useEffect(() => {
    if (showNewCollection) {
      fetch(`http://localhost:4000/newcollection/${props.category.toLowerCase()}`)
        .then((response) => response.json())
        .then((data) => setAcrylicCollection(data))
        .catch((error) => console.error("Error fetching acrylic collection:", error));
    }
  }, [showNewCollection, props.category]);

  const displayedProducts = showNewCollection
    ? acrylicCollection.filter(item => item.category === props.category)
    : all_product.filter(item => item.category === props.category);

  return (
    <div className='shop-category'>
      <div className="shopcategory-indexSort">
        <div className="shopcategory-sort">
          Sort by 
        </div>
        <label>
          <input
            type="checkbox"
            checked={showNewCollection}
            onChange={() => setShowNewCollection(!showNewCollection)}
          /> New Collection
        </label>
        <span style={{ marginLeft: "1rem", fontWeight: "bold" }}>
          {showNewCollection ? "Showing: New Collection" : "Showing: All Products"}
        </span>
      </div>
      <div className="shopcategory-products">
        {displayedProducts.map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        ))}
      </div>
    </div>
  );
};

export default ShopCategory;