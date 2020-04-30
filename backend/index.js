const cors = require('cors');
const express = require('express');
// const stripe = require('stripe');
// const uuid = require('uuid/v4');

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.get('/', (req, res) => {
    res.send('HELLO')
})

// listen
app.listen(3001, () => console.log('Listening 👂...'))