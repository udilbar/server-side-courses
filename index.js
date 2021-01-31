const express = require('express')

const CONFIG = require('./src/config')

const app = express()

app.use(express.static('src/assets'))

app.listen(CONFIG.PORT, () => console.log(CONFIG.PORT))