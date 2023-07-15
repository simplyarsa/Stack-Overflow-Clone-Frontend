import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Auth from './pages/Auth/Auth'
import Questions from './pages/Questions/Questions'
import AskQuestion from './pages/AskQuestions/AskQuestion'
import DisplayQuestion from './pages/Questions/DisplayQuestion'
import Tags from './pages/Tags/Tags'
import Users from './pages/Users/Users'
import UserProfile from './pages/UserProfile/UserProfile'
import Community from './pages/Community/Community'
import Subscription from './pages/Subscription/Subscription'
import OtpVerify from './pages/Chatbot/OtpVerify'
import FriendsList from './pages/Users/FriendsList'
import Friends from './pages/Users/Friends'
import Social from './pages/Social/Social'


const AllRoutes = () => {
  return (
    <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/Auth' element={<Auth />} />
        <Route path='/Questions' element={<Questions />} />
        <Route path='/AskQuestion' element={<AskQuestion />} />
        <Route path='/Question/:id' element={<DisplayQuestion />} />
        <Route path='/Tags' element={<Tags />} />
        <Route path='/Users' element={<Users />} />
        <Route path='/Users/:id' element={<UserProfile />} />
        <Route path='/Chatbot' element={<OtpVerify />} />
        <Route path='/Subscription' element={<Subscription />} />
        <Route path='/Friends' element={<Friends />} />
        <Route path='/Social' element={<Social />} />

    </Routes>
  )
}

export default AllRoutes