

import React from 'react';
import { useLocation } from 'react-router-dom';
import Item from '../Components/Item/Item';

const SearchPage = () => {
  const location = useLocation();
  const { results, notFound, query } = location.state || {};

  return (
    <div>
      <h2>Search results for "{query}"</h2>

      {notFound ? (
        <p>No products found.</p>
      ) : (
      <div className="shopcategory-products">
          {results.map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        ))}
       </div>
      )}
    </div>
  );
};

export default SearchPage;
