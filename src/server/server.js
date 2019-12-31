#!/usr/bin/env node
const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const git = require('simple-git')();
const app = express();

app.use(express.static(path.join(__dirname, '..', 'client')));
app.use(favicon(path.join(__dirname, '..', 'client', 'favicon.ico')));

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

app.get('/api/status', (req, res) => {
  git.status((err, data) => {
    if (!err) {
      res.send(data);
    }
  });
});

module.exports = app;