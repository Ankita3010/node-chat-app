const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log("New user connected");

  var roomList = users.getRoomList();
  socket.emit('show', roomList);
// ) => {
//     console.log('Sent from server');
//   });

  socket.on('join', (params, callback) => {
    params.room = params.room.toUpperCase();
    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and Room name are required.');
    };
    if(users.getUserName(params.name)) {
      return callback('Name already taken. Please choose a different name.');
    };

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    //socket.leave('the Office Fans');
    //ways to emit msg to a group
    //io.emit -> io.to('The Office Fans').emit
    //socket.broadcast.emit (sends to every1 except itself)-> socket.broadcast.to('The Office Fans').emit
    //socket.emit (send only to one user)

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);

    if(user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);

    if(user) {
    io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

server.listen(port, () => {
    console.log(`Server is up and running on port ${port}.`);
});
