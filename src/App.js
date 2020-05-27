import React, { useEffect } from 'react';
import './App.css';
import {socket} from './socket';
import axios from 'axios';
import {Joinblock} from './Joinblock';
import {Chat} from './Chat';
import {reducer, initialState, joinToRoom, setUsers, setRoomId, setUserName, writeMessage, setMessages, cleanInput} from './state';

const App = () =>  {

  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect( () => {
    socket.on("ROOM:JOINED", (user) => {
      console.log(`Пользователь ${user} зашел`);
    });
    socket.on("ROOM:LEAVED", (user) => {
      console.log(`Пользователь ${user} вышел`);
    });
    socket.on("SET:USERS", (data) => {
      console.log(data);
      dispatch(setUsers(data))
    }); 
    socket.on("SET:MESSAGES", (data) => {
      console.log(data);
      dispatch(setMessages(data)) 
    });
  }, [])

  const connectToSocket = (roomId, userName) =>  {
    if(!roomId || !userName) return alert("Заполните поля");
    axios.post('/rooms', {roomId, userName})
    .then( (response) => {
      if(response.status === 200) {
        dispatch(joinToRoom(true))
      }
      socket.emit("JOIN:ROOM", {roomId, userName})
    }) 
  }

  const onChangeRoomID = (e) => {
    dispatch(setRoomId(e.target.value))
  }
  const onChangeUser = (e) => {
    dispatch(setUserName(e.target.value))
  }

  const onChangeMessage = (e) => {
    dispatch(writeMessage(e.target.value));
  }

  const sendMessage = () => {
    const {message, roomId, userName} = state;
    if(!message) return
    const userMessage = {
      'message' : message, 
      'userName' : userName
    };
    socket.emit("SEND:MESSAGE", {userMessage, roomId});
    dispatch(cleanInput())
  }
  
  return (
    <div className="App">
      {
      !state.isJoined ? 
        <Joinblock 
          state = {state}
          onChangeRoomID = {onChangeRoomID} 
          onChangeUser = {onChangeUser}
          connectToSocket = {connectToSocket}
        /> : 
        <Chat sendMessage = {sendMessage} onChangeMessage = {onChangeMessage} state = {state}/>
      }
    </div>
  );
}

export default App;

