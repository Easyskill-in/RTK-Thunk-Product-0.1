import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import About from './About'
import DashBoard from './DashBorad'
import Profile from './Profile'
import './App.css'

import Test from './Test'
import Product from './Components/Product'
import All from './Components/All'
import Add from './Components/Add'
import SingleProduct from './Components/SingleProduct'

const App = () => {

  localStorage.setItem("IsLogin", JSON.stringify(false))

  return (
    <div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Product' element={<Product />} >
          <Route path='all' element={<All />} />
          <Route path='add' element={<Add />} />
          <Route path=':id' element={<SingleProduct />} />
        </Route>


        {/* <Route path='/about' element={
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        } /> */}


        {/* <Route element={<Test />} >
          <Route path='/profile' element={<Profile />} />
          <Route path='/about' element={<About />} />
        </Route>

        <Route path='/dashBoard' element={<DashBoard />} >
          <Route path='profile' element={<Profile />} />
          <Route path='about' element={
            <About />
          } />
        </Route> */}


      </Routes>

    </div>
  )
}



export default App
