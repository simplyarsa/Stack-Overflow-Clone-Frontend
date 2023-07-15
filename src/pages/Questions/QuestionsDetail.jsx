import React, { useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import upvote from '../../assets/sort-up.svg'
import downvote from '../../assets/sort-down.svg'
import './Questions.css'
import Avatar from '../../components/Avatar/Avatar'
import DisplayAnswer from './DisplayAnswer'
import { useDispatch, useSelector } from 'react-redux'
import { postAnswer, deleteQuestion, voteQuestion } from '../../actions/question'
import moment from 'moment'
import copy from 'copy-to-clipboard'

const QuestionsDetail = () => {

    const { id } = useParams();
    const questionsList = useSelector((state) => state.questionsReducer);
    
    const [answer, setAnswer] = useState('')
    const User = useSelector((state) => state.currentUserReducer)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handlePostAns = (e, answerLength) => {
        e.preventDefault();
        console.log(answer, answerLength)
        if (User === null) {
            alert('Login or Signup to post your answer')
            navigate('/Auth')
        }
        else {
            if (answer === '') {
                alert('Enter an answer before submitting')
            }
            else {
                dispatch(postAnswer({ id, noOfAnswers: answerLength + 1, answerBody: answer, userAnswered: User.result.name, userId: User.result._id }))
            }
        }
    }

    const location = useLocation()
    const url = 'http://localhost:3000'
    const handleShare = () => {
        copy(url + location.pathname)
        alert('Copied url:' + url + location.pathname)
    }

    const handleDelete = () => {
        dispatch(deleteQuestion(id, navigate))
    }

    const handleUpvote = () => {
        dispatch(voteQuestion(id, 'upvote', User.result._id))
    }

    const handleDownvote = () => {
        dispatch(voteQuestion(id, 'downvote', User.result._id))
    }


    return (
        <div className='question-details-page'>
            {
                questionsList.data === null ? <h1>Loading...</h1> : (
                    <>
                        {questionsList.data.filter(question => question._id === id).map((question) => (<>
                            <div key={question._id}>
                                <section className='question-details-container'>
                                    <h1>{question.questionTitle}</h1>
                                    <div className='question-details-container-2'>
                                        <div className='question-votes'>
                                            <img src={upvote} alt="" width='18' className='votes-icon' onClick={handleUpvote} />
                                            <p>{question.upVote.length - question.downVote.length}</p>
                                            <img src={downvote} alt="" width='18' className='votes-icon' onClick={handleDownvote} />
                                        </div>

                                        <div style={{ width: "100%" }} >
                                            <p className='question-body'>{question.questionBody}</p>
                                            {question.img?.includes('mp4') ?
                                                <video controls >
                                                    <source src={question.img} type="video/mp4" />
                                                </video> :
                                                <img src={question.img} alt="" width='100%' />
                                            }
                                            <div className='question-details-tags'>
                                                {
                                                    question.questionTags.map((tag) => (
                                                        <p key={tag}>{tag}</p>
                                                    ))
                                                }
                                            </div>
                                            <div className='question-actions-user'>
                                                <div>

                                                    <button type='button' onClick={handleShare} >Share</button>
                                            
                                                    {   
                                                        
                                                        User && User?.result?._id === question.userId && (
                                                            <button type="button" onClick={handleDelete} >Delete</button>
                                                        )
                                                    }
                                                </div>
                                                <div>
                                                    <p>asked {moment(question.askedOn).fromNow()}</p>
                                                    <Link to={`/Users/${question.userId}`} className='user-link' style={{ color: "#0086d8" }}>
                                                        <Avatar
                                                            backgroundColor="orange"
                                                            px="10px"
                                                            py="7px"
                                                            borderRadius="4px"
                                                            color="white"
                                                        >
                                                            {question.userPosted.charAt(0).toUpperCase()}
                                                        </Avatar>
                                                        <div>
                                                            {question.userPosted}
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div >
                                    </div>
                                </section>
                                {
                                    question.noOfAnswers !== 0 && (
                                        <section>
                                            <h3>{question.noOfAnswers} answers</h3>
                                            <DisplayAnswer key={question._id} question={question} handleShare={handleShare} />
                                        </section>
                                    )
                                }
                                <section className='post-ans-container'>
                                    <h3>Your Answer</h3>
                                    <form onSubmit={(e) => handlePostAns(e, question.answer.length)}>

                                        <textarea name="" id="" cols="30" rows="10"
                                            onChange={e => setAnswer(e.target.value)} ></textarea><br />
                                        <input type="Submit" className='post-ans-btn' value='Post Your Answer' />
                                    </form>
                                    <p>
                                        Browse other question tagged
                                        {
                                            question.questionTags.map((tag) => (
                                                <Link to={'/Tags'} key={tag} className='ans-tags'>
                                                    {" "}{tag}{" "}
                                                </Link>
                                            ))
                                        }
                                    </p>
                                </section>
                            </div>
                        </>

                        ))}
                    </>
                )}
        </div >
    )
}

export default QuestionsDetail