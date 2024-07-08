import { useState } from 'react'
import React from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"

import './App.css'
import AddRoom from './components/room/AddRoom.jsx'
import ExistingRooms from './components/room/ExistingRooms.jsx'
import Home from './components/home/home.jsx';
import EditRoom from './components/room/EditRoom.jsx';
import NavBar from './components/layout/NavBar.jsx';
import Footer from './components/layout/Footer.jsx';
import RoomListing from './components/room/RoomListing.jsx';
import Admin from './components/admin/Admin.jsx';
import Checkout from './components/bookings/Checkout.jsx';
import BookingSuccess from './components/bookings/BookingSuccess.jsx';

function App() {
  

  return (
    <>
    <main>
      <Router>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/existing-rooms' element={<ExistingRooms/>} />
          <Route path='/edit-room/:roomId' element={<EditRoom/>} />
          <Route path='/add-rooms' element={<AddRoom/>} />
          <Route path='/browse-all-rooms' element={<RoomListing/>} />
          <Route path='/admin' element={<Admin/>} />
          <Route path='/book-room/:roomId' element={<Checkout/>} />
          <Route path='/booking-success' element={<BookingSuccess/>} />
        </Routes>
      </Router>
      <Footer/>
    </main>
    </>
    

  )
}

export default App