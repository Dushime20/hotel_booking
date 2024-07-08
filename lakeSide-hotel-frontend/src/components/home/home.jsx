import React from 'react'
import MainHeader from '../layout/MainHeader'
import HotelsService from '../common/HotelsService'
import Parallax from '../common/Parallax'
import RoomCarouserl from '../common/RoomCarouserl'

const Home = () => {
  return (
    <section>
      <MainHeader/>
      <section className='container'>
        <RoomCarouserl/>
        <Parallax/>
        <HotelsService/>
        <Parallax/>
        <RoomCarouserl/>
        
        
      </section>
    </section>
  )
}

export default Home
