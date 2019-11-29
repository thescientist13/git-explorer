const express = require('express');
const path = require('path');
const git = require('simple-git')();
const app = express();

app.use(express.static(path.join(__dirname, '..', 'client')));
app.use(express.static(path.join(process.cwd(), 'node_modules')));

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
    `${target}`,
    `${source}`
  ], (err, data) => {
    if (!err) {
      res.send(data);
    }
  });
});

app.listen(3000);