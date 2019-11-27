const express = require('express');
const path = require('path');
const git = require('simple-git')();
const app = express();

app.use(express.static(path.join(__dirname, '..', 'client')));

app.get('/api/branch', (req, res) => {
  git.branchLocal((err, data) => {
    if (!err) {
      res.send(data.all);
    }
  });
});

app.get('/api/diff', (req, res) => {
  // TODO source + target
  git.diff((err, data) => {
    if (!err) {
      res.send(data);
    }
  });
});

app.listen(3000);