const express = require('express')
const ejs = require('ejs')

const CONFIG = require('./src/config')

const app = express()

app.use(express.static('src/assets'))
app.set('views', 'src/views')

app.engine('html', ejs.renderFile)
app.set('view engine', 'html')

app.get('/', (_, res) => {
  res.render('index.html')
})

app.get('/about', (_, res) => {
  res.render('about.html')
})

app.listen(CONFIG.PORT, () => console.log(CONFIG.PORT))