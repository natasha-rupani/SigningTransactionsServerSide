require('dotenv').config();

const path = require('path');
const express = require('express');
const app = express();

const index = require('./routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.listen(process.env.PORT || 5000);