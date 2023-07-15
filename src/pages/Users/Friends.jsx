import React from 'react'
import './Users.css'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import { useLocation } from 'react-router-dom'
import FriendsList from './FriendsList'

const Friends = () => {

  const location=useLocation()

  return (
    <div className='home-container-1'>
        <LeftSidebar />
        <div className='home-container-2' style={{marginTop: "2rem"}}>
                <h1 style={{fontWeight: "400"}}>Friends</h1>
                <FriendsList /> 
        </div>

    </div>
  )
}

export default Friends