import React, {useEffect, createContext, useState} from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i <= 300+1; i++) {
    cart[i] = 0;
  }
  return cart;
};

const ShopContextProvider = ({ children }) => {
  const [all_product,setAll_Product]=useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(()=>{
fetch('http://localhost:4000/allproducts')
.then((response)=>response.json())
.then((data)=>setAll_Product(data))

if(localStorage.getItem('auth-token')){
  fetch('http://localhost:4000/getcart',{
     method:'POST',
        headers:{
          Accept:'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'content-Type':'application/json',

        },
        body:""
    })
    .then((response)=>response.json())
    .then((data)=>setCartItems(data));
    }
  },[])

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if(localStorage.getItem('auth-token')){
      fetch('http://localhost:4000/addtocart',{
        method:'POST',
        headers:{
          Accept:'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'content-Type':'application/json',

        },
        body:JSON.stringify({"itemId":itemId})
    })
    .then((response)=>response.json())
    .then((data)=>console.log(data));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) }));
   if(localStorage.getItem('auth-token')){
      fetch('http://localhost:4000/removefromcart',{
        method:'POST',
        headers:{
          Accept:'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'content-Type':'application/json',

        },
        body:JSON.stringify({"itemId":itemId})
    })
    .then((response)=>response.json())
    .then((data)=>console.log(data));
    }
  };

  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((total, key) => {
      const item = all_product.find((p) => p.id === Number(key));
      return total + cartItems[key] * (item?.new_price || 0);
    }, 0);
  };

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((a, b) => a + b, 0);
  };

  const contextValue = {
    all_product,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
