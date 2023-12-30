
import './App.css';
import Home from './Pages/Home';

import Products from './Pages/Products';
import Listing from './Pages/Listing';
import {Route, Routes } from 'react-router-dom';
import ProductbyID from './Pages/ProductbyID';

function App() {
  return (
    <div>
   
    <Routes>
      <Route path={'/'} element={<Home/>} />      
      <Route path={'/products'} element={<Products/>} />   
       {/* path parameter */}
      <Route path={'/products/:id'} element={<ProductbyID/>} />     
      <Route path={'/listing'} element={<Listing/>} />      

    </Routes>
 
    </div>
  );
}

export default App;
