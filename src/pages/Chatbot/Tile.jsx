import React from 'react'
import './Chatbot.css'
import Avatar from '../../components/Avatar/Avatar'
import { useSelector } from 'react-redux'

const Tile = ({ info }) => {
    const User=useSelector((state)=>state.currentUserReducer)

    return (
        <>  
            <div class="ChatItem ChatItem--customer">
                <div class="ChatItem-meta">
                    <div class="ChatItem-avatar">
                    <Avatar 
                    backgroundColor="#009dff"
                px="10px"
                py="7px"
                borderRadius="50%"
                color="white"
              >       
                  {User.result.name.charAt(0).toUpperCase()}
               
              </Avatar> 
                        <img class="ChatItem-avatarImage" src="" />
                    </div>
                </div>
                <div class="ChatItem-chatContent">
                    <div class="ChatItem-chatText">{info.message}</div>
                    <div class="ChatItem-timeStamp"><strong>You</strong></div>
                </div>
            </div>

            <div class="ChatItem ChatItem--expert">
                <div class="ChatItem-meta">
                    <div class="ChatItem-avatar">
                        <img class="ChatItem-avatarImage" src="https://image.ibb.co/eTiXWa/avatarrobot.png" />
                    </div>
                </div>
                <div class="ChatItem-chatContent">
                    <div class="ChatItem-chatText">{info.desc}</div>
                    <div class="ChatItem-timeStamp"><strong>Chatbot</strong></div>
                </div>
            </div>
            </>
    )
}

export default Tile