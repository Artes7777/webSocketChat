import React, { useState, useRef, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import {Message} from './Message';
import Drawer from '@material-ui/core/Drawer';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import './Chat.css';

export const Chat = ({state, onChangeMessage, sendMessage}) => {

  const ref = useRef(null);

  useEffect(() => {
    ref.current.scrollIntoView(false)
  })

  const [isOpenDialog, setDialog] = useState(false);

  const paperStyleChat = {
    width: '100%', 
    minHeight: '900px',
  }

  const textArea = {
    width: "90%"
  }

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" onClick = {() => setDialog(true)} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" >
            Chat
          </Typography>
        </Toolbar>
      </AppBar>
      <div className = 'wrapper'>
        <Paper style = {paperStyleChat} elevation={3}>
          {state.messages.map((el, index) => {
            return <Message state = {state} message = {el.message} userName = {el.userName} key = {index} />
          })}
        </Paper>
      </div>
      <div className = 'textArea'>
        <TextareaAutosize  onChange = {onChangeMessage} value = {state.message} style = {textArea} rowsMin={2}/>
        <Button ref = {ref} variant="contained" color="primary" onClick = {sendMessage}>Отправить</Button>
        <Drawer anchor='left' open={isOpenDialog} onClose={() => setDialog(false)}>

          <List>
            <ListItemText primary = {` Пользователей онлайн : ${state.users.length} `}  />
              {state.users && state.users.map((user, index) => {
                return ( 
                  <ListItem button key = {index}>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    <ListItemText primary={user} />
                  </ListItem>
               )
              })}
          </List>

        </Drawer>
      </div>
    </div>
  )
}