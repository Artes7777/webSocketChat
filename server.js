const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
app.use(express.json());

const rooms = new Map();

io.on('connection', socket => {
  socket.on('JOIN:ROOM', ({roomId, userName}) => {
    socket.join(roomId);
    rooms.get(roomId).get('users').set(socket.id, userName);
    const users = [...rooms.get(roomId).get('users').values()];
    const messages = [...rooms.get(roomId).get('messages')];
    io.in(roomId).emit('SET:USERS', users);
    socket.to(roomId).emit('ROOM:JOINED', userName);
    io.in(roomId).emit('SET:MESSAGES', messages);
  });
  socket.on('SEND:MESSAGE', ({userMessage, roomId}) => {
    rooms.get(roomId).get('messages').push(userMessage);
    const messages = [...rooms.get(roomId).get('messages')];
    io.in(roomId).emit('SET:MESSAGES', messages);
  });
  socket.on('disconnect', () => {
    rooms.forEach((value, roomId) => {
      socket.to(roomId).emit('ROOM:LEAVED', value.get('users').get(socket.id));
      if(value.get('users').delete(socket.id)) {
        const users = [...value.get('users').values()];
        socket.to(roomId).emit('SET:USERS', users);
      }
    })
  })
})

app.post('/rooms', (req, res) => {
  const {roomId} = req.body;
  if(!rooms.has(roomId)) {
    rooms.set(roomId, new Map([
      ['users', new Map()],
      ['messages', []]
    ]))
  }
  res.send()
})

server.listen(9999);