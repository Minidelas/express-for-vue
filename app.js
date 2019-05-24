var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');

var usersRouter = require('./routes/users.routes');

var app = express();

var server = require('http').Server(app);

// Connection to MongoDB with Mongoose
mongoose.Promise = global.Promise;
mongoose.pluralize(null);
mongoose.connect('mongodb://localhost:27017/vueDB', {
  useNewUrlParser: true,
})
.then(() => {
  // Cuando se realiza la conexión, lanzamos este mensaje por consola
  console.log("DDBB Connected");
})
// Si no se conecta correctamente escupimos el error
.catch(err => console.log(err));

// Socket.io 
var io = require('socket.io')(server, {
  path: '/appcom'
});

io.on('connection', function (socket) {
  socket.emit('clientConnected', { connection: true, client: socket.client.id });
  io.emit('userConnected');
});

app.use(function (req, res, next) {
  res.io = io;
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = { app: app, server: server };
