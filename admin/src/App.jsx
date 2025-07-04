import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Side from './components/Side/Side'
import { Routes,Route} from 'react-router-dom'
import Add from './components/pages/Add/Add'
import List from './components/pages/List/List'
import Orders from './components/pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url="https://food-delivery-1-vgsl.onrender.com"
  return (
    <div>
      <Navbar/>
      <hr/>
      <div className='app-content'> 
        <Side/>
        <Routes>
          <Route path='/add' element={<Add/>}/>
           <Route path='/list' element={<List/>}/>
            <Route path='/orders' element={<Orders/>}/>

        </Routes>
      </div>
        <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App
