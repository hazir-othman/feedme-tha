const NODE_ENV = process.env.NODE_ENV && `${process.env.NODE_ENV}`.trim() || "staging";

console.log("Current node env: " + NODE_ENV);

require('dotenv').config({
  path: `./env-files/${NODE_ENV}.env`,
});

const http = require('http');
const express = require('express');
const path = require('path');
const cors = require('cors');
const indexRouter = require('./routes/index');
const staticFolder = 'public';
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors({ credentials: true, origin: true }));
app.use(express.json({ limit: '24mb' }));
app.use(express.urlencoded({ extended: false, limit: '24mb' }));
app.use(express.static(path.join(__dirname, staticFolder)));
app.set('trust proxy', 1);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((error, res) => {
  return res.status(404).json({
    code: 404,
    status: false,
    message: "😫 not found!"
  });
});

app.set('port', 3000);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      process.exit(1);
    case 'EADDRINUSE':
      process.exit(1);
    default:
      throw error;
  }
}

const server = http.createServer(app);

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
}

process.on('uncaughtException', uncaughtException => {
  console.log(uncaughtException);
});

process.on('unhandledRejection', reason => {
  console.log(reason);
});

server.listen(3000, '0.0.0.0');
server.on('error', onError);
server.on('listening', onListening);
