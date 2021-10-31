const path = require('path')
const fs = require('fs')
const Koa = require('koa')
const Router = require('koa-router')

const errorHandler = require('./middlewares/errors-handler')
const auth = require('./middlewares/auth')

const mustBeAuthenticated = require('./controllers/auth/must-be-authenticated')

const getRecommendations = require('./controllers/get-recommendations')
const getCategories = require('./controllers/get-categories')

const getProductById = require('./controllers/product/get-product-by-id')
const getProducts = require('./controllers/product/get-products')

const authenticateUser = require('./controllers/auth/authenticate-user')
const oauth = require('./controllers/auth/oauth')
const isItMe = require('./controllers/auth/check-if-its-me')
const registerUser = require('./controllers/registration/register-user')
const confirmRegistration = require('./controllers/registration/confirm-registration')

const createOrder = require('./controllers/order/create-order')
const getOrdersList = require('./controllers/order/get-orders-list')

const getMessages = require('./controllers/get-messages')

const app = new Koa()

app.use(require('koa-bodyparser')())
app.use(require('koa-static')(path.join(__dirname, 'public')))

app.use(errorHandler)

const router = new Router({ prefix: '/api' })

router.use(auth)

router.get('/recommendations', getRecommendations)
router.get('/categories', getCategories)

router.get('/product', getProducts)
router.get('/product/:id', getProductById)

router.post('/login', authenticateUser)

router.get('/oauth/:provider', oauth)
router.get('/oauth_callback/:provider', authenticateUser)

router.get('/me', mustBeAuthenticated, isItMe)

router.post('/register', registerUser)
router.post('/confirm', confirmRegistration)

router.get('/order', mustBeAuthenticated, getOrdersList)
router.post('/order', mustBeAuthenticated, createOrder)

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
