import React, { useEffect, useState } from 'react'
import './feed.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
// import QuestionList from './QuestionList'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Post from './Post'
import Share from './Share'

const SocialMainbar = () => {

    const [Posts, setPosts] = useState(null)

    const [state, setState] = useState(false)
    const changeState=()=>{
        setState(!state)
    }

    const currentUser = useSelector((state) => state.currentUserReducer)

    const getAllFriendsQuestions = async () => {
        try {
            const res = await axios.get(`https://stack-overflow-clone-backend-uh8p.onrender.com/questions/friendspost/${currentUser?.result?._id}`)
            setPosts(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        getAllFriendsQuestions()
    }, [currentUser, state])

    return (
        <div className="feed main-bar">
            <div className='main-bar-header'>
                <h1>Social</h1>
            </div>
            {
                currentUser === null ? <h1>Login to see Posts</h1> :
            <div className="feedWrapper">
                <Share changeState={changeState} state={state} />

                {Posts && Posts.length!==0 ?  Posts.map((p) => (
                    <Post key={p.id} question={p} changeState={changeState} state={state}  />
                )): <h3>Add Friends to get Posts</h3>}
            </div>
            }
        </div>
    )
}

export default SocialMainbar