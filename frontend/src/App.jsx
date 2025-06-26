import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Placeorder from './pages/Placeorder/Placeorder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/Verify/Verify';
import Myorders from './pages/Myorders/Myorders';
import { ToastContainer } from 'react-toastify';
const App = () => {
  const [ShowLogin,SetShowLogin]=useState(false)
  return (
    <>
    {ShowLogin?<LoginPopup SetShowLogin={SetShowLogin}/>:<></>}
      <div className='app'>
        <Navbar SetShowLogin={SetShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Placeorder />} />
          <Route path='/verify' element={<Verify />} />
           <Route path='/myorders' element={<Myorders />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default App;
