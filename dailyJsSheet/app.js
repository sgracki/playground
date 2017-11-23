const express = require('express')
var app = express()

app.set('view engine', 'ejs');

app.use('/', express.static('views'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))