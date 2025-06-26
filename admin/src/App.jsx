import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Side from './components/Side/Side'
import { Routes,Route} from 'react-router-dom'
import Add from './components/pages/Add/Add'
import List from './components/pages/List/List'
import Orders from './components/pages/Orders/Orders'
const App = () => {
  const url="http://localhost:4000"
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
    </div>
  )
}

export default App
