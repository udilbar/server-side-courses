const express = require('express')
const ejs = require('ejs')

const CONFIG = require('./src/config')

const app = express()

app.use(express.static('src/assets'))

app.engine('html', ejs.renderFile)

app.listen(CONFIG.PORT, () => console.log(CONFIG.PORT))