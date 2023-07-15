import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AskQuestion.css'
import { useDispatch, useSelector } from 'react-redux';
import { askQuestion } from '../../actions/question';
import axios from 'axios';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';

const AskQuestion = () => {

  const [questionTitle, setQuestionTitle] = useState('')
  const [questionBody, setQuestionBody] = useState('')
  const [questionTags, setQuestionTags] = useState('')
  const [file, setFile] = useState(null)

  const dispatch = useDispatch()
  const User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();

  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

  const handleUpload = (e) => {
    e.preventDefault()
    if(questionTitle==='' || questionBody==='' || questionTags===''){
      alert("Please fill all the fields")
    }
    const storage = getStorage(app);

    if (!file) {
      dispatch(askQuestion({ questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User?.result?._id }, navigate))
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
          dispatch(askQuestion({ questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User?.result?._id, img: downloadURL }, navigate))
        });
      }
    );
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      setQuestionBody(questionBody + '\n')
    }
  }

  return (
    <div className='ask-question'>
      <div className='ask-ques-container'>
        <h1>Ask a public Question</h1>
        <form onSubmit={handleUpload}>
          <div className='ask-form-container'>
            <label htmlFor='ask-ques-title'>
              <h4>Title</h4>
              <p>Ask question</p>
              <input type='text' id='ask-ques-title' placeholder='Enter your question title'
                onChange={(e) => setQuestionTitle(e.target.value)}
              />
            </label>
            <label htmlFor='ask-ques-body'>
              <h4>Body</h4>
              <p>Include all the information someone would need to answer your question</p>
              <textarea cols="30" rows="10" id='ask-ques-body' placeholder='Enter your question title' onChange={(e) => setQuestionBody(e.target.value)} onKeyPress={handleEnter} />
            </label>
            <input
            
              type="file"
              id="file"
              accept="video/mp4,video/x-m4v,video/*, .png,.jpeg,.jpg"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor='ask-ques-tags'>
              <h4>tags</h4>
              <p>Add upto 5 tages to describe what your question is about</p>
              <input type='text' id='ask-ques-tags' placeholder='Enter your question title'
                onChange={(e) => setQuestionTags(e.target.value.split(' '))}
              />
            </label>
          </div>
          <input type='submit' value='Post your question' className="review-btn" />
        </form>
      </div>
    </div>
  )
}

export default AskQuestion