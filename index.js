let express = require('express');
let app = express();

let server = require('http').Server(app);//1
let io = require('socket.io')(server);//2
server.listen(3000, () => console.log('Server started'));//3

let arrUsername = [];

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.get('/', (req, res) => res.render('home'));

io.on('connection', socket => {
  console.log('Co nguoi ket noi');
  socket.on('CLIENT_SIGN_UP', username => {
    if(arrUsername.indexOf(username) == -1) {
      arrUsername.push(username);
      //Emit cho tat ca user
      io.emit('NEW_USER_CONNECTED', username);
      socket.emit('SERVER_ACCEPT_USERNAME');
    } else{
      socket.emit('SERVER_REJECT_USERNAME');
    }
  });
});
