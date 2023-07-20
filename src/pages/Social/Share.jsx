import "./share.css";
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { askQuestion } from '../../actions/question';
import axios from 'axios';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';
import Avatar from "../../components/Avatar/Avatar";

export default function Share({state, changeState}) {

  const [questionTitle, setQuestionTitle] = useState('')
  const [questionBody, setQuestionBody] = useState('')
  const [questionTags, setQuestionTags] = useState('')
  const [file, setFile] = useState(null)
  const [fname, setFname] = useState('')

  const [status, setStatus] = useState(true)
  const [message, setMessage] = useState("")

  const dispatch = useDispatch()
  const User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();

  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

  const handleUpload = (e) => {
    e.preventDefault()

    if (!checkAuth()) return
    if (questionBody==='') return

    const storage = getStorage(app);

    if (!file) {
      dispatch(askQuestion({ questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User?.result?._id, type: "S" }))
      setFile(null)
      setFname('')
      setQuestionBody('')
      changeState(!state)
      return
    }
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `files/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          dispatch(askQuestion({ questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User?.result?._id, img: downloadURL, type: "S" }, navigate))
        });
        setFile(null)
        setFname('')
        setQuestionBody('')
        changeState(!state)
      }
    );
  }

  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();

  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFname(e.target.files[0].name)
  }

  // useEffect(() => {
  //   checkSubscription()
  // }, [])

  // const checkSubscription = async () => {
  //   try {
  //     if (User) {
  //       const res = await axios.get(`https://stack-overflow-clone-backend-uh8p.onrender.com/subscription/check/${User?.result._id}`)
  //       setStatus(res.data.success)
  //       setMessage(res.data.message)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const checkAuth = () => {
    if (User === null) {
      alert("Login or signup to ask question")
      navigate('/Auth')
      return 0
    }
    else {
      if (status) {
        return 1
      }
      else {
        alert(message)
        navigate('/Subscription')
        return 0
      }
    }
  }


  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
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
              {User.result.name.charAt(0).toUpperCase()}
            </Link>
          </Avatar>
          <div style={{margin: "10px"}}></div>
          <textarea
            value={questionBody}
            placeholder="Your Post"
            className="shareInput"
            onChange={(e) => setQuestionBody(e.target.value)}
          />

        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <span className="shareOptionText">
                <input
                  style={{ display: 'none' }}
                  ref={inputRef}
                  type="file"
                  accept="video/mp4,video/x-m4v,video/*, .png,.jpeg,.jpg"
                  onChange={handleFileChange}
                />

                <button className="shareButton" onClick={handleClick}>Upload Photo or Video</button>
                {fname}
              </span>
            </div>
          </div>
          <button className="shareButton" onClick={handleUpload}>Share</button>
        </div>
      </div>
    </div>
  );
}