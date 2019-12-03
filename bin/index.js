#!/usr/bin/env node
const app = require('../src/server/server');

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Git Explorer now running at localhost:${PORT}`);
});