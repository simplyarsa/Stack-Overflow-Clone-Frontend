import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import User from './User'
import axios from 'axios'

const UsersList = () => {
  const users=useSelector((state)=>state.usersReducer)

  return (
    <div className='user-list-container'>
        {
            users.map((user)=>(
                <User user={user} key={user?._id} />
            ))
        }
    </div>
  )
}

export default UsersList