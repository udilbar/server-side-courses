const express = require('express')
const ejs = require('ejs')
const sha1 = require('sha1')
const url = require('url')
const querystring = require('querystring')
const { sign, verify } = require('./src/controllers/jwt')

const CONFIG = require('./src/config')
const users = require('./src/models/users')

const app = express()

app.use(express.static('src/assets'))
app.set('views', 'src/views')

app.use(express.urlencoded())
app.use(express.json())

app.engine('html', ejs.renderFile)
app.set('view engine', 'html')

app.use(async (req, res, next) => {

	if (req.url !== '/courses') {
		let parsedUrl = url.parse(req.url)
		let parsedQs = querystring.parse(parsedUrl.query)

		if (parsedQs.inputToken) {
			try {
				await verify(parsedQs.inputToken)

				next()
			}
			catch (error) {
				res.status(401).send({ error: error })
			}
		} else {
			next()
		}
	}
	else {
		res.status(401).send('You need to login to access the courses')
	}
})

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

	let user = users.find(user => user.email === userEmail && user.password === sha1(userPassword))

	if (user) {

		const accessToken = sign({
			id: user.id,
			role: user.role,
		})

		res.render('login-courses.html', {
			accessToken: accessToken
		})
	}
	else {
		res.status(401).end()
	}
})

app.listen(CONFIG.PORT, () => console.log(CONFIG.PORT))