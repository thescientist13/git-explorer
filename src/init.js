// const httpServer = require('http-server');
const liveServer = require('live-server');
const path = require('path');

// start development web server
liveServer.start({
  root: path.join(__dirname, './client')
});

// start Express backend server