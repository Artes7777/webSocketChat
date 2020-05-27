import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Joinblock.css'


export const Joinblock = ({state, connectToSocket, onChangeUser, onChangeRoomID}) => {

  return (
    <div className = 'wrapperJoin'>
      <div className = 'joinform'>
        <div><TextField onChange = {onChangeRoomID} value = {state.roomId} label = "Room Id"/></div>
        <div><TextField onChange = {onChangeUser} value = {state.userName} label = "Username"/></div>
        <div><Button style = {{width : '200px'}} variant="contained" color="primary" onClick = {()=>connectToSocket(state.roomId, state.userName)}>Войти</Button></div>
      </div>
    </div>
  )
}