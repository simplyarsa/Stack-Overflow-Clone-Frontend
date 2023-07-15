import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import HomeMainbar from '../../components/HomeMainbar/HomeMainbar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import '../../App.css'
import SocialMainbar from './SocialMainbar'

const Social = () => {
  return (
    <div className='home-container-1'>
       <LeftSidebar />
      <div className='home-container-2'>
        <SocialMainbar />
        <RightSidebar />
      </div>
    </div>
  )
}

export default Social