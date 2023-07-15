import React, { useEffect ,useState } from 'react'
import './HomeMainbar.css'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import QuestionList from './QuestionList'
import { useSelector } from 'react-redux'
import axios from 'axios'

const HomeMainbar = () => {

  const location = useLocation()
  const navigate=useNavigate();

  const questionsList = useSelector((state) => state.questionsReducer);
  const user=useSelector((state)=>state.currentUserReducer);

  const [status,setStatus]=useState(false)
  const [message,setMessage]=useState("")

  useEffect(() => {
    checkSubscription()
  }, [])

  const checkSubscription=async ()=>{
    try {
      const res=await axios.get(`https://stack-overflow-clone-backend-uh8p.onrender.com/subscription/check/${user?.result._id}`)
      setStatus(res.data.success)
      setMessage(res.data.message)
    } catch (error) {
      console.log(error)
    }
  }

  const checkAuth=async ()=>{
    if(user===null){
      alert("Login or signup to ask question")
      navigate('/Auth')
    }
    else{
      if(status){
        navigate('/AskQuestion')
      }
      else{
        alert(message)
        navigate('/Subscription')
      }
    }
  }

  return (
    <div className='main-bar'>
      <div className='main-bar-header'>
          {
            location.pathname === '/' ? <h1>Top Questions</h1> : <h1>All Questions</h1>
          }
          <button onClick={checkAuth} className='ask-btn'>Ask Question</button>
      </div>
      <div>
        {
          questionsList.data===null? <h1>Loading...</h1> : 
          <>
               <p>{questionsList.data.length} questions</p>
               <QuestionList questionsList={questionsList.data} />
               
          </>
        }
      </div>
    </div>
  )
}

export default HomeMainbar