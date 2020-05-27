export const initialState = {
  isJoined: false,
  users: [],
  roomId: '',
  userName : '',
  messages: [],
  message: ''
}

export const reducer = (state, action) => {
  switch(action.type){
    case "JOIN_TO_ROOM" :
      return {
        ...state,
        isJoined: action.payload
      }
    case "SET_USERS" : 
      return {
        ...state,
        users: action.payload
      }
    case "SET_ROOMID": 
      return {
        ...state,
        roomId: action.payload
      }
    case "SET_USERNAME": 
      return {
        ...state,
        userName: action.payload
      }
    case "WRITE_MESSAGE": 
      return {
        ...state,
        message: action.payload
      }
    case "SET_MESSAGES" : 
      return {
        ...state,
        messages: action.payload
      }
    case "CLEAN_INPUT" : 
      return {
        ...state,
        message: ''
      }
    default: return state
  }
}

export const joinToRoom = (joined) => ({
  type: "JOIN_TO_ROOM",
  payload: joined
})

export const setUsers = (users) => ({
  type: "SET_USERS",
  payload: users
})

export const setRoomId = (roomID) => ({
  type: "SET_ROOMID",
  payload: roomID
})

export const setUserName = (userName) => ({
  type: "SET_USERNAME",
  payload: userName
})

export const writeMessage = (message) => ({
  type: "WRITE_MESSAGE",
  payload: message
})

export const setMessages = (messages) => ({
  type: "SET_MESSAGES",
  payload: messages
})

export const cleanInput = () => ({
  type: "CLEAN_INPUT",
  payload: ''
})

