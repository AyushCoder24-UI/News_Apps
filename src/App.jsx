import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Politics from './Components/Politics'
import Navbar from './Components/Navbar'
import Fashion from './Components/Fashion'
import Technology from './Components/Technology'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/politics' element={<Politics/>}/>
      <Route path='/fashion' element={<Fashion/>}/>
      <Route path='/technology' element={<Technology/>}/>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
