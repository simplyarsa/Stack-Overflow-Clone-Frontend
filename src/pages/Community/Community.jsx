import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import UsersList from '../Users/UsersList'
import Friends from './Friends'
import FriendsMainbar from './FriendsMainbar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import FriendsSidebar from './FriendsSidebar'

const Community = () => {
  return (
    <div className='home-container-1'>
        <LeftSidebar />
        <div className='home-container-2'>
                {/* <Friends />  */}
                <FriendsMainbar />
                <FriendsSidebar />
        </div>

    </div>
  )
}

export default Community