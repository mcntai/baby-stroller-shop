const path = require('path')
const fs = require('fs')
const Koa = require('koa')
const Router = require('koa-router')

const errorHandler = require('./middlewares/errorHandler')
const auth = require('./middlewares/auth')

const BulkValidationError = require('./controllers/BulkValidationError')
const mustBeAuthenticated = require('./controllers/auth/mustBeAuthenticated')

const getRecommendations = require('./controllers/getRecommendations')
const getCategories = require('./controllers/getCategories')

const getProductById = require('./controllers/products/getProductById')
const getProducts = require('./controllers/products/getProducts')

const authenticateUser = require('./controllers/auth/authenticateUser')
const oauth = require('./controllers/auth/oauth')
const isItMe = require('./controllers/auth/isItMe')
const registerUser = require('./controllers/registration/registerUser')
const confirmRegistration = require('./controllers/registration/confirmRegistration')

const createOrder = require('./controllers/orders/createOrder')
const getOrdersList = require('./controllers/orders/getOrdersList')

const getMessages = require('./controllers/getMessages')

const app = new Koa()

app.use(require('koa-bodyparser')())
app.use(require('koa-static')(path.join(__dirname, 'public')))

app.use(errorHandler)

const router = new Router({ prefix: '/api' })

router.use(auth)

router.get('/recommendations', getRecommendations)
router.get('/categories', getCategories)

router.get('/products', getProducts)
router.get('/products/:id', getProductById)

router.post('/login', authenticateUser)

router.get('/oauth/:provider', oauth)
router.post('/oauth_callback', BulkValidationError, authenticateUser)

router.get('/me', mustBeAuthenticated, isItMe)

router.post('/register', BulkValidationError, registerUser)
router.post('/confirm', confirmRegistration)

router.get('/orders', mustBeAuthenticated, getOrdersList)
router.post('/orders', mustBeAuthenticated, BulkValidationError, createOrder)

router.get('/messages', mustBeAuthenticated, getMessages)

app.use(router.routes())

const index = fs.readFileSync(path.join(__dirname, 'public/index.html'))

app.use(async ctx => {
  if (!ctx.url.startsWith('/api')) {
    ctx.set('content-type', 'text/html')
    ctx.body = index
  }
})

module.exports = app
