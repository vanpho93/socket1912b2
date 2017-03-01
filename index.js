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
  socket.on('CLIENT_SIGN_UP', require('./socketControllers/signUp.js')(io, socket));

  socket.on('disconnect', () => {
    io.emit('USER_DISCONNECTED', socket.username);
  });
});
