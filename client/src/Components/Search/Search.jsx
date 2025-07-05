import React, { useState } from 'react';
import axios from 'axios';
import './Search.css'; 
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faSearch } from '@fortawesome/free-solid-svg-icons';

const ProductSearch = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/products/search?query=${query}`);
      navigate('/search', { state: { results: response.data, notFound: false, query } });
    } catch (error) {
      if (error.response?.status === 404) {
        navigate('/search', { state: { results: [], notFound: true, query } });
      }
    }
  };

  return (
    <div className='search'>
      <input
        type="text"
        placeholder="Search product"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}><FontAwesomeIcon style={{backgroundColor:"#694F8E"}} icon={faSearch} /></button>
    </div>
  );
};

export default ProductSearch;
