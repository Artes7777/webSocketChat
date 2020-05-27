import React from 'react';
import './Message.css';

export const Message = ({state, message, userName}) => {
  return (
    <div className = {state.userName === userName ? 'myMessage' : "friendsMessage"} >
      <div className = {state.userName === userName ? 'message' : "notMymessage"}>{message}</div>
    </div>
  )
}