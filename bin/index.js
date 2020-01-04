#!/usr/bin/env node
const app = require('../src/server/server');
const argv = require('yargs').argv;
const open = require('open');

const PORT = argv.port || 3000;

app.listen(PORT, () => {
  console.log(`Git Explorer now running at localhost:${PORT}`);
  open(`http://localhost:${PORT}`);
});