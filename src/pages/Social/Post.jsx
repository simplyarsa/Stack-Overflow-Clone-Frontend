import "./post.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import copy from 'copy-to-clipboard'
import Avatar from '../../components/Avatar/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { postAnswer, deleteQuestion, voteQuestion } from '../../actions/question'
import moment from 'moment'
import { useNavigate, useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

export default function Post({ question , state, changeState}) {

    const User = useSelector((state) => state.currentUserReducer)

    const id = question._id
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const location = useLocation()
    const url = 'http://localhost:3000'

    const handleDelete = () => {
        dispatch(deleteQuestion(id, navigate))
        changeState(!state)
    }

    const handleUpvote = () => {
        dispatch(voteQuestion(id, 'upvote', User.result._id))
        changeState(!state)
    }

    const handleDownvote = () => {
        dispatch(voteQuestion(id, 'downvote', User.result._id))
        changeState(!state)
    }

    const [likeColor, setLikeColor] = useState("grey")
    const [dislikeColor, setDislikeColor] = useState("grey")

    const checkLike = () => {
        if (question.upVote.includes(User.result._id)) setLikeColor("red")
        if (question.downVote.includes(User.result._id)) setDislikeColor("red")
    }

    useEffect(() => {
        checkLike()
    }, [state])

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Avatar
                            backgroundColor="#009dff"
                            px="10px"
                            py="7px"
                            borderRadius="50%"
                            color="white"
                        >
                            <Link
                                to={`/Users/${User?.result?._id}`}
                                style={{ color: "white", textDecoration: "none" }}
                            >
                                {question.userPosted.charAt(0).toUpperCase()}
                            </Link>
                        </Avatar>
                        {/* <img
                            className="postProfileImg"
                            src="https://image.ibb.co/eTiXWa/avatarrobot.png"
                            alt=""
                        /> */}
                        <span className="postUsername">
                            <Link to={`/Users/${question.userId}`} className='user-link' style={{ color: "#0086d8" }}>
                                {question.userPosted}
                            </Link>
                        </span>
                        <span className="postDate">{moment(question.askedOn).fromNow()}</span>
                    </div>
                    <div className="postTopRight">
                    </div>
                </div>
                <div className="postCenter" >
                    <p className='question-body'>{question.questionBody}</p>
                    {question.img?.includes('mp4') ?
                        <video className="postImg" controls >
                            <source src={question.img} type="video/mp4" />
                        </video> :
                        <img className="postImg" src={question.img} alt="" />
                    }
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <FontAwesomeIcon style={{ color: likeColor }} icon={faThumbsUp} size={18} className='votes-icon' onClick={handleUpvote} />
                        <span style={{ width: "20px" }}></span>
                        <FontAwesomeIcon style={{ color: dislikeColor }} icon={faThumbsDown} className='votes-icon' onClick={handleDownvote} />
                        <span style={{ width: "20px" }}></span>
                        <h4 className="postLikeCounter">{question.upVote.length - question.downVote.length} Likes</h4>
                    </div>
                    <div className="postBottomRight">
                        {

                            User && User?.result?._id === question.userId && (
                                <button type="button" className="deletebutton" onClick={handleDelete} >Delete</button>
                            )
                        }
                        {/* <span className="postCommentText">{question.noOfAnswers} comments</span> */}
                    </div>
                </div>
            </div>
        </div>
    );
}