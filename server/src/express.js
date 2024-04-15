const express = require('express')
const app = express();
const path = require('path')
const api = require('./routes/api')
const cors = require('cors')
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(cors())
app.use('/', api)
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})
module.exports = app;