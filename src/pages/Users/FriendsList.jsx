import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import User from './User'
import axios from 'axios'

const FriendsList = () => {
    const users=useSelector((state)=>state.usersReducer)

    const [friends, setFriends] = useState([])
    var currentUser = useSelector((state) => state.currentUserReducer)

    const getFriends = async () => {
        try {
            const friendList = await axios.get(`https://stack-overflow-clone-backend-uh8p.onrender.com/user/friends/${currentUser?.result?._id}`)
            setFriends(friendList.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFriends()
    }, [currentUser?.result._id])
    
  return (
    <div className='user-list-container'>
        {
            friends.map((user)=>(
                <User user={user} key={user?._id} />
            ))
        }
    </div>
  )
}

export default FriendsList