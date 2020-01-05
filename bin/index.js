#!/usr/bin/env node
const app = require('../src/server/server');
const argv = require('yargs').argv;
const open = require('open');

const PORT = argv.port || 3000;
const PATH = `http://localhost:${PORT}`;
const openBrowser = argv.open;

app.listen(PORT, () => {
  console.log(`Git Explorer now running at localhost:${PORT}`);
  
  if (openBrowser) {
    open(PATH);
  }
});