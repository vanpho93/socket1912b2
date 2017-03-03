let arrUsername = require('./arrUsername.js');
let arrSocket = require('./arrSocket.js');

let getSignUp = (io, socket) => {
    return (username) => {
    if(arrUsername.indexOf(username) == -1) {
      arrUsername.push(username);
      arrSocket.push(socket);
      //Emit cho tat ca user
      socket.username = username;
      io.emit('NEW_USER_CONNECTED', username);
      socket.emit('SERVER_ACCEPT_USERNAME', username);
    } else{
      socket.emit('SERVER_REJECT_USERNAME');
    }
  }
}

  module.exports = getSignUp;