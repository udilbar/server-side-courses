const express = require('express')
const ejs = require('ejs')

const CONFIG = require('./src/config')
const users = require('./src/models/users')

const app = express()

app.use(express.static('src/assets'))
app.set('views', 'src/views')

app.use(express.urlencoded());

app.engine('html', ejs.renderFile)
app.set('view engine', 'html')

app.get('/', (_, res) => {
  res.render('index.html')
})

app.get('/about', (_, res) => {
  res.render('about.html')
})

app.get('/contact', (_, res) => {
  res.render('contact.html')
})

app.get('/courses', (_, res) => {
  res.render('courses.html')
})

app.get('/blogs', (_, res) => {
  res.render('blogs.html')
})

app.get('/login', (_, res) => {
  res.render('login.html')
})

app.post('/login', (req, res) => {
  const { userEmail, userPassword } = req.body

  let user = users.find(user => user.email === userEmail && user.password === userPassword)

  if (user) {
    res.send('Succesfully logged in!');
  } else {
    res.status(401).end()
  }
})

app.listen(CONFIG.PORT, () => console.log(CONFIG.PORT))