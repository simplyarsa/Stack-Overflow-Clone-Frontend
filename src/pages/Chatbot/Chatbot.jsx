import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import './Chatbot.css'
import axios, { all } from 'axios'
import Tile from './Tile';
import { flushSync } from 'react-dom';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Chatbot = () => {

    const bottomRef = useRef(null);
    const notInitialRender = useRef(false)

    const [questionBody, setQuestionBody] = useState('')
    const [status, setStatus] = useState(true)
    const [answerBody, setAnswerBody] = useState('How can i help you')

    const [allInfo, setallInfo] = useState([    ])

    const getData = async () => {
        try {
            const res = await axios.post('https://stack-overflow-clone-backend-uh8p.onrender.com/questions/chatbot', { questionBody })   
            const data=res.data.message.content
            setStatus(false)
            setAnswerBody(data)
            // setAnswerBody('this is answer')
    
        } catch (err) {
            console.log(err)
        }
    }

    const [check, setcheck] = useState(1)
    useEffect(() => {  
        setallInfo([...allInfo, { message: questionBody, desc: answerBody }])
        setQuestionBody('')
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });  
        if(check){
            setallInfo([])
            setcheck(0)
        }       
    }, [answerBody])


    const handleClick = () => {
        if (questionBody === '') {
            return
        }
        setStatus(true)
        getData()
    }

    const handleEnter =async (event) => {
        if (questionBody === '') {
            return
        }
        if (event.keyCode === 13) {
            setStatus(true)
            getData()
        }
    }
    

    return (<>
        <div class="ChatWindow">
            {allInfo.map((info) => (
                <Tile info={info} />
            ))}
            {status && <h3 style={{display: " flex", justifyContent: "center", alignContent: "center" }}>Loading...</h3>}
        <div ref={bottomRef} />
        </div>

        <div className='ChatInput is-hidey'>
          <input type="text"
            className='chatbotinput'
            onKeyDown={(e) => handleEnter(e)}
                placeholder="Enter your question..."
                value={questionBody}
                onChange={(e) => setQuestionBody(e.target.value)} />
            <button className='submitbutton' onClick={handleClick} ><FontAwesomeIcon icon={faPaperPlane} size={50} /></button>  
        </div>

    </>
    )
}

export default Chatbot