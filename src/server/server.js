import express from 'express';
import path from 'path';

const __dirname = path.resolve(); // eslint-disable-line
const app = express();

app.use(express.static(path.join(__dirname, '..', 'client')));

app.get('/api/branch', function (req, res) {
  res.send('return branches');
});

app.get('/api/diff', function (req, res) {
  res.send('return diff');
});

app.listen(3000);