import React, { useEffect, useState } from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import Avatar from '../../components/Avatar/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faPen } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import EditProfileForm from './EditProfileForm'
import ProfileBio from './ProfileBio'
import './UserProfile.css'
import axios from 'axios'
import { setCurrentUser } from '../../actions/currentUser'
import { faUserMinus } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

const UserProfile = () => {

    const { id } = useParams()
    const users = useSelector((state => state.usersReducer))
    const currentProfile = users.filter((user) => user._id === id)[0]
    const currentUser = useSelector((state) => state.currentUserReducer)
    const [Switch, setSwitch] = useState(false)

    const [followed, setFollowed] = useState(false)

    useEffect(() => {
        setFollowed(currentUser?.result.followings.includes(id))
    }, [currentUser?.result.followings, id])

    const handleFollow = async () => {
        try {
            if (followed) {
                axios.put(`https://stack-overflow-clone-backend-uh8p.onrender.com/user/unfollow/${id}`, { userId: currentUser?.result._id })
                currentUser.result.followings = currentUser.result.followings.filter((thisid) => thisid !== id)
                localStorage.setItem('Profile', JSON.stringify(currentUser))
            }
            else {
                axios.put(`https://stack-overflow-clone-backend-uh8p.onrender.com/user/follow/${id}`, { userId: currentUser?.result._id })
                currentUser.result.followings.push(id)
                localStorage.setItem('Profile', JSON.stringify(currentUser))
            }
        } catch (error) {
            console.log(error)
        }
        setFollowed(!followed)
    }

    return (
        <div className='home-container-1'>
            <LeftSidebar />
            <div className='home-container-2' >
                <section>
                    <div className='user-details-container'>
                        <div className='user-details'>
                            <Avatar backgroundColor="purple" color='white' fontSize='50px' px='40px' py='30px' >
                                {currentProfile?.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <div className='user-name'>
                                <h1>{currentProfile?.name}</h1>
                                <p><FontAwesomeIcon icon={faBirthdayCake} /> Joined {moment(currentProfile?.joinedOn).fromNow()} </p>
                            </div>
                        </div>
                        {
                            currentUser?.result._id === id ? (
                                <button type='button' onClick={() => setSwitch(true)} className='edit-profile-btn'  >
                                    <FontAwesomeIcon icon={faPen} /> Edit Profile
                                </button>
                            ) :
                                followed ? <button type='button' className='edit-profile-btn ask-btn' onClick={handleFollow} >
                                    <FontAwesomeIcon icon={faUserMinus} /> Remove Friend
                                </button> :
                                    <button type='button' className='edit-profile-btn ask-btn' onClick={handleFollow} >
                                        <FontAwesomeIcon icon={faUserPlus} /> Add Friend
                                    </button>
                                    
                        }
                    </div>
                    <>
                        {
                            Switch ? (
                                <EditProfileForm currentUser={currentUser} setSwitch={setSwitch} />
                            ) : (
                                <ProfileBio currentProfile={currentProfile} />
                            )
                        }
                    </>
                </section>

            </div>
        </div>
    )
}

export default UserProfile