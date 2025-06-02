
import './App.css';

import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Shop from './Pages/shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/loginSignup';
import Footer from './Components/Footer/Footer';
import image1 from './Components/Assets/p1.jpg';
import Wishlist from './Pages/Wishlist';


function App() {
  return (
    <div >
  <BrowserRouter>
<Navbar/>
<Routes>
  <Route path="/" element={<Shop/>} />
  <Route path="/acrylic" element={<ShopCategory bannner={image1} category="acrylic"/>} />
  <Route path="/charcoal"element={<ShopCategory bannner={image1} category="charcoal"/>} />
  <Route path="/digital" element={<ShopCategory bannner={image1} category="digital"/>} />
  <Route path="/handmade" element={<ShopCategory bannner={image1} category="handmade"/>} />

  <Route path="/product" element={<Product/>}>
  <Route path=':productId' element={<Product/>} />
  </Route>
  
   <Route path="/cart" element={<Cart/>} />
   <Route path="/wishlist" element={<Wishlist/>} />

   <Route path="/Login" element={<LoginSignup/>} />

  </Routes>
  <Footer/>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
