const test = require('./module.js');
const express = require('express');
const app = express();
// const fs = require('fs');

const host = '127.0.0.1';
const port = 3000;

// app.set('view engine', 'pug');
// app.set('views', './views');

app.get('/', (req, res) => {
    res.send(test.letsgo.getImg());
})

app.listen(port, host, () => { 
    console.log(`Server running at http://${host}:${port}`);
})