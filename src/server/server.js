const express = require('express');
const path = require('path');
const git = require('simple-git')();
const app = express();

console.log('process.execPath', process.execPath);
// https://stackoverflow.com/questions/5926672/where-does-npm-install-packages
const nodeRootLocation = process.env.NODE_ENV === 'production'
  ? process.platform === 'win32' 
    ? path.join(process.execPath, '..')
    : path.join(process.execPath, '..', '..', 'lib')
  : process.cwd();

console.log('nodeRootLocation', nodeRootLocation);
app.use(express.static(path.join(__dirname, '..', 'client')));
app.use(express.static(path.join(nodeRootLocation, 'node_modules')));

app.get('/api/branch', (req, res) => {
  git.branchLocal((err, data) => {
    if (!err) {
      res.send(data.all);
    }
  });
});

app.get('/api/diff', (req, res) => {
  const { target, source } = req.query;

  git.raw([
    'diff',
    target,
    source
  ], (err, data) => {
    if (!err) {
      res.send(data);
    }
  });
});

module.exports = app;