import React, { useState, useEffect } from 'react'
import pen from "../../assets/pen-solid.svg";
import comment from "../../assets/comment-alt-solid.svg";
import blackLogo from "../../assets/blacklogo.svg";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Avatar from '../../components/Avatar/Avatar';

const FriendsSidebar = () => {

    const [friends, setFriends] = useState([])
    var currentUser = useSelector((state) => state.currentUserReducer)

    const getFriends = async () => {
        try {
            const friendList = await axios.get(`http://localhost:5000/user/friends/${currentUser?.result?._id}`)
            setFriends(friendList.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFriends()
    }, [currentUser?.result._id])

    return (
        <aside className='right-sidebar' style={{ width: "20%" }}>
            <div className="widget">
                <h4>Friends</h4>
                {
                    friends.map((user) => (
                        <div className="right-sidebar-div-1">
                            <div className="right-sidebar-div-2" >
                                <Avatar backgroundColor="#009dff"
                                    px="10px"
                                    py="7px"
                                    borderRadius="50%"
                                    color="white" 
                                >
                                {user?.name[0].toUpperCase()} 
                                </Avatar >
                                    <p style={{ fontWeight: "bold", fontSize: "18px", }}>
                                        <Link to={`/Users/${user._id}`} >{user?.name}</Link>
                                    </p>
                            </div>
                        </div>
                    ))
                }

            </div>
        </aside>
    )
}

export default FriendsSidebar