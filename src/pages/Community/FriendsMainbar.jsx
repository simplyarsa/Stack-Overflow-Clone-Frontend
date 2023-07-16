import React, { useEffect ,useState } from 'react'
// import './HomeMainbar.css'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import QuestionList from '../../components/HomeMainbar/QuestionList'
import { useSelector } from 'react-redux'
import axios from 'axios'

const HomeMainbar = () => {

    const [questionsList, setQuestionsList] = useState(null)
    var currentUser=useSelector((state)=>state.currentUserReducer)

  const getAllFriendsQuestions = async () => {
    try {
        const res = await axios.get(`http://localhost:5000/questions/friendspost/${currentUser?.result?._id}`)
        setQuestionsList(res.data)
        
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    getAllFriendsQuestions()
  }, [currentUser])


  return (
    <div className='main-bar'>
      <div className='main-bar-header'>
        <h1>Friends Posts</h1>
      </div>
      <div>
        {
          questionsList===null? <h1>Loading...</h1> : 
          <>
               <p>{questionsList?.length} questions</p>
               <QuestionList questionsList={questionsList} />
               
          </>
        }
      </div>
    </div>
  )
}

export default HomeMainbar